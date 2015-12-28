/*
 * author:谢利民;
 * function:公告表【EI_Announcement】操作的功能
 * adddate:2015-04-19
 * updatedate:2015-04-19
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
    /// JRelIDal:作业与题目连接表【EI_JRelI】的操作功能
    /// </summary>
    public class JRelIDal
    {
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_JRelI");
            strSql.Append(" where JID=@JID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 判断是否存在试题记录
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool Exists(string jobId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_JRelI");
            strSql.Append(" where JID=@JID and ItemID=@ItemID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.Int32,40)                      };
            parameters[0].Value = jobId;
            parameters[1].Value = itemId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        public bool ExistsBook(string bookId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from ei_jbookreli");
            strSql.Append(" where BookID=@BookID and ItemID=@ItemID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@BookID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.Int32,40)                      };
            parameters[0].Value = bookId;
            parameters[1].Value = itemId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_JRelI model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_JRelI(");
            strSql.Append("ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,DiffNum,ItemSourceType,Score,PID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@JID,@SequenceID,@ItemID,@ItemType,@KnowledgeID,@KnowledgeName,@DiffNum,@ItemSourceType,@Score,@PID)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SequenceID", MySqlDbType.Int32,1),
					new MySqlParameter("@ItemID", MySqlDbType.Int32,11),
					new MySqlParameter("@ItemType", MySqlDbType.Int32,11),
					new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,100),
                    new MySqlParameter("@DiffNum", MySqlDbType.Int32,11),
					new MySqlParameter("@ItemSourceType", MySqlDbType.Int32,1),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
					new MySqlParameter("@PID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.JID;
            parameters[2].Value = model.SequenceID;
            parameters[3].Value = model.ItemID;
            parameters[4].Value = model.ItemType;
            parameters[5].Value = model.KnowledgeID;
            parameters[6].Value = model.KnowledgeName;
            parameters[7].Value = model.DiffNum;
            parameters[8].Value = model.ItemSourceType;
            parameters[9].Value = model.Score;
            parameters[10].Value = model.PID;
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

        public bool AddBook(JBookRelIModel model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into ei_jbookreli(");
            strSql.Append("ID,BookID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,DiffNum,ItemSourceType,Score,PID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@BookID,@SequenceID,@ItemID,@ItemType,@KnowledgeID,@KnowledgeName,@DiffNum,@ItemSourceType,@Score,@PID)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@BookID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SequenceID", MySqlDbType.Int32,1),
					new MySqlParameter("@ItemID", MySqlDbType.Int32,11),
					new MySqlParameter("@ItemType", MySqlDbType.Int32,11),
					new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,100),
                    new MySqlParameter("@DiffNum", MySqlDbType.Int32,11),
					new MySqlParameter("@ItemSourceType", MySqlDbType.Int32,1),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
					new MySqlParameter("@PID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.BookID;
            parameters[2].Value = model.SequenceID;
            parameters[3].Value = model.ItemID;
            parameters[4].Value = model.ItemType;
            parameters[5].Value = model.KnowledgeID;
            parameters[6].Value = model.KnowledgeName;
            parameters[7].Value = model.DiffNum;
            parameters[8].Value = model.ItemSourceType;
            parameters[9].Value = model.Score;
            parameters[10].Value = model.PID;
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
        public bool Update(EI_JRelI model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_JRelI set ");
            strSql.Append("SequenceID=@SequenceID,");
            strSql.Append("ItemType=@ItemType,");
            strSql.Append("KnowledgeID=@KnowledgeID,");
            strSql.Append("KnowledgeName=@KnowledgeName,");
            strSql.Append("Score=@Score,");
            strSql.Append("DiffNum=@DiffNum");
            strSql.Append(" where JID=@JID and ItemID=@ItemID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SequenceID", MySqlDbType.Int32,1),
					new MySqlParameter("@ItemType", MySqlDbType.Int32,11),
					new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,100),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
                    new MySqlParameter("@DiffNum", MySqlDbType.Int32,5),
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
				    new MySqlParameter("@ItemID", MySqlDbType.Int32,11)
                                          };

            parameters[0].Value = model.SequenceID;
            parameters[1].Value = model.ItemType;
            parameters[2].Value = model.KnowledgeID;
            parameters[3].Value = model.KnowledgeName;
            parameters[4].Value = model.Score;
            parameters[5].Value = model.DiffNum;
            parameters[6].Value = model.JID;
            parameters[7].Value = model.ItemID;

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
        /// 删除一条数据
        /// </summary>
        public bool Delete(string jobId)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_JRelI ");
            strSql.Append(" where JID=@JID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobId;
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
        /// 批量删除数据
        /// </summary>
        public bool DeleteList(string IDlist, string jobId)
        {
            IDlist.Trim(',')
                .Split(',')
                .ToList()
                .ForEach(m => RedisHelper.RemoveEntryFromHash(RedisTypeEnum.Jobitem, jobId, "Item_" + m));
            return true;

            #region Redis之前代码

            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("delete from EI_JRelI ");
            //strSql.Append(" where ItemID in (" + IDlist + ") and JID=@JID ");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            //parameters[0].Value = jobId;
            //int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            //if (rows > 0)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //} 

            #endregion
        }

        /// <summary>
        /// 批量删除数据
        /// </summary>
        public bool DeleteAllList(string itemtype, string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_JRelI ");
            strSql.Append(" where itemtype=@itemtype and JID=@JID ");
            MySqlParameter[] parameters = {
                   new MySqlParameter("@itemtype", MySqlDbType.VarChar,40),
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = itemtype;
            parameters[1].Value = jobId;
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
        /// 根据JobID获取题目列表
        /// </summary>
        /// <returns></returns>
        public List<EI_JRelI> GetModelList(string jobid)
        {
            List<EI_JRelI> listRelI = new List<EI_JRelI>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select JID,SequenceID,ItemID,ItemType,KnowledgeID,ItemSourceType,Score,PID from EI_JRelI");
            strSql.Append(" where JID=@JID ORDER BY ItemType,SequenceID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_JRelI>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }

        }


        public string SaveJRelI(List<JRelIModel> list, Int32 mbook)
        {

            StringBuilder strSql = new StringBuilder();
            #region Add
            var dto = list.Where(a => a.IsAddOrDel).ToList();
            List<KeyValuePair<string, string>> keys = new List<KeyValuePair<string, string>>() { };
            if (dto.Count > 0)
            {
                keys = dto.Select(m => new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson()) { }).ToList();
                RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, dto[0].JID, keys);
            }
            #endregion
            #region Delete

            var dtoDel = list.Where(a => !a.IsAddOrDel).ToList();
            if (dtoDel.Count > 0)
            {
                dtoDel.ForEach(m => RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, m.JID, "Item_" + m.ItemID));
            }
            #endregion
            if (dto.Count == 0 && dtoDel.Count == 0)
                return string.Empty;

            return dto.Count.ToString();

            #region redis之前代码

            //StringBuilder strSql = new StringBuilder();
            //var dto = list.Where(a => a.IsAddOrDel).ToList();
            //if (dto.Count > 0)
            //{
            //    if (mbook == 2)
            //    {
            //        strSql.Append(@"INSERT INTO EI_JRelI(ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,PID,DiffNum)");
            //        strSql.Append(@" VALUES(");
            //        for (int i = 0; i < dto.Count; i++)
            //        {
            //            if (i == 0)
            //                strSql.AppendFormat(@"'{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                    Guid.NewGuid().ToString(), dto[i].JID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //            else
            //                strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                   Guid.NewGuid().ToString(), dto[i].JID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //        }
            //        strSql.Append(@";");
            //    }
            //    else
            //    {
            //        strSql.Append(@"INSERT INTO ei_jbookreli(ID,BookID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,PID,DiffNum)");
            //        strSql.Append(@" VALUES(");
            //        for (int i = 0; i < dto.Count; i++)
            //        {
            //            if (i == 0)
            //                strSql.AppendFormat(@"'{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                    Guid.NewGuid().ToString(), dto[i].JID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //            else
            //                strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                   Guid.NewGuid().ToString(), dto[i].JID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //        }
            //        strSql.Append(@";");
            //    }
            //}
            //var dtoDel = list.Where(a => !a.IsAddOrDel).ToList();
            //if (dtoDel.Count > 0)
            //{
            //    if (mbook == 2)
            //    {
            //        strSql.Append("DELETE a FROM EI_JRelI a INNER JOIN (");
            //        for (int i = 0; i < dtoDel.Count; i++)
            //        {
            //            if (i > 0)
            //                strSql.Append(" UNION ");
            //            strSql.AppendFormat(@"SELECT '{0}' as JID,{1} as ItemID,{2} as KnowledgeID", dtoDel[i].JID, dtoDel[i].ItemID, dtoDel[i].KnowledgeID);
            //        }
            //        strSql.Append(@") as b on a.JID=b.JID and a.ItemID=b.ItemID and a.KnowledgeID=b.KnowledgeID;");
            //    }
            //    else
            //    {
            //        strSql.Append("DELETE a FROM ei_jbookreli a INNER JOIN (");
            //        for (int i = 0; i < dtoDel.Count; i++)
            //        {
            //            if (i > 0)
            //                strSql.Append(" UNION ");
            //            strSql.AppendFormat(@"SELECT '{0}' as JID,{1} as ItemID,{2} as KnowledgeID", dtoDel[i].JID, dtoDel[i].ItemID, dtoDel[i].KnowledgeID);
            //        }
            //        strSql.Append(@") as b on a.BookID=b.JID and a.ItemID=b.ItemID and a.KnowledgeID=b.KnowledgeID;");
            //    }
            //}
            //if (dto.Count == 0 && dtoDel.Count == 0)
            //    return string.Empty;
            //return MySQLHelper.ExecuteSql(strSql.ToString()).ToString(); 

            #endregion
        }

        public List<JRelIGetModel> GetInit(EI_Base<EI_JRelI> dto)
        {

            var jrelModel = new List<JRelIGetModel>() { };
            #region 缓存中有值，编辑或后退

            var allKeys = RedisDal.GetHashKeys(RedisTypeEnum.Jobitem, dto.dto.JID);
            var itemKeys = allKeys.Where(m => m.Contains("Item_")).ToList();
            if (allKeys != null && allKeys.Count > 0)
            {
                if (itemKeys.Count > 0)
                {
                    var job = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, dto.dto.JID, itemKeys.ToArray());
                    jrelModel = job.Select(m => m.FromJsonTo<JRelIGetModel>()).ToList();

                }
            }
            #endregion
            else
            {
                StringBuilder strSql = new StringBuilder();
                if (dto.dto.mBook == 2)
                {
                    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM EI_JRelI ");
                    strSql.Append(@" WHERE JID = @JID ORDER BY SequenceID;");
                }
                else
                {
                    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM ei_jbookreli ");
                    strSql.Append(@" WHERE BookID = @JID ORDER BY SequenceID;");
                }
                List<MySqlParameter> parameters = new List<MySqlParameter>()
                {
                    new MySqlParameter("@JID", MySqlDbType.VarChar, 40)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = dto.dto.JID
                    },
                    new MySqlParameter("@ItemType", MySqlDbType.Int32, 4)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = dto.dto.ItemType
                    }
                };
                jrelModel = MySQLHelper.ExecuteStatement<JRelIGetModel>(strSql.ToString(), (a) =>
                {
                    return new JRelIGetModel()
                    {
                        ID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                        SequenceID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                        ItemID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                        KnowledgeID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                        ItemType = a.IsDBNull(4) ? 0 : a.GetInt32(4)
                    };
                }, parameters);
                var keys = new List<KeyValuePair<string, string>>() { };
                foreach (var item in jrelModel)
                {
                    keys.Add(new KeyValuePair<string, string>("Item_" + item.ItemID, item.ConvertToJson()));
                }
                if (keys.Count > 0)
                {
                    RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, dto.dto.JID, keys);
                }
            }
            return jrelModel;

            #region Redis之前代码

            //StringBuilder strSql = new StringBuilder();
            //if (dto.dto.mBook == 2)
            //{
            //    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM EI_JRelI ");
            //    strSql.Append(@" WHERE JID = @JID ORDER BY SequenceID;");
            //}
            //else
            //{
            //    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM ei_jbookreli ");
            //    strSql.Append(@" WHERE BookID = @JID ORDER BY SequenceID;");
            //}
            //List<MySqlParameter> parameters = new List<MySqlParameter>()
            //{
            //    new MySqlParameter("@JID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.dto.JID},
            //    new MySqlParameter("@ItemType", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.dto.ItemType}
            //};
            //return MySQLHelper.ExecuteStatement<JRelIGetModel>(strSql.ToString(), (a) =>
            //{
            //    return new JRelIGetModel()
            //    {
            //        ID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
            //        SequenceID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
            //        ItemID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
            //        KnowledgeID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
            //        ItemType = a.IsDBNull(4) ? 0 : a.GetInt32(4)
            //    };
            //}, parameters);

            #endregion

        }

        public JobInfoModel GetJob(EI_Job dto)
        {
            JobInfoModel list = new JobInfoModel();
            StringBuilder strSql = new StringBuilder();

            //编辑功能，先从数据库取出jobitems,存入redis
            if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, dto.ID))
            {
                string[] keys = new string[]
                {
                    "GradeID", "SubjectID", "TID", "StageID"
                };
                var job = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, dto.ID, keys);

                strSql.AppendFormat(@"SELECT  a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM  
                                    (SELECT '{0}' AS GradeID ,'{1}' AS SubjectID,'{2}' AS TID,'{3}' AS StageID FROM DUAL) AS a
                                    INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
                                    LEFT JOIN EI_ManRelSta d ON a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID", job[0],
                                    job[1], job[2], job[3]);
            }
            else
            {
                if (dto.mBook == 2)
                {
                    strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM EI_Job a 
                                    INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
                                    LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
                                    WHERE a.ID=@ID;");
                }

                else
                {
                    strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM ei_jobbook a 
                                    INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
                                    LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
                                    WHERE a.ID=@ID;");
                }


            }
            List<MySqlParameter> parameters = new List<MySqlParameter>()
                    {
                        new MySqlParameter("@ID", MySqlDbType.VarChar, 40)
                        {
                            Direction = ParameterDirection.InputOutput,
                            Value = dto.ID
                        }
                    };
            list = MySQLHelper.ExecuteStatement<JobInfoModel>(strSql.ToString(), (a) =>
            {
                return new JobInfoModel()
                {
                    ID = dto.ID,
                    GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                    ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                    StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
                };
            }, parameters).FirstOrDefault();
            return list;

            #region Redis之前数据
            //            JobInfoModel list = new JobInfoModel();
            //            StringBuilder strSql = new StringBuilder();
            //            if (dto.mBook == 2)
            //            {
            //                strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM EI_Job a 
            //INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
            //LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
            //WHERE a.ID=@ID;");
            //                List<MySqlParameter> parameters = new List<MySqlParameter>()
            //            {
            //                new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.ID}               
            //            };
            //                list = MySQLHelper.ExecuteStatement<JobInfoModel>(strSql.ToString(), (a) =>
            //                {
            //                    return new JobInfoModel()
            //                    {
            //                        ID = dto.ID,
            //                        GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
            //                        SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
            //                        AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
            //                        ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
            //                        MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
            //                        StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
            //                    };
            //                }, parameters).FirstOrDefault();
            //            }
            //            else
            //            {
            //                strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM ei_jobbook a 
            //INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
            //LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
            //WHERE a.ID=@ID;");
            //                List<MySqlParameter> parameters = new List<MySqlParameter>()
            //                {
            //                new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.ID}               
            //                };
            //                list = MySQLHelper.ExecuteStatement<JobInfoModel>(strSql.ToString(), (a) =>
            //                {
            //                    return new JobInfoModel()
            //                    {
            //                        ID = dto.ID,
            //                        GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
            //                        SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
            //                        AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
            //                        ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
            //                        MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
            //                        StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
            //                    };
            //                }, parameters).FirstOrDefault();
            //            }
            //            return list; 
            #endregion
        }

        /// <summary>
        /// 批量删除数据
        /// </summary>
        public bool DeleteBookList(string IDlist, string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_JBookRelI ");
            strSql.Append(" where ItemID in (" + IDlist + ") and BookID=@BookID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@BookID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobId;
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
        /// <param name="IDlist"></param>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public bool DeleteAllBookList(string itemtype, string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_JBookRelI ");
            strSql.Append(" where ItemType = @itemtype and BookID=@BookID ");
            MySqlParameter[] parameters = {
                     new MySqlParameter("@itemtype", MySqlDbType.VarChar,40),                        
					new MySqlParameter("@BookID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = itemtype;
            parameters[1].Value = jobId;
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


        public List<TagKeepReponseModel> GetInitTagKeep(TagKeepInitModel tag)
        {
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=tag.TID}     ,
                new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=tag.SubjectID}    
            };
            var str = new StringBuilder();
            str.AppendFormat(@"select ItemID from EI_TagKeep where KeepState=1 and tid=@TID and SubjectID=@SubjectID and ItemID in ({0});", tag.ItemIDStr);
            return MySQLHelper.ExecuteStatement<TagKeepReponseModel>(str.ToString(), (a) =>
              {
                  TagKeepReponseModel ragKeep = new TagKeepReponseModel();
                  ragKeep.IsTag = true;
                  ragKeep.ItemID = a.GetInt32(0);
                  return ragKeep;
              }, parameters);
        }

        public TagPointPageModel GetTagList(TagPointPageParaModel para)
        {
            TagPointPageModel dto = new TagPointPageModel();
            dto.List = new List<TagPointPageResponseModel>();
            if (para.PageSize < 1)
                para.PageSize = 1;
            switch (para.DiffNum)
            {
                case 1: para.DiffNum = 40; break;
                case 2: para.DiffNum = 80; break;
                case 3: para.DiffNum = 120; break;
                default:
                    break;
            }
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=para.TID},
                new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.SubjectID},
                new MySqlParameter("@ItemType", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.ItemType},
                new MySqlParameter("@DiffNum", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.DiffNum},
                new MySqlParameter("@TagID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TagID},
                new MySqlParameter("@CurrentIndex", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=(para.CurrentIndex-1)*para.PageSize},
                new MySqlParameter("@PageSize", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.PageSize},
                new MySqlParameter("@StageID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.StageID}
            };
            var str = new StringBuilder();
            if (para.T)//根据知识点过滤
            {
                str.Append(@"select count(1) from EI_TagKeep as a 
where a.TID=@TID and a.KnowledgeID=@TagID and a.SubjectID=@SubjectID and (a.ItemType=@ItemType or @ItemType=0) and (@DiffNum=0 or (a.DiffNum>@DiffNum-40 and a.DiffNum<=@DiffNum)) and a.KeepState=1;");

                str.Append(@"select a.ItemID,a.KeepID,GROUP_CONCAT(c.Tag),GROUP_CONCAT(c.ID) from EI_TagKeep as a inner join EI_TagKeepMapping b on a.KeepID=b.KeepID left join ei_tag c on b.TagID=c.id
where a.TID=@TID and a.KnowledgeID=@TagID and a.SubjectID=@SubjectID and (a.ItemType=@ItemType or @ItemType=0) and (@DiffNum=0 or (a.DiffNum>@DiffNum-40 and a.DiffNum<=@DiffNum)) and a.KeepState=1 
GROUP BY a.ItemID,a.KeepID order by a.KeepID limit @CurrentIndex,@PageSize ;");

            }
            else if (para.TagID == 0)
            {
                str.Append(@"select count(1) from EI_TagKeep where TID=@TID and SubjectID=@SubjectID and (ItemType=@ItemType or @ItemType=0) and (@DiffNum=0 or (DiffNum>@DiffNum-40 and DiffNum<=@DiffNum)) and KeepState=1 and (@StageID=0 or  StageID=@StageID);");

                str.Append(@"select a.ItemID,a.KeepID,GROUP_CONCAT(c.Tag),GROUP_CONCAT(c.ID) from EI_TagKeep a inner join EI_TagKeepMapping b on a.KeepID=b.KeepID left join ei_tag c on b.TagID=c.id where a.TID=@TID and a.SubjectID=@SubjectID and (a.ItemType=@ItemType or @ItemType=0) and (@DiffNum=0 or (a.DiffNum>@DiffNum-40 and a.DiffNum<=@DiffNum)) and a.KeepState=1 and (@StageID=0 or a.StageID=@StageID)
GROUP BY a.ItemID,a.KeepID order by a.KeepID limit @CurrentIndex,@PageSize ;");
            }
            else
            {
                str.Append(@"select count(1) from EI_TagKeep as a inner join EI_TagKeepMapping b on a.KeepID=b.KeepID
where a.TID=@TID and b.TagID=@TagID and a.SubjectID=@SubjectID and (a.ItemType=@ItemType or @ItemType=0) and (@DiffNum=0 or (a.DiffNum>@DiffNum-40 and a.DiffNum<=@DiffNum)) and a.KeepState=1 and (@StageID=0 or a.StageID=@StageID);");

                str.Append(@"select a.ItemID,a.KeepID,(select GROUP_CONCAT(c.Tag) from ei_tag c inner join EI_TagKeepMapping p on c.ID=p.TagID WHERE  p.KeepID=a.KeepID) as k  from EI_TagKeep as a inner join EI_TagKeepMapping b on b.KeepID=a.KeepID
where a.TID=@TID and b.TagID=@TagID and a.SubjectID=@SubjectID and (a.ItemType=@ItemType or @ItemType=0) and (@DiffNum=0 or (a.DiffNum>@DiffNum-40 and a.DiffNum<=@DiffNum)) and a.KeepState=1 and (@StageID=0 or a.StageID=@StageID) order by a.KeepID limit @CurrentIndex,@PageSize ;");
            }

            MySQLHelper.ExecuteStatementList<TagPointPageModel>(str.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.PageTotal = a.GetInt32(0);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            TagPointPageResponseModel resRead = new TagPointPageResponseModel();
                            resRead.ItemID = a.GetInt32(0);
                            resRead.KeepID = a.GetInt32(1);
                            resRead.Tag = a.IsDBNull(2) ? string.Empty : a.GetString(2);
                            //resRead.T = a.IsDBNull(3) ? string.Empty : a.GetString(3);问题
                            dto.List.Add(resRead);
                        }
                    }
                }
                return dto;
            }, parameters);
            return dto;
        }
    }
}
