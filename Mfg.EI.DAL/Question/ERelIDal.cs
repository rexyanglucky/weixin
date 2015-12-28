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
    ///  ERelIDal:考卷与题目连接表【EI_ERelI】操作的功能
    /// </summary>
    public class ERelIDal
    {

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_ERelI");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 判断是否存在试题记录
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool Exists(string examId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_ERelI");
            strSql.Append(" where EID=@EID and ItemID=@ItemID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.Int32,40)                      };
            parameters[0].Value = examId;
            parameters[1].Value = itemId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool ExitsBook(string bookId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from ei_ebookreli");
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
        public bool Add(EI_ERelI model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_ERelI(");
            strSql.Append("ID,EID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,DiffNum,ItemSourceType,Score,PID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@EID,@SequenceID,@ItemID,@ItemType,@KnowledgeID,@KnowledgeName,@DiffNum,@ItemSourceType,@Score,@PID)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@EID", MySqlDbType.VarChar,40),
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
            parameters[1].Value = model.EID;
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
        /// 
        /// </summary>
        /// <returns></returns>
        public bool AddBook(JBookRelIModel model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into ei_ebookreli(");
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
        public bool Update(EI_ERelI model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ERelI set ");
            strSql.Append("SequenceID=@SequenceID,");
            strSql.Append("ItemType=@ItemType,");
            strSql.Append("KnowledgeID=@KnowledgeID,");
            strSql.Append("KnowledgeName=@KnowledgeName,");
            strSql.Append("Score=@Score,");
            strSql.Append("DiffNum=@DiffNum");
            strSql.Append(" where EID=@EID and ItemID=@ItemID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SequenceID", MySqlDbType.Int32,1),
					new MySqlParameter("@ItemType", MySqlDbType.Int32,11),
					new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,100),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
                    new MySqlParameter("@DiffNum", MySqlDbType.Int32,5),
					new MySqlParameter("@EID", MySqlDbType.VarChar,40),
				    new MySqlParameter("@ItemID", MySqlDbType.Int32,11)
                                          };

            parameters[0].Value = model.SequenceID;
            parameters[1].Value = model.ItemType;
            parameters[2].Value = model.KnowledgeID;
            parameters[3].Value = model.KnowledgeName;
            parameters[4].Value = model.Score;
            parameters[5].Value = model.DiffNum;
            parameters[6].Value = model.EID;
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
        public bool Delete(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_ERelI ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

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
        public bool DeleteList(string IDlist, string examId)
        {
            IDlist.Trim(',')
               .Split(',')
               .ToList()
               .ForEach(m => RedisHelper.RemoveEntryFromHash(RedisTypeEnum.Jobitem, examId, "Item_" + m));
            return true;

            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("delete from EI_ERelI ");
            //strSql.Append(" where ItemID in (" + IDlist + ") and EID=@EID ");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@EID", MySqlDbType.VarChar,40)			};
            //parameters[0].Value = examId;
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

        /// 批量删除数据
        /// </summary>
        public bool DeleteAllList(string itemtype, string examId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_ERelI ");
            strSql.Append(" where itemtype =@itemtype and EID=@EID ");
            MySqlParameter[] parameters = {
                   new MySqlParameter("@itemtype", MySqlDbType.VarChar,40),
					new MySqlParameter("@EID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = itemtype;
            parameters[1].Value = examId;
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
        /// 得到一个对象实体
        /// </summary>
        public EI_ERelI GetModel(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,EID,SequenceID,ItemID,ItemType,KnowledgeID,ItemSourceType,Score,PID from EI_ERelI ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            EI_ERelI model = new EI_ERelI();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_ERelI>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 根据JobID获取题目列表
        /// </summary>
        /// <returns></returns>
        public List<EI_ERelI> GetModelList(string examid)
        {
            List<EI_JRelI> listRelI = new List<EI_JRelI>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select EID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,DiffNum,ItemSourceType,Score,PID from EI_ERelI");
            strSql.Append(" where EID=@EID Order By SequenceID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = examid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_ERelI>.ConvertToModelList(ds.Tables[0]);
                }
            else
                {
                return null;
                }

                }



        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,EID,SequenceID,ItemID,ItemType,KnowledgeID,ItemSourceType,Score,PID ");
            strSql.Append(" FROM EI_ERelI ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return MySQLHelper.Query(strSql.ToString());
        }

        /// <summary>
        /// 获取记录总数
        /// </summary>
        public int GetRecordCount(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) FROM EI_ERelI ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            object obj = MySQLHelper.GetSingle(strSql.ToString());
            if (obj == null)
            {
                return 0;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by T." + orderby);
            }
            else
            {
                strSql.Append("order by T.ID desc");
            }
            strSql.Append(")AS Row, T.*  from EI_ERelI T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }


        public string SaveERelI(List<ERelIModel> list, Int32 mBook)
        {
            #region Add
            var dto = list.Where(a => a.IsAddOrDel).ToList();
            List<KeyValuePair<string, string>> keys = new List<KeyValuePair<string, string>>() { };
            if (dto.Count > 0)
            {
                keys = dto.Select(m => new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson()) { }).ToList();
                RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, dto[0].EID, keys);
            }
            #endregion
            #region Delete

            var dtoDel = list.Where(a => !a.IsAddOrDel).ToList();
            if (dtoDel.Count > 0)
            {
                dtoDel.ForEach(m => RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, m.EID, "Item_" + m.ItemID));
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
            //    if (mBook == 2)
            //    {
            //        strSql.Append(@"INSERT INTO EI_ERelI(ID,EID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,PID,DiffNum)");
            //        strSql.Append(@" VALUES(");
            //        for (int i = 0; i < dto.Count; i++)
            //        {
            //            if (i == 0)
            //                strSql.AppendFormat(@"'{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                    Guid.NewGuid().ToString(), dto[i].EID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //            else
            //                strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                   Guid.NewGuid().ToString(), dto[i].EID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //        }
            //        strSql.Append(@";");
            //    }
            //    else
            //    {
            //        strSql.Append(@"INSERT INTO  ei_ebookreli (ID,BookID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,PID,DiffNum)");
            //        strSql.Append(@" VALUES(");
            //        for (int i = 0; i < dto.Count; i++)
            //        {
            //            if (i == 0)
            //                strSql.AppendFormat(@"'{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                    Guid.NewGuid().ToString(), dto[i].EID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //            else
            //                strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                   Guid.NewGuid().ToString(), dto[i].EID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //        }
            //        strSql.Append(@";");
            //    }
            //}
            //var dtoDel = list.Where(a => !a.IsAddOrDel).ToList();
            //if (dtoDel.Count > 0)
            //{
            //    if (mBook == 2)
            //    {
            //        strSql.Append("DELETE a FROM EI_ERelI a INNER JOIN (");
            //        for (int i = 0; i < dtoDel.Count; i++)
            //        {
            //            if (i > 0)
            //                strSql.Append(" UNION ");
            //            strSql.AppendFormat(@"SELECT '{0}' as EID,{1} as ItemID,{2} as KnowledgeID", dtoDel[i].EID, dtoDel[i].ItemID, dtoDel[i].KnowledgeID);
            //        }
            //        strSql.Append(@") as b on a.EID=b.EID and a.ItemID=b.ItemID and a.KnowledgeID=b.KnowledgeID;");
            //    }
            //    else
            //    {
            //        strSql.Append("DELETE a FROM ei_ebookreli a INNER JOIN (");
            //        for (int i = 0; i < dtoDel.Count; i++)
            //        {
            //            if (i > 0)
            //                strSql.Append(" UNION ");
            //            strSql.AppendFormat(@"SELECT '{0}' as EID,{1} as ItemID,{2} as KnowledgeID", dtoDel[i].EID, dtoDel[i].ItemID, dtoDel[i].KnowledgeID);
            //        }
            //        strSql.Append(@") as b on a.BookID=b.EID and a.ItemID=b.ItemID and a.KnowledgeID=b.KnowledgeID;");
            //    }
            //}
            //if (dto.Count == 0 && dtoDel.Count == 0)
            //    return string.Empty;
            //return MySQLHelper.ExecuteSql(strSql.ToString()).ToString(); 
            #endregion
        }

        public string SaveTERelI(List<ERelIModel> list, Int32 mBook)
        {

            #region Add
            var dto = list.Where(a => a.IsAddOrDel).ToList();
            List<KeyValuePair<string, string>> keys = new List<KeyValuePair<string, string>>() { };
            if (dto.Count > 0)
            {
                keys = dto.Select(m => new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson()) { }).ToList();
                RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, dto[0].EID, keys);
            }
            #endregion
            #region Delete

            var dtoDel = list.Where(a => !a.IsAddOrDel).ToList();
            if (dtoDel.Count > 0)
            {
                dtoDel.ForEach(m => RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, m.EID, "Item_" + m.ItemID));
            }
            #endregion
            if (dto.Count == 0 && dtoDel.Count == 0)
                return string.Empty;

            return dto.Count.ToString();
            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //var dto = list.Where(a => a.IsAddOrDel).ToList();
            //if (dto.Count > 0)
            //{
            //    strSql.Append(@"INSERT INTO  ei_tea_ebookreli (ID,BookID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,PID,DiffNum)");
            //    strSql.Append(@" VALUES(");
            //    for (int i = 0; i < dto.Count; i++)
            //    {
            //        if (i == 0)
            //            strSql.AppendFormat(@"'{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //                Guid.NewGuid().ToString(), dto[i].EID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //        else
            //            strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5},'{6}',{7},{8},{9},{10})",
            //               Guid.NewGuid().ToString(), dto[i].EID, dto[i].SequenceID, dto[i].ItemID, dto[i].ItemType, dto[i].KnowledgeID, dto[i].KnowledgeName, dto[i].ItemSourceType, dto[i].Score, dto[i].PID, dto[i].DiffNum);
            //    }
            //    strSql.Append(@";");
            //}
            //var dtoDel = list.Where(a => !a.IsAddOrDel).ToList();
            //if (dtoDel.Count > 0)
            //{
            //    strSql.Append("DELETE a FROM ei_tea_ebookreli a INNER JOIN (");
            //    for (int i = 0; i < dtoDel.Count; i++)
            //    {
            //        if (i > 0)
            //            strSql.Append(" UNION ");
            //        strSql.AppendFormat(@"SELECT '{0}' as EID,{1} as ItemID,{2} as KnowledgeID", dtoDel[i].EID, dtoDel[i].ItemID, dtoDel[i].KnowledgeID);
            //    }
            //    strSql.Append(@") as b on a.BookID=b.EID and a.ItemID=b.ItemID and a.KnowledgeID=b.KnowledgeID;");
            //}
            //if (dto.Count == 0 && dtoDel.Count == 0)
            //    return string.Empty;
            //return MySQLHelper.ExecuteSql(strSql.ToString()).ToString(); 
            #endregion
        }

        public List<ERelIGetModel> GetInit(EI_Base<EI_ERelI> dto)
        {
            var erelModel = new List<ERelIGetModel>() { };
            #region 缓存中有值，编辑或后退
            var allKeys = RedisDal.GetHashKeys(RedisTypeEnum.Jobitem, dto.dto.EID);
            var itemKeys = allKeys.Where(m => m.Contains("Item_")).ToList();
            if (allKeys != null && allKeys.Count > 0)
            {
                if (itemKeys.Count > 0)
                {
                    var job = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, dto.dto.EID, itemKeys.ToArray());
                    erelModel = job.Select(m => m.FromJsonTo<ERelIGetModel>()).ToList();

                }
            }
            #endregion

            else
            {
                StringBuilder strSql = new StringBuilder();
                if (dto.dto.mBook == 2)
                {
                    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM EI_ERelI ");
                    strSql.Append(@" WHERE EID = @EID  ORDER BY SequenceID;");
                }
                else
                {
                    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM ei_ebookreli ");
                    strSql.Append(@" WHERE BookID = @EID  ORDER BY SequenceID;");
                }
                List<MySqlParameter> parameters = new List<MySqlParameter>()
                {
                    new MySqlParameter("@EID", MySqlDbType.VarChar, 40)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = dto.dto.EID
                    },
                    new MySqlParameter("@ItemType", MySqlDbType.Int32, 4)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = dto.dto.ItemType
                    }
                };
                erelModel = MySQLHelper.ExecuteStatement<ERelIGetModel>(strSql.ToString(), (a) =>
                {
                    return new ERelIGetModel()
                    {
                        ID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                        SequenceID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                        ItemID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                        KnowledgeID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                        ItemType = a.IsDBNull(4) ? 0 : a.GetInt32(4)
                    };
                }, parameters);
                var keys = new List<KeyValuePair<string, string>>() { };
                foreach (var item in erelModel)
                {
                    keys.Add(new KeyValuePair<string, string>("Item_" + item.ItemID, item.ConvertToJson()));
                }
                if (keys.Count > 0)
                {
                    RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, dto.dto.EID, keys);
                }
            }
            return erelModel;

            #region Redis之前代码

            //StringBuilder strSql = new StringBuilder();
            //if (dto.dto.mBook == 2)
            //{
            //    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM EI_ERelI ");
            //    strSql.Append(@" WHERE EID = @EID  ORDER BY SequenceID;");
            //}
            //else
            //{
            //    strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM ei_ebookreli ");
            //    strSql.Append(@" WHERE BookID = @EID  ORDER BY SequenceID;");
            //}
            //List<MySqlParameter> parameters = new List<MySqlParameter>()
            //{
            //    new MySqlParameter("@EID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.dto.EID},
            //    new MySqlParameter("@ItemType", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.dto.ItemType}
            //};
            //return MySQLHelper.ExecuteStatement<ERelIGetModel>(strSql.ToString(), (a) =>
            //{
            //    return new ERelIGetModel()
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

        public List<ERelIGetModel> GetTInit(EI_Base<EI_ERelI> dto)
        {
            var erelModel = new List<ERelIGetModel>() { };
            #region 缓存中有值，编辑或后退
            var allKeys = RedisDal.GetHashKeys(RedisTypeEnum.Jobitem, dto.dto.EID);
            var itemKeys = allKeys.Where(m => m.Contains("Item_")).ToList();
            if (allKeys != null && allKeys.Count > 0)
            {
                if (itemKeys.Count > 0)
                {
                    var job = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, dto.dto.EID, itemKeys.ToArray());
                    erelModel = job.Select(m => m.FromJsonTo<ERelIGetModel>()).ToList();

                }
            }
            #endregion
            else
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM ei_tea_ebookreli ");
                strSql.Append(@" WHERE BookID = @EID  ORDER BY SequenceID;");
                List<MySqlParameter> parameters = new List<MySqlParameter>()
                {
                    new MySqlParameter("@EID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.dto.EID},
                    new MySqlParameter("@ItemType", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.dto.ItemType}
                };
                erelModel = MySQLHelper.ExecuteStatement<ERelIGetModel>(strSql.ToString(), (a) =>
                 {
                     return new ERelIGetModel()
                     {
                         ID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                         SequenceID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                         ItemID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                         KnowledgeID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                         ItemType = a.IsDBNull(4) ? 0 : a.GetInt32(4)
                     };
                 }, parameters);
                var keys = new List<KeyValuePair<string, string>>() { };
                foreach (var item in erelModel)
                {
                    keys.Add(new KeyValuePair<string, string>("Item_" + item.ItemID, item.ConvertToJson()));
                }
                if (keys.Count > 0)
                {
                    RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, dto.dto.EID, keys);
                }
            }
            return erelModel;
            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append(@"SELECT ID,SequenceID,ItemID,KnowledgeID,ItemType FROM ei_tea_ebookreli ");
            //strSql.Append(@" WHERE BookID = @EID  ORDER BY SequenceID;");
            //List<MySqlParameter> parameters = new List<MySqlParameter>()
            //{
            //    new MySqlParameter("@EID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.dto.EID},
            //    new MySqlParameter("@ItemType", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.dto.ItemType}
            //};
            //return MySQLHelper.ExecuteStatement<ERelIGetModel>(strSql.ToString(), (a) =>
            //{
            //    return new ERelIGetModel()
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

        public ExamInfoModel GetTExam(EI_Exam eIJob)
        {
            ExamInfoModel list = new ExamInfoModel();
            StringBuilder strSql = new StringBuilder();
            //编辑功能，先从数据库取出jobitems,存入redis
            if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, eIJob.ID))
            {
                var keys = new string[]
                {
                    "GradeID", "SubjectID", "TID", "StageID"
                };
                var job = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, eIJob.ID, keys);

                strSql.AppendFormat(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM  
                                    (SELECT '{0}' AS GradeID ,'{1}' AS SubjectID,'{2}' AS TID,'{3}' AS StageID FROM DUAL) AS a
                                    INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
                                    LEFT JOIN EI_ManRelSta d ON a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID", job[0],
                                    job[1], job[2], job[3]);
            }
            else
            {
                strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM ei_tea_exambook a 
                                INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
                                LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
                                WHERE a.ID=@ID;");

            }
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=eIJob.ID}               
            };
            list = MySQLHelper.ExecuteStatement<ExamInfoModel>(strSql.ToString(), (a) =>
            {
                return new ExamInfoModel()
                {
                    ID = eIJob.ID,
                    GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                    ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                    StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
                };
            }, parameters).FirstOrDefault();
            return list;
            #region Redis之前代码
            //            ExamInfoModel list = new ExamInfoModel();
            //            StringBuilder strSql = new StringBuilder();
            //            strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM ei_tea_exambook a 
            //INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
            //LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
            //WHERE a.ID=@ID;");
            //            List<MySqlParameter> parameters = new List<MySqlParameter>()
            //            {
            //                new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=eI_Job.ID}               
            //            };
            //            list = MySQLHelper.ExecuteStatement<ExamInfoModel>(strSql.ToString(), (a) =>
            //            {
            //                return new ExamInfoModel()
            //                {
            //                    ID = eI_Job.ID,
            //                    GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
            //                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
            //                    AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
            //                    ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
            //                    MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
            //                    StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
            //                };
            //            }, parameters).FirstOrDefault();
            //            return list; 
            #endregion
        }

        public ExamInfoModel GetExam(EI_Exam eIJob)
        {
            ExamInfoModel list = new ExamInfoModel();
            StringBuilder strSql = new StringBuilder();
            //编辑功能，先从数据库取出jobitems,存入redis
            if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, eIJob.ID))
            {
                var keys = new string[]
                {
                    "GradeID", "SubjectID", "TID", "StageID"
                };
                var job = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, eIJob.ID, keys);

                strSql.AppendFormat(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM  
                                    (SELECT '{0}' AS GradeID ,'{1}' AS SubjectID,'{2}' AS TID,'{3}' AS StageID FROM DUAL) AS a
                                    INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
                                    LEFT JOIN EI_ManRelSta d ON a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID", job[0],
                                    job[1], job[2], job[3]);
            }
            else
            {
                if (eIJob.mBook == 2)
                {
                    strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM EI_Exam a 
INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
WHERE a.ID=@ID;");
                }
                else
                {
                    strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM ei_exambook a 
INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
WHERE a.ID=@ID;");
                }

            }
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=eIJob.ID}               
            };
            list = MySQLHelper.ExecuteStatement<ExamInfoModel>(strSql.ToString(), (a) =>
            {
                return new ExamInfoModel()
                {
                    ID = eIJob.ID,
                    GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                    ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                    StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
                };
            }, parameters).FirstOrDefault();
            return list;

            #region Redis之前代码
            //            ExamInfoModel list = new ExamInfoModel();
            //            StringBuilder strSql = new StringBuilder();
            //            if (eI_Job.mBook == 2)
            //            {
            //                strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM EI_Exam a 
            //INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
            //LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
            //WHERE a.ID=@ID;");
            //            }
            //            else
            //            {
            //                strSql.Append(@"SELECT a.GradeID,a.SubjectID,b.AcaStru,b.ArtSciences,d.MaterialID,a.StageID FROM ei_exambook a 
            //INNER JOIN EI_ManagerInfo b ON a.TID=b.AccountNumber
            //LEFT JOIN EI_ManRelSta d on a.StageID=d.StageID AND a.SubjectID=d.SubjectID AND a.TID=d.TID
            //WHERE a.ID=@ID;");
            //            }
            //            List<MySqlParameter> parameters = new List<MySqlParameter>()
            //            {
            //                new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=eI_Job.ID}               
            //            };
            //            list = MySQLHelper.ExecuteStatement<ExamInfoModel>(strSql.ToString(), (a) =>
            //            {
            //                return new ExamInfoModel()
            //                {
            //                    ID = eI_Job.ID,
            //                    GradeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
            //                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
            //                    AcaStru = a.IsDBNull(2) ? 0 : a.GetInt32(2),
            //                    ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
            //                    MaterialID = a.IsDBNull(4) ? string.Empty : a.GetString(4),
            //                    StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5)
            //                };
            //            }, parameters).FirstOrDefault();
            //            return list;
            #endregion
        }
        /// <summary>
        /// 批量删除数据
        /// </summary>
        public bool DeleteBookList(string IDlist, string jobId)
        {
            IDlist.Trim(',')
              .Split(',')
              .ToList()
              .ForEach(m => RedisHelper.RemoveEntryFromHash(RedisTypeEnum.Jobitem, jobId, "Item_" + m));
            return true;

            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("delete from EI_EBookRelI ");
            //strSql.Append(" where ItemID in (" + IDlist + ") and BookID=@BookID ");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@BookID", MySqlDbType.VarChar,40)			};
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
        /// 
        /// </summary>
        /// <param name="IDlist"></param>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public bool DeleteAllBookList(string itemtype, string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from ei_ebookreli ");
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

        public bool ExitsTeaExam(string bookId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from ei_tea_ebookreli");
            strSql.Append(" where BookID=@BookID and ItemID=@ItemID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@BookID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.Int32,40)                      };
            parameters[0].Value = bookId;
            parameters[1].Value = itemId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 批量删除数据
        /// </summary>
        public bool DeleteTeaList(string IDlist, string jobId)
        {
            IDlist.Trim(',')
                 .Split(',')
                 .ToList()
                 .ForEach(m => RedisHelper.RemoveEntryFromHash(RedisTypeEnum.Jobitem, jobId, "Item_" + m));
            return true;

            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("delete from ei_tea_ebookreli ");
            //strSql.Append(" where ItemID in (" + IDlist + ") and BookID=@BookID ");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@BookID", MySqlDbType.VarChar,40)			};
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
        /// 
        /// </summary>
        /// <returns></returns>
        public bool AddTeaBook(TeaExamBookRelIModel model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into ei_tea_ebookreli(");
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
    }
}
