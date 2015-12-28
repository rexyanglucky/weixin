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
    /// 试题蓝Dal
    /// </summary>
    public class QuestionBox
    {

        #region 获取试题蓝试题集合
        /// <summary>
        /// 获取试题蓝试题集合
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public List<EI_PaperBasket> GetQuestionBoxList(EI_PaperBasket eiPaper)
        {
            string sql = "select ID,TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime  from ei_paper_basket where tid=@tId  and OrgId=@OrgId  ";
            List<MySqlParameter> paramValue = new List<MySqlParameter>() {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
                    new MySqlParameter("@OrgId", MySqlDbType.Int32, 11){Value=eiPaper.OrgID }
                };

            if (eiPaper.SubjectID != 0)
            {
                sql += "and SubjectID = @SubjectID";
                paramValue.Add(new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11) { Value = eiPaper.SubjectID });
            }
            sql += " order by AddTime ASC";

            List<EI_PaperBasket> list = new List<EI_PaperBasket>();
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        EI_PaperBasket dto = new EI_PaperBasket()
                        {
                            ID = a.GetString("ID"),
                            TID = a.GetInt32("TID"),
                            OrgID = a.GetInt32("OrgID"),
                            SequenceID = a.GetInt32("SequenceID"),
                            //SubjectID = a.GetInt32("SubjectID"),
                            ItemID = a.GetInt32("ItemID"),
                            ItemType = a.GetInt32("ItemType"),
                            KnowledgeID = a.GetInt32("KnowledgeID"),
                            KnowledgeName = a.GetString("KnowledgeName"),
                            ItemSourceType = a.GetInt32("ItemSourceType"),
                            Score = a.GetFloat("Score"),
                            DiffNum = a.GetInt32("DiffNum"),
                            PID = a.GetString("PID"),
                            AddTime = a.GetDateTime("AddTime"),
                            //BigGrade = a.GetInt32("BigGrade")
                        };
                        list.Add(dto);
                    }
                }, paramValue
                );
            return list;
        }
        #endregion


        #region 获取当前用户Id试题蓝一条数据
        /// <summary>
        /// 获取一条试题蓝试题数据
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public EI_PaperBasket GetOneQuestionBox(EI_PaperBasket eiPaperParam)
        {
            //string sql = "select ID, TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime  from ei_paper_basket where tid=@tId  and OrgId=@OrgId  ORDER BY  `AddTime` desc LIMIT 1 ";

            //if (eiPaperParam.PID != null && eiPaperParam.PID != "0")
            //{
            //    sql = "select  ID, TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime  from ei_paper_basket where tid=@tId  and OrgId=@OrgId and PID=@pid ORDER BY  `AddTime` desc  LIMIT 1 ";
            //}
            StringBuilder sql = new StringBuilder();
            sql.Append(@"select BigGrade,SubjectID,ItemSourceType,Score,PID  from ei_paper where tid=@tId  and OrgId=@OrgId;");
            List<MySqlParameter> paramValue = new List<MySqlParameter>() {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaperParam.TID },
                    new MySqlParameter("@OrgId", MySqlDbType.Int32, 11){Value=eiPaperParam.OrgID }
                };
            //if (eiPaperParam.PID != "0")
            //{
            //    paramValue.Add(new MySqlParameter("@pid", MySqlDbType.VarChar, 20) { Value = eiPaperParam.PID });
            //}

            EI_PaperBasket eiPaper = null;
            MySQLHelper.ExecuteStatementList(sql.ToString(),
                (a) =>
                {
                    while (a.Read())
                    {
                        eiPaper = new EI_PaperBasket()
                        {
                            //ID = a.GetString("ID"),
                            BigGrade = a.IsDBNull(0) ? 1 : a.GetInt32(0),
                            SubjectID = a.IsDBNull(0) ? 1 : a.GetInt32(1),
                            ItemSourceType = a.IsDBNull(0) ? 1 : a.GetInt32(2),
                            Score = a.IsDBNull(3) ? 0 : a.GetFloat(3),
                            PID = a.GetString(4)
                            //ItemID = a.GetInt32("ItemID"),
                            //ItemType = a.GetInt32("ItemType"),
                            //KnowledgeID = a.GetInt32("KnowledgeID"),
                            //KnowledgeName = a.GetString("KnowledgeName"),
                            //
                            //DiffNum = a.GetInt32("DiffNum"),

                            //AddTime = a.GetDateTime("AddTime"),
                            //BigGrade = a.GetInt32("BigGrade")
                        };
                    }
                }, paramValue
                );
            return eiPaper;
        }
        #endregion

        #region 获取试题 是否在试题蓝并返回此试题实体
        /// <summary>
        /// 获取试题 是否在试题蓝并返回此试题实体
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public EI_PaperBasket GetQuestionInBox(EI_PaperBasket eiPaper)
        {
            string sql = @"select ID, TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime
            from ei_paper_basket where tid=@tId and ItemID=@ItemID";
            EI_PaperBasket resultEiPaper = null;
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        resultEiPaper = new EI_PaperBasket();

                        resultEiPaper.ID = a.GetString("ID");
                        //TID = a.GetInt32("TID"),
                        //OrgID = a.GetInt32("OrgID"),
                        resultEiPaper.SequenceID = a.GetInt32("SequenceID");
                        //SubjectID = a.GetInt32("SubjectID"),
                        resultEiPaper.ItemID = a.GetInt32("ItemID");
                        resultEiPaper.ItemType = a.GetInt32("ItemType");
                        resultEiPaper.KnowledgeID = a.GetInt32("KnowledgeID");
                        resultEiPaper.KnowledgeName = a.GetString("KnowledgeName");
                        //ItemSourceType = a.GetInt32("ItemSourceType"),
                        resultEiPaper.Score = a.GetFloat("Score");
                        resultEiPaper.DiffNum = a.GetInt32("DiffNum");
                        //resultEiPaper.PID = a.GetString("PID");
                        resultEiPaper.AddTime = a.GetDateTime("AddTime");

                    }
                },
                new List<MySqlParameter>() {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
                    new MySqlParameter("@ItemID", MySqlDbType.Int32, 11){Value=eiPaper.ItemID },
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11){Value=eiPaper.SubjectID },
                     new MySqlParameter("@BigGrade", MySqlDbType.Int32, 11){Value=eiPaper.BigGrade }
                });
            return resultEiPaper;
        }
        #endregion


        #region 验证科目与年级
        /// <summary>
        /// 验证科目与年级
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public EI_PaperBasket VerificationSubjectAndBigGrade(EI_PaperBasket eiPaper)
        {
            string sql = @"select BigGrade,SubjectID,PaperName,Pid,Score
            from ei_paper where tid=@tId  and OrgId=@OrgId LIMIT 1;";
            EI_PaperBasket resultEiPaper = null;
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        resultEiPaper = new EI_PaperBasket()
                        {
                            SubjectID = a.GetInt32("SubjectID"),
                            BigGrade = a.GetInt32("BigGrade"),
                            PaperName = a.GetString("PaperName"),
                            PID = a.GetString("Pid"),
                            Score = (float)a.GetDouble("Score")
                        };
                    }
                },
                new List<MySqlParameter>() {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
                    new MySqlParameter("@OrgId", MySqlDbType.Int32, 11){Value=eiPaper.OrgID }
                });
            //sql = @"select Score  from ei_paper_basket where tid=@tId  and OrgId=@OrgId and ItemType=1 LIMIT 1";
            //MySQLHelper.ExecuteStatementList(sql,
            //    (a) =>
            //    {
            //        while (a.Read())
            //        {
            //            resultEiPaper.Score = a.IsDBNull(0) ? 0 : a.GetInt32(0);
            //        }
            //    },
            //    new List<MySqlParameter>() {
            //        new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
            //        new MySqlParameter("@OrgId", MySqlDbType.Int32, 11){Value=eiPaper.OrgID }
            //    });
            return resultEiPaper;
        }
        #endregion


        #region 获取排序
        /// <summary>
        /// 获取排序
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public EI_PaperBasket GetSequenceID(EI_PaperBasket eiPaper)
        {
            string sql = @"select SequenceID
            from ei_paper_basket where tid=@tId  and OrgId=@OrgId  ORDER BY SequenceID desc LIMIT 1";
            EI_PaperBasket resultEiPaper = null;
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        resultEiPaper = new EI_PaperBasket()
                        {
                            SequenceID = a.GetInt32("SequenceID")
                        };
                    }
                },
                new List<MySqlParameter>() {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
                    new MySqlParameter("@OrgId", MySqlDbType.Int32, 11){Value=eiPaper.OrgID }
                });
            return resultEiPaper;
        }
        #endregion


        #region 批量判断是否在试题蓝并返回此试题实体
        /// <summary>
        /// 批量判断是否在试题蓝并返回此试题实体
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public List<EI_PaperBasket> BatchGetQuestionInBox(EI_PaperBasket eiPaper, List<int> listItemId)
        {
            if (listItemId.Count > 0)
            {
                // StringBuilder sql = new StringBuilder("select * from ei_paper_basket where tid=@tId and SubjectID = @SubjectID  and BigGrade= @BigGrade and ItemID in (");
                StringBuilder sql = new StringBuilder("select ID, TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime  from ei_paper_basket where tid=@tId and  ItemID in (");
                List<MySqlParameter> listParam = new List<MySqlParameter>() {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID } 
                  //  new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11){Value=eiPaper.SubjectID },
                   // new MySqlParameter("@BigGrade", MySqlDbType.Int32, 11){Value=eiPaper.BigGrade }
                };
                for (int i = 0; i < listItemId.Count; i++)
                {
                    sql.Append(string.Format("@ItemId{0}{1}", i, ","));
                    listParam.Add(new MySqlParameter(string.Format("@ItemId{0}", i), MySqlDbType.Int32, 11) { Value = listItemId[i] });
                }
                string sqlStr = sql.ToString();
                sqlStr = sqlStr.Substring(0, sqlStr.Length - 1) + ")";

                List<EI_PaperBasket> listEiPaper = new List<EI_PaperBasket>();


                MySQLHelper.ExecuteStatementList(sqlStr,
                   (a) =>
                   {
                       while (a.Read())
                       {
                           var resultEiPaper = new EI_PaperBasket()
                           {
                               ID = a.GetString("ID"),
                               TID = a.GetInt32("TID"),
                               OrgID = a.GetInt32("OrgID"),
                               SequenceID = a.GetInt32("SequenceID"),
                               SubjectID = a.GetInt32("SubjectID"),
                               ItemID = a.GetInt32("ItemID"),
                               ItemType = a.GetInt32(5),
                               KnowledgeID = a.GetInt32(6),
                               KnowledgeName = a.GetString("KnowledgeName"),
                               ItemSourceType = a.GetInt32("ItemSourceType"),
                               Score = a.GetFloat("Score"),
                               DiffNum = a.GetInt32("DiffNum"),
                               PID = a.GetString("PID"),
                               AddTime = a.GetDateTime("AddTime"),
                           };
                           listEiPaper.Add(resultEiPaper);
                       }
                   }, listParam
                  );
                return listEiPaper;
            }
            else
            {
                return null;
            }
        }
        #endregion


        #region 删除一条试题
        /// <summary>
        /// 删除一条试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public bool DeleteQuestionInBox(EI_PaperBasket eiPaper)
        {
            string sql = "delete from ei_paper_basket where tid=@tId and ItemID=@ItemID and OrgId=@OrgId";
            return MySQLHelper.ExecuteSql(sql, new MySqlParameter[] {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
                    new MySqlParameter("@ItemID", MySqlDbType.Int32, 11){Value=eiPaper.ItemID },
                    //new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11){Value=eiPaper.SubjectID },
                    new MySqlParameter("@OrgId", MySqlDbType.Int32, 11){Value=eiPaper.OrgID }
                }) > 0 ? true : false;
        }
        #endregion

        #region 清空当前老师试所选科目试题蓝
        /// <summary>
        /// 清空当前老师试所选科目试题蓝
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public bool ClearQuestionInBox(EI_PaperBasket eiPaper)
        {
            string sql = "delete from ei_paper_basket where tid=@tId and OrgID=@OrgID";

            if (eiPaper.ItemType != 0)
            {
                sql += " and ItemType=@ItemType";
            }
            return MySQLHelper.ExecuteSql(sql, new MySqlParameter[] {
                    new MySqlParameter("@tId", MySqlDbType.VarChar, 40) { Value = eiPaper.TID },
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11){Value=eiPaper.SubjectID },
                    new MySqlParameter("@orgId", MySqlDbType.Int32, 11){Value=eiPaper.OrgID },
                     new MySqlParameter("@ItemType", MySqlDbType.Int32, 11){Value=eiPaper.ItemType }
                }) > 0 ? true : false;
        }
        #endregion


        #region 添加试题
        /// <summary>
        /// 添加试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public int AddQuestionInBox(EI_PaperBasket eiPaper)
        {
            string sql = @"insert into ei_paper_basket (ID,TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime,PaperName) values 
                        (@ID,@TID,@OrgID,@SequenceID,@BigGrade,@SubjectID,@ItemID,@ItemType,@KnowledgeID,@KnowledgeName,@ItemSourceType,@Score,@DiffNum,@PID,@AddTime,@PaperName)";
            return MySQLHelper.ExecuteSql(sql, new MySqlParameter[] {
                 new MySqlParameter("@ID", MySqlDbType.VarChar, 40) { Value = Guid.NewGuid() },
                    new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = eiPaper.TID },
                    new MySqlParameter("@OrgID", MySqlDbType.Int32, 11){Value=eiPaper.OrgID },
                     new MySqlParameter("@SequenceID", MySqlDbType.Int32, 11){Value=eiPaper.SequenceID },
                     new MySqlParameter("@BigGrade", MySqlDbType.Int32, 11){Value=eiPaper.BigGrade },
                     new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11){Value=eiPaper.SubjectID },
                     new MySqlParameter("@ItemID", MySqlDbType.Int32, 11){Value=eiPaper.ItemID },
                     new MySqlParameter("@ItemType", MySqlDbType.Int32, 11){Value=eiPaper.ItemType },
                     new MySqlParameter("@KnowledgeID", MySqlDbType.Int32, 11){Value=eiPaper.KnowledgeID },
                     new MySqlParameter("@KnowledgeName", MySqlDbType.String, 11){Value=eiPaper.KnowledgeName },
                     new MySqlParameter("@ItemSourceType", MySqlDbType.Int32, 11){Value=eiPaper.ItemSourceType },
                     new MySqlParameter("@Score", MySqlDbType.Float, 11){Value=eiPaper.Score },
                     new MySqlParameter("@DiffNum", MySqlDbType.Int32, 11){Value=eiPaper.DiffNum },
                     new MySqlParameter("@PID", MySqlDbType.String, 11){Value=eiPaper.PID },
                     new MySqlParameter("@AddTime", MySqlDbType.Datetime){Value=DateTime.Now },
                     new MySqlParameter("@PaperName", MySqlDbType.String){Value=eiPaper.PaperName }
                }) > 0 ? 1 : -1;
        }
        #endregion

        #region 批量添加试题
        /// <summary>
        /// 批量添加试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public int BatchAddQuestionInBox(List<EI_PaperBasket> eiPaper)
        {
            if (eiPaper != null && eiPaper.Count > 0)
            {
                StringBuilder sqlStr = new StringBuilder("insert into ei_paper_basket (ID,TID,OrgID,SequenceID,BigGrade,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime,PaperName) values ");
                List<MySqlParameter> paramValue = new List<MySqlParameter>();
                for (int i = 0; i < eiPaper.Count; i++)
                {
                    sqlStr.Append(string.Format("(@ID{0},@TID{0},@OrgID{0},@SequenceID{0},@BigGrade{0},@SubjectID{0},@ItemID{0},@ItemType{0},@KnowledgeID{0},@KnowledgeName{0},@ItemSourceType{0},@Score{0},@DiffNum{0},@PID{0},@AddTime{0},@PaperName{0}),", i));

                    paramValue.Add(new MySqlParameter(string.Format("@ID{0}", i), MySqlDbType.VarChar, 40) { Value = Guid.NewGuid() });
                    paramValue.Add(new MySqlParameter(string.Format("@TID{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].TID });
                    paramValue.Add(new MySqlParameter(string.Format("@OrgID{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].OrgID });
                    paramValue.Add(new MySqlParameter(string.Format("@SequenceID{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].SequenceID });
                    paramValue.Add(new MySqlParameter(string.Format("@BigGrade{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].BigGrade });
                    paramValue.Add(new MySqlParameter(string.Format("@SubjectID{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].SubjectID });
                    paramValue.Add(new MySqlParameter(string.Format("@ItemID{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].ItemID });
                    paramValue.Add(new MySqlParameter(string.Format("@ItemType{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].ItemType });
                    paramValue.Add(new MySqlParameter(string.Format("@KnowledgeID{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].KnowledgeID });
                    paramValue.Add(new MySqlParameter(string.Format("@KnowledgeName{0}", i), MySqlDbType.String, 11) { Value = eiPaper[i].KnowledgeName });
                    paramValue.Add(new MySqlParameter(string.Format("@ItemSourceType{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].ItemSourceType });
                    paramValue.Add(new MySqlParameter(string.Format("@Score{0}", i), MySqlDbType.Float, 11) { Value = eiPaper[i].Score });
                    paramValue.Add(new MySqlParameter(string.Format("@DiffNum{0}", i), MySqlDbType.Int32, 11) { Value = eiPaper[i].DiffNum });
                    paramValue.Add(new MySqlParameter(string.Format("@PID{0}", i), MySqlDbType.String, 11) { Value = eiPaper[i].PID });
                    paramValue.Add(new MySqlParameter(string.Format("@AddTime{0}", i), MySqlDbType.Datetime) { Value = DateTime.Now });
                    paramValue.Add(new MySqlParameter(string.Format("@PaperName{0}", i), MySqlDbType.String) { Value = eiPaper[i].PaperName });

                };

                string sql = sqlStr.ToString();
                return MySQLHelper.ExecuteStatement(sqlStr.ToString().Trim(','), paramValue);
            }
            else
            {
                return -1;
            }

        }

        #endregion


        public Paper GetExam(int orgid, int tid, int subjectID, string PID, int ptype, int p)
        {
            Paper paper = new Paper();
            bool ok = false;
            StringBuilder sql = new StringBuilder();
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@subjectID", MySqlDbType.Int32, 11) { Value = subjectID });
            parameter.Add(new MySqlParameter("@PID", MySqlDbType.VarChar, 40) { Value = PID });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = tid });
            parameter.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11) { Value = orgid });
            parameter.Add(new MySqlParameter("@ptype", MySqlDbType.Int32, 11) { Value = ptype });
            if ((new int[] { 1, 2, 3 }).Contains(ptype))
            {
                if (p == 1)//第一次编辑
                {
                    ok = false;
                }
                else//非第一次编辑
                {
                    sql.Append(@"SELECT PID from ei_paper WHERE PID=@PID;");
                    MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
                    {
                        if (a.HasRows)//是否存在数据
                        {
                            ok = true;
                        }
                    }, parameter);
                }
            }
            else
            {
                ok = true;
            }

            sql.Clear();
            if (ok)
            {

            }
            else
            {
                sql.Append(@"DELETE from ei_paper WHERE OrgID=@OrgID AND TID=@TID;");
                sql.Append(@"DELETE from ei_paper_basket WHERE OrgID=@OrgID AND TID=@TID;");
                switch (ptype)
                {
                    //教学为基本功
                    case 1:
                        sql.Append(@"INSERT ei_paper(PID,OrgID,TID,ItemSourceType,IsShare,SubjectID,BigGrade,GradeID,PaperName,Score,CreateTime,UpdateTime)
SELECT  ID,@OrgID,@TID,@ptype,0,SubjectID,StageID,GradeID,`Name`,IFNULL((select Score from ei_tea_ebookreli where BookID=@PID and ItemType=1 limit 1 ),0) as Score,CreateTime,NOW() as UpdateTime
 From ei_tea_exambook WHERE ID=@PID;");
                        sql.Append(@"INSERT INTO ei_paper_basket(ID,TID,OrgID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,Score,DiffNum,PID)
SELECT UUID(),@TID,@OrgID,b.SequenceID,b.ItemID,b.ItemType,b.KnowledgeID,b.KnowledgeName,b.Score,b.DiffNum,b.BookID
from ei_tea_ebookreli b WHERE b.BookID=@PID;");
                        break;

                    //电子作业
                    case 2:
                        sql.Append(@"INSERT ei_paper(PID,OrgID,TID,ItemSourceType,IsShare,SubjectID,BigGrade,GradeID,PaperName,Score,CreateTime,UpdateTime)
SELECT  ID,@OrgID,@TID,@ptype,IsShare,SubjectID,StageID,GradeID,`Name`,IFNULL((select Score from ei_jbookreli where BookID=@PID and ItemType=1 limit 1 ),0) as Score,CreateTime,NOW() as UpdateTime
 From ei_jobbook WHERE ID=@PID;");
                        sql.Append(@"INSERT INTO ei_paper_basket(ID,TID,OrgID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,Score,DiffNum,PID)
SELECT UUID(),@TID,@OrgID,b.SequenceID,b.ItemID,b.ItemType,b.KnowledgeID,b.KnowledgeName,b.Score,b.DiffNum,b.BookID
from ei_jbookreli b WHERE b.BookID=@PID;");
                        break;

                    //在线考试
                    case 3:
                        sql.Append(@"INSERT ei_paper(PID,OrgID,TID,ItemSourceType,IsShare,SubjectID,BigGrade,GradeID,PaperName,Score,CreateTime,UpdateTime)
SELECT  ID,@OrgID,@TID,@ptype,IsShare,SubjectID,StageID,GradeID,`Name`,IFNULL((select Score from ei_ebookreli where BookID=@PID and ItemType=1 limit 1 ),0) as Score,CreateTime,NOW() as UpdateTime
 From ei_exambook WHERE ID=@PID;");
                        sql.Append(@"INSERT INTO ei_paper_basket(ID,TID,OrgID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,Score,DiffNum,PID)
SELECT UUID(),@TID,@OrgID,b.SequenceID,b.ItemID,b.ItemType,b.KnowledgeID,b.KnowledgeName,b.Score,b.DiffNum,b.BookID
from ei_ebookreli b WHERE b.BookID=@PID;");
                        break;
                    default:
                        break;
                }
            }
            sql.Append(@"SELECT AcaStru,ArtSciences from ei_managerinfo WHERE AccountNumber=@TID AND OrgID=@OrgID;");
            sql.Append(@"SELECT BigGrade,SubjectID,Score,PaperName,GradeID,IsShare from ei_paper where PID=@PID;");
            sql.Append(@"SELECT ItemID,SequenceID,ItemType,Score,DiffNum from ei_paper_basket WHERE PID=@PID;");
            paper.list = new List<EI_PaperBasket>();
            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        paper.AcaStru = a.IsDBNull(0) ? 0 : a.GetInt32(0);
                        paper.ArtSciences = a.IsDBNull(1) ? 0 : a.GetInt32(1);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            paper.BigGrade = a.GetInt32(0);
                            paper.SubjectID = a.GetInt32(1);
                            paper.Score = a.IsDBNull(2) ? 0 : a.GetFloat(2);
                            paper.PaperName = a.IsDBNull(3) ? string.Empty : a.GetString(3);
                            paper.GradeID = a.IsDBNull(4) ? 0 : a.GetInt32(4);
                            paper.IsShare = a.IsDBNull(5) ? 0 : a.GetInt32(5);
                        }
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            EI_PaperBasket dto = new EI_PaperBasket();
                            dto.ItemID = a.GetInt32(0);
                            dto.SequenceID = a.GetInt32(1);
                            dto.ItemType = a.GetInt32(2);
                            dto.Score = a.GetFloat(3);
                            dto.DiffNum = a.GetInt32(4);
                            paper.list.Add(dto);
                        }
                        if (paper.list.Where(q => q.ItemType == 1).Sum(t => t.Score) == 0)
                        {
                            paper.Score = 0;
                        }
                    }
                    else
                        paper.Score = 0;
                }

            }, parameter);

            return paper;
        }

        public bool DelDataIndex(string PID, int ItemID, int ActionStaus)
        {
            bool ok = false;
            StringBuilder sql = new StringBuilder();
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@PID", MySqlDbType.VarChar, 40) { Value = PID });
            parameter.Add(new MySqlParameter("@ItemID", MySqlDbType.Int32, 11) { Value = ItemID });
            parameter.Add(new MySqlParameter("@ActionStaus", MySqlDbType.Int32, 11) { Value = ActionStaus });
            sql.Append(@"DELETE from ei_paper_basket WHERE (TID=@PID AND ItemID=@ItemID and @ActionStaus=0) or 
(TID=@PID AND ItemType=@ActionStaus AND @ActionStaus<>0 );");
            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    ok = true;
                }
            }, parameter);

            return ok;
        }

        public bool CheckDataIndex(List<KnowledgePointList> dto)
        {
            bool ok = false;
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat(@"UPDATE ei_paper_basket a 
INNER JOIN (
SELECT '{0}' as PID,'{1}' as ItemID, {2} as SequenceID
UNION
SELECT '{3}' as PID,'{4}' as ItemID, {5} as SequenceID
) b on a.PID=b.PID AND a.ItemID=b.ItemID
SET a.SequenceID=b.SequenceID;", dto.First().PID, dto.First().ItemID, dto.First().ItemIndex, dto.Last().PID, dto.Last().ItemID, dto.Last().ItemIndex);
            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    ok = true;
                }
            }, null);

            return ok;
        }

        public bool SaveItem(PaperBasketModel para, List<EI_PaperBasket> dto)
        {

            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@PID", MySqlDbType.VarChar, 40) { Value = para.PID });
            parameter.Add(new MySqlParameter("@PaperName", MySqlDbType.VarChar, 255) { Value = para.PaperName });
            parameter.Add(new MySqlParameter("@IsShare", MySqlDbType.Bit, 1) { Value = para.IsShare });
            parameter.Add(new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11) { Value = para.SubjectID });
            parameter.Add(new MySqlParameter("@GradeID", MySqlDbType.Int32, 11) { Value = para.GradeID });
            parameter.Add(new MySqlParameter("@BigGrade", MySqlDbType.Int32, 11) { Value = para.BigGrade });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = para.TID });

            StringBuilder sql = new StringBuilder();

            var s = dto.Where(a => a.ItemID == 0).Select(b => b.Score).FirstOrDefault();//选择分值

            dto.RemoveAll(a => a.ItemID == 0);

            sql.Append(@"UPDATE ei_paper set PaperName=@PaperName, IsShare=@IsShare,BigGrade=@BigGrade,GradeID=@GradeID WHERE PID=@PID;");//更新选择

            sql.AppendFormat(@"UPDATE ei_paper_basket set Score={0} WHERE PID=@PID and ItemType=1;", s);//更新选择

            var innerSql = new StringBuilder();
            if (dto.Count > 0)
            {
                var i = 0;
                foreach (var item in dto)
                {
                    if (i == 0)
                        innerSql.AppendFormat(@" select '{0}' as PID,'{1}' as ItemID,{2} as T ", para.PID, item.ItemID, i + 1);
                    else
                        innerSql.AppendFormat(@" UNION select '{0}' as PID,'{1}' as ItemID,{2} as T ", para.PID, item.ItemID, i + 1);
                    i++;
                }
                sql.AppendFormat(@"UPDATE ei_paper_basket a 
INNER JOIN (
{0}
) as b on a.PID=b.PID AND a.ItemID=b.ItemID set a.SequenceID=b.T;", innerSql.ToString());
            }

            switch (para.PType)
            {
                case 4:
                    sql.AppendFormat(@"INSERT INTO ei_tea_exambook( ID,`Name`,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare,IsEnable)
SELECT PID,PaperName,0,TID,BigGrade,GradeID,SubjectID,CreateTime,NOW(),0,1,0,IsShare,1 FROM ei_paper
WHERE PID=@PID;");
                    sql.AppendFormat(@"INSERT INTO ei_tea_ebookreli( ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum )
SELECT UUID(),PID,KnowledgeID,KnowledgeName,ItemID,ItemType,0,SequenceID,Score,DiffNum FROM ei_paper_basket
WHERE PID=@PID;");
                    break;
                case 1:
                    //sql.Append(@"SELECT @t:=CreateTime from ei_tea_exambook WHERE ID=@PID;");
                    sql.Append(@"DELETE from ei_tea_exambook WHERE ID=@PID;");
                    sql.Append(@"DELETE from ei_tea_ebookreli WHERE BookID=@PID;");
                    sql.AppendFormat(@"INSERT INTO ei_tea_exambook( ID,`Name`,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare,IsEnable)
SELECT PID,PaperName,0,TID,BigGrade,GradeID,SubjectID,CreateTime,NOW(),0,1,0,IsShare,1 FROM ei_paper
WHERE PID=@PID;");
                    sql.AppendFormat(@"INSERT INTO ei_tea_ebookreli( ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum )
SELECT UUID(),PID,KnowledgeID,KnowledgeName,ItemID,ItemType,0,SequenceID,Score,DiffNum FROM ei_paper_basket
WHERE PID=@PID;");
                    break;
                case 5:
                    sql.Append(@"INSERT INTO ei_jobbook( ID,`Name`,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare)
SELECT PID,PaperName,TID,BigGrade,GradeID,SubjectID,CreateTime,NOW(),0,1,0,IsShare FROM ei_paper
WHERE PID=@PID;");
                    sql.Append(@"INSERT INTO ei_jbookreli( ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum )
SELECT UUID(),PID,KnowledgeID,KnowledgeName,ItemID,ItemType,0,SequenceID,Score,DiffNum FROM ei_paper_basket
WHERE PID=@PID;");

                    break;
                case 2:
                    //sql.Append(@"SELECT @t:=CreateTime from ei_jobbook WHERE ID=@PID;");
                    sql.Append(@"DELETE from ei_jobbook WHERE ID=@PID;");
                    sql.Append(@"DELETE from ei_jbookreli WHERE BookID=@PID;");
                    sql.Append(@"INSERT INTO ei_jobbook( ID,`Name`,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare)
SELECT PID,PaperName,TID,BigGrade,GradeID,SubjectID,CreateTime,NOW(),0,1,0,IsShare FROM ei_paper
WHERE PID=@PID;");
                    sql.Append(@"INSERT INTO ei_jbookreli( ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum )
SELECT UUID(),PID,KnowledgeID,KnowledgeName,ItemID,ItemType,0,SequenceID,Score,DiffNum FROM ei_paper_basket
WHERE PID=@PID;");
                    break;

                case 6:

                    sql.Append(@"INSERT INTO ei_exambook( ID,`Name`,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare)
SELECT PID,PaperName,0,TID,BigGrade,GradeID,SubjectID,CreateTime,NOW(),0,1,0,IsShare FROM ei_paper
WHERE PID=@PID;");
                    sql.Append(@"INSERT INTO ei_ebookreli( ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum)
SELECT UUID(),PID,KnowledgeID,KnowledgeName,ItemID,ItemType,0,SequenceID,Score,DiffNum FROM ei_paper_basket
WHERE PID=@PID;");
                    break;
                case 3:
                    // sql.Append(@"SELECT @t:=CreateTime from ei_exambook WHERE ID=@PID;");
                    sql.Append(@"DELETE from ei_exambook WHERE ID=@PID;");
                    sql.Append(@"DELETE from ei_ebookreli WHERE BookID=@PID;");
                    sql.Append(@"INSERT INTO ei_exambook( ID,`Name`,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare)
SELECT PID,PaperName,0,TID,BigGrade,GradeID,SubjectID,CreateTime,NOW(),0,1,0,IsShare FROM ei_paper
WHERE PID=@PID;");
                    sql.Append(@"INSERT INTO ei_ebookreli( ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum)
SELECT UUID(),PID,KnowledgeID,KnowledgeName,ItemID,ItemType,0,SequenceID,Score,DiffNum FROM ei_paper_basket
WHERE PID=@PID;");
                    break;
                default:
                    break;
            }
            sql.Append(@"DELETE from ei_paper_basket WHERE PID=@PID;");
            sql.Append(@"DELETE from ei_paper WHERE PID=@PID");

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameter) > 0 ? true : false;

        }

        public bool SaveSore(int TID, int OrgID, int ItemType, int itemID, double score)
        {
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@Score", MySqlDbType.Double) { Value = score });
            parameter.Add(new MySqlParameter("@ItemID", MySqlDbType.Int32, 11) { Value = itemID });
            parameter.Add(new MySqlParameter("@ItemType", MySqlDbType.Int32, 11) { Value = ItemType });
            parameter.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11) { Value = OrgID });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = TID });

            StringBuilder sql = new StringBuilder();
            if (ItemType == 1)
            {
                sql.Append(@"UPDATE ei_paper set Score=@Score where TID=@TID AND OrgID=@OrgID;");
                sql.AppendFormat(@"UPDATE ei_paper_basket set Score=@Score WHERE TID=@TID AND OrgID=@OrgID AND ItemType=1;");//
            }
            else
                sql.AppendFormat(@"UPDATE ei_paper_basket set Score=@Score WHERE TID=@TID AND OrgID=@OrgID AND ItemType=@ItemType AND ItemID=@ItemID;");//

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameter) > 0 ? true : false;
        }

        public bool SaveName(int OrgID, int TID, int SubjectID, string p)
        {
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@PaperName", MySqlDbType.VarChar, 255) { Value = p });
            parameter.Add(new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11) { Value = SubjectID });
            parameter.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11) { Value = OrgID });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = TID });

            StringBuilder sql = new StringBuilder();

            sql.AppendFormat(@"UPDATE ei_paper set PaperName=@PaperName WHERE TID=@TID AND OrgID=@OrgID AND SubjectID=@SubjectID;");//

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameter) > 0 ? true : false;
        }

        public bool SaveChange(int OrgID, int TID, int ItemID, int DiffNum, int newItemID)
        {
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@newItemID", MySqlDbType.Int32, 11) { Value = newItemID });
            parameter.Add(new MySqlParameter("@ItemID", MySqlDbType.Int32, 11) { Value = ItemID });
            parameter.Add(new MySqlParameter("@DiffNum", MySqlDbType.Int32, 11) { Value = DiffNum });
            parameter.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11) { Value = OrgID });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = TID });

            StringBuilder sql = new StringBuilder();

            sql.AppendFormat(@"UPDATE ei_paper_basket set ItemID=@newItemID,DiffNum=@DiffNum WHERE TID=@TID AND OrgID=@OrgID AND ItemID=@ItemID;");//

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameter) > 0 ? true : false;
        }

        public bool ClearPaper(int OrgID, int TID)
        {
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11) { Value = OrgID });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = TID });

            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(@"delete from  ei_paper_basket WHERE TID=@TID AND OrgID=@OrgID;");//
            sql.Append(@"delete from  ei_paper WHERE TID=@TID AND OrgID=@OrgID;");

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameter) > 0 ? true : false;
        }

        public Paper GetBookPreView(string bookID, int ptype)
        {
            Paper paper = new Paper();
            StringBuilder sql = new StringBuilder();
            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@bookID", MySqlDbType.VarChar, 40) { Value = bookID });
            switch (ptype)
            {
                //教学为基本功
                case 1:
                    sql.Append(@"SELECT StageID,SubjectID,(SELECT Score from ei_tea_ebookreli WHERE BookID=@bookID AND ItemType=1 LIMIT 1) as Score,`Name`,GradeID 
from ei_tea_exambook WHERE ID=@bookID;");
                    sql.Append(@"SELECT ItemID,SequenceID,ItemType,Score,DiffNum from ei_tea_ebookreli WHERE BookID=@bookID;");
                    break;
                //电子作业
                case 2:
                    sql.Append(@"SELECT StageID,SubjectID,(SELECT Score from ei_jbookreli WHERE BookID=@bookID AND ItemType=1 LIMIT 1) as Score,`Name`,GradeID 
from ei_jobbook WHERE ID=@bookID;");
                    sql.Append(@"SELECT ItemID,SequenceID,ItemType,Score,DiffNum from ei_jbookreli WHERE BookID=@bookID;");
                    break;
                //在线考试
                case 3:
                    sql.Append(@"SELECT StageID,SubjectID,(SELECT Score from ei_ebookreli WHERE BookID=@bookID AND ItemType=1 LIMIT 1) as Score,`Name`,GradeID 
from ei_exambook WHERE ID=@bookID;");
                    sql.Append(@"SELECT ItemID,SequenceID,ItemType,Score,DiffNum from ei_ebookreli WHERE BookID=@bookID;");
                    break;
                default:
                    break;
            }
            paper.list = new List<EI_PaperBasket>();
            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        paper.BigGrade = a.GetInt32(0);
                        paper.SubjectID = a.GetInt32(1);
                        paper.Score = a.IsDBNull(2) ? 0 : a.GetFloat(2);
                        paper.PaperName = a.IsDBNull(3) ? string.Empty : a.GetString(3);
                        paper.GradeID = a.IsDBNull(4) ? 0 : a.GetInt32(4);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            EI_PaperBasket dto = new EI_PaperBasket();
                            dto.ItemID = a.GetInt32(0);
                            dto.SequenceID = a.GetInt32(1);
                            dto.ItemType = a.GetInt32(2);
                            dto.Score = a.GetFloat(3);
                            dto.DiffNum = a.GetInt32(4);
                            paper.list.Add(dto);
                        }
                    }
                }

            }, parameter);

            return paper;
        }

        /// <summary>
        /// 获取试题篮汇总信息
        /// </summary>
        /// <param name="tid">教师ID</param>
        /// <returns></returns>
        public List<QueBoxSummary> GetSummary(int tid)
        {
            var rtValue = new List<QueBoxSummary>();

            StringBuilder sql = new StringBuilder();

            sql.Append("SELECT  ItemType,COUNT(ItemType) AS `Count` FROM ei_paper_basket WHERE TID = @tid GROUP BY ItemType ORDER BY ItemType ");


            List<MySqlParameter> parameter = new List<MySqlParameter>
            {
                new MySqlParameter("@tid", MySqlDbType.Int32, 40) {Value = tid}
            };


            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        QueBoxSummary item = new QueBoxSummary();
                        item.ItemType = a.GetInt32("ItemType");
                        item.Count = a.GetInt32("Count");
                        rtValue.Add(item);
                    }
                }

            }, parameter);




            return rtValue;


        }

        /// <summary>
        /// 获取试题篮主记录
        /// </summary>
        /// <param name="tid">教师ID</param>
        /// <param name="org">机构ID</param>
        /// <returns>题篮主记录</returns>
        public QueBoxMain GetMainRecored(int tid, int org)
        {
            QueBoxMain rtValue = null;

            const string sql = @"SELECT `PID`,`OrgID`,`TID`,`ItemSourceType`,`IsShare`,`SubjectID`,`BigGrade`,`GradeID`,`PaperName`,`Score`,`CreateTime`,`UpdateTime` FROM ei_paper WHERE TID=@tid AND OrgID=@orgid LIMIT 1";

            List<MySqlParameter> parameter = new List<MySqlParameter>
            {
                new MySqlParameter("@tid", MySqlDbType.Int32, 40) {Value = tid},
                new MySqlParameter("@orgid", MySqlDbType.Int32, 40) {Value = org}
            };


            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        rtValue = new QueBoxMain();
                        rtValue.BigGrade = a.GetInt32("BigGrade");
                        rtValue.CreateTime = a.GetDateTime("CreateTime");
                        rtValue.GradeID = a.GetInt32("GradeID");
                        rtValue.IsShare = a.GetBoolean("IsShare");
                        rtValue.ItemSourceType = a.GetInt32("ItemSourceType");
                        rtValue.OrgID = a.GetInt32("OrgID");
                        rtValue.PID = a.GetString("PID");
                        rtValue.PaperName = a.GetString("PaperName");
                        rtValue.Score = a.GetInt32("Score");
                        rtValue.SubjectID = a.GetInt32("SubjectID");
                        rtValue.TID = a.GetInt32("TID");
                        rtValue.UpdateTime = a.GetDateTime("UpdateTime");

                        break;

                    }
                }

            }, parameter);


            return rtValue;
        }





        /// <summary>
        /// 检查试题篮科目
        /// </summary>
        /// <param name="tid">教师ID</param>
        /// <param name="org">机构ID</param>
        public void ClearBox(int tid, int org)
        {

            List<MySqlParameter> parameter = new List<MySqlParameter>
            {
                new MySqlParameter("@tid", MySqlDbType.Int32, 40) {Value = tid},
                new MySqlParameter("@orgid", MySqlDbType.Int32, 40) {Value = org}
            };

            var res = MySQLHelper.ExecuteSql(@"DELETE FROM ei_paper  WHERE TID=@tid AND OrgID=@orgid ", parameter.ToArray());


        }

        /// <summary>
        /// 更新试题篮主记录
        /// </summary>
        /// <param name="box"></param>
        /// <returns></returns>
        public bool UpdateBox(QueBoxMain box)
        {


            string sql = @"UPDATE `ei_paper` SET  `SubjectID` = @subject,`BigGrade` = @bgrade,`UpdateTime` = @time ,`PaperName`=@paperName,`ItemSourceType`=@ptype WHERE `OrgID` = @orgid and `TID` = @tid ";

            List<MySqlParameter> parameter = new List<MySqlParameter>
            {
                new MySqlParameter("@tid", MySqlDbType.Int32, 40) {Value = box.TID},
                new MySqlParameter("@orgid", MySqlDbType.Int32, 40) {Value = box.OrgID},
                new MySqlParameter("@subject", MySqlDbType.Int32, 40) {Value = box.SubjectID},
                new MySqlParameter("@bgrade", MySqlDbType.Int32, 40) {Value = box.BigGrade},
                new MySqlParameter("@time", MySqlDbType.DateTime, 40) {Value =DateTime.Now},
                new MySqlParameter("@paperName", MySqlDbType.String, 40) {Value =box.PaperName},
                new MySqlParameter("@ptype", MySqlDbType.String, 40) {Value =box.ItemSourceType},
            };


            var res = MySQLHelper.ExecuteSql(sql, parameter.ToArray());
            if (res == 0)
            {
                var insertSql = @"INSERT INTO `ei_paper`
                                       (`PID`,
                                        `OrgID`,
                                        `TID`,
                                        `ItemSourceType`,
                                        `IsShare`,
                                        `SubjectID`,
                                        `BigGrade`,
                                        `GradeID`,
                                        `PaperName`,
                                        `Score`,
                                        `CreateTime`,
                                        `UpdateTime`)     
                                VALUES (@pid,
                                        @orgid,
                                        @tid,
                                        @ptype,
                                        b'0',
                                        @subject,
                                        @bgrade,
                                        0,
                                        @paperName,
                                        0,
                                        @time,
                                        @time);";

                parameter.Add(new MySqlParameter("@pid", MySqlDbType.String, 40) { Value = box.PID });

                MySQLHelper.ExecuteSql(insertSql, parameter.ToArray());

            }

            return true;
        }

        /// <summary>
        /// 清除试题篮中某个试卷的题目
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="tid"></param>
        /// <param name="ids"></param>
        /// <returns></returns>
        public bool ClearFromPaper(int orgID, int tid, int[] ids)
        {


            List<MySqlParameter> parameter = new List<MySqlParameter>();
            parameter.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11) { Value = orgID });
            parameter.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11) { Value = tid });

            StringBuilder sql = new StringBuilder();



            sql.AppendFormat(@"delete from  ei_paper_basket WHERE TID=@TID AND OrgID=@OrgID");//
            //sql.Append(@"delete from  ei_paper WHERE TID=@TID AND OrgID=@OrgID");

            if (ids.Length > 0)
            {
                var idstr = String.Join(",", ids);
                sql.Append(" and ItemID in (");
                sql.Append(idstr).Append(")");
            }
            else
            {
                sql.Append("and 1 != 1");
            }
            return MySQLHelper.ExecuteStatement(sql.ToString(), parameter) > 0 ? true : false;

        }
    }
}
