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
    ///SyncJAnswerDal： 同步学习答题
    /// </summary>
    public class SyncJAnswerDal
    {
        private StudentInfoDal _studentInfoDal = new StudentInfoDal(); //学生信息
        /// <summary>
        /// 获取累计用时
        /// </summary>
        /// <returns></returns>
        public int GetSum(string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select sum(AnswerTime) as total from EI_SyncJAnswer");
            strSql.Append(" where JID=@JID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)
                                 };
            parameters[0].Value = jobId;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows[0]["total"].ToString() == "")
            { return 0; }
            else
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0]["total"].ToString());
            }
        }

        /// <summary>
        /// 根据作业ID和试题ID获取答题
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public SyncJAnswerModel GetModel(string jobId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select SID,JID,ItemID,Answer,NoteContent,Accuracy,AnswerTime,Accumulated from EI_SyncJAnswer ");
            strSql.Append(" where JID=@JID AND ItemID=@ItemID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
                           new MySqlParameter("@ItemID", MySqlDbType.VarChar,40)
                                         };
            parameters[0].Value = jobId;
            parameters[1].Value = itemId;

            EI_Job model = new EI_Job();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<SyncJAnswerModel>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 判断是否存在答题记录
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool Exists(string jobId, string itemId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_SyncJAnswer");
            strSql.Append(" where JID=@JID and ItemID=@ItemID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.Int32,40)                      };
            parameters[0].Value = jobId;
            parameters[1].Value = itemId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_SyncJAnswer model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_SyncJAnswer(");
            strSql.Append("ID,SID,JID,ItemID,Answer,NoteContent,Accuracy,AnswerTime,Accumulated,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@ID,@SID,@JID,@ItemID,@Answer,@NoteContent,@Accuracy,@AnswerTime,@Accumulated,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@ItemID", MySqlDbType.Int32,40),
					new MySqlParameter("@Answer", MySqlDbType.VarChar,40),
					new MySqlParameter("@NoteContent", MySqlDbType.VarChar,500),
					new MySqlParameter("@Accuracy", MySqlDbType.Float,11),
                    new MySqlParameter("@AnswerTime", MySqlDbType.VarChar,10),
                    new MySqlParameter("@Accumulated", MySqlDbType.VarChar,10),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)
                                          };
            parameters[0].Value = model.ID;
            parameters[1].Value = model.SID;
            parameters[2].Value = model.JID;
            parameters[3].Value = model.ItemID;
            parameters[4].Value = model.Answer;
            parameters[5].Value = model.NoteContent;
            parameters[6].Value = model.Accuracy;
            parameters[7].Value = model.AnswerTime;
            parameters[8].Value = model.Accumulated;
            parameters[9].Value = model.CreateTime;
            parameters[10].Value = model.DelFlag;
            parameters[11].Value = model.Remark;
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
        /// 增加一条数据
        /// </summary>
        public bool Add(List<EI_SyncJAnswer> modelList)
        {
            #region 批量提交数据
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            int i = 0;
            if (modelList.Count > 0)
            {
                foreach (var model in modelList)
                {
                    StringBuilder strSql = new StringBuilder();
                    strSql.Append("insert into EI_SyncJAnswer(");
                    strSql.Append("ID,SID,JID,ItemID,Answer,NoteContent,Accuracy,AnswerTime,Accumulated,CreateTime,DelFlag,Remark)");
                    strSql.Append(" values (");
                    strSql.AppendFormat("@ID{0},@SID{0},@JID{0},@ItemID{0},@Answer{0},@NoteContent{0},@Accuracy{0},@AnswerTime{0},@Accumulated{0},@CreateTime{0},@DelFlag{0},@Remark{0});", i);
                    MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@ID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@SID{0}",i), MySqlDbType.VarChar,40),
                    new MySqlParameter(string.Format("@JID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@ItemID{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@Answer{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@NoteContent{0}",i), MySqlDbType.VarChar,500),
					new MySqlParameter(string.Format("@Accuracy{0}",i), MySqlDbType.Float,11),
                    new MySqlParameter(string.Format("@AnswerTime{0}",i), MySqlDbType.VarChar,10),
                    new MySqlParameter(string.Format("@Accumulated{0}",i), MySqlDbType.VarChar,10),
					new MySqlParameter(string.Format("@CreateTime{0}",i), MySqlDbType.DateTime),
					new MySqlParameter(string.Format("@DelFlag{0}",i), MySqlDbType.Int32,1),
					new MySqlParameter(string.Format("@Remark{0}",i), MySqlDbType.VarChar,50)
                                          };


                    parameters[0].Value = model.ID;
                    parameters[1].Value = model.SID;
                    parameters[2].Value = model.JID;
                    parameters[3].Value = model.ItemID;
                    parameters[4].Value = model.Answer;
                    parameters[5].Value = model.NoteContent;
                    parameters[6].Value = model.Accuracy;
                    parameters[7].Value = model.AnswerTime;
                    parameters[8].Value = model.Accumulated;
                    parameters[9].Value = model.CreateTime;
                    parameters[10].Value = model.DelFlag;
                    parameters[11].Value = model.Remark;

                    SqlList.Add(strSql.ToString());
                    sqlParamList.Add(parameters);
                    i++;
                    //保存答题记录
                    SqlList.Add(new WrongDal().SaveAnswerHistroy(model.SID, model.ItemID.ToString(), model.SubjectID, model.Answer, model.Accuracy.ToString(), model.AnswerTime.ToString()));
                    sqlParamList.Add(new MySqlParameter[] { });


                }
            }
            #endregion


            return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
        }

        /// <summary>
        /// 同步学习结果层算法
        /// </summary>
        /// <returns></returns>
        public string SumbitList(SyncJobModel syncJobModel)
        {

            bool result = false;
            string masterRate = string.Empty;
            #region 批量提交数据
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            var modelList = syncJobModel.SyncJAnswerModelList;
            StringBuilder strSql1 = new StringBuilder();
            strSql1.AppendFormat("Delete FROM EI_SyncJAnswer WHERE JID='{0}';", syncJobModel.ID);
            SqlList.Add(strSql1.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            int i = 0;
            if (modelList.Count > 0)
            {
                foreach (var model in modelList)
                {
                    StringBuilder strSql = new StringBuilder();
                    strSql.Append("insert into EI_SyncJAnswer(");
                    strSql.Append("ID,SID,JID,ItemID,Answer,NoteContent,Accuracy,AnswerTime,Accumulated,CreateTime,DelFlag,Remark)");
                    strSql.Append(" values (");
                    strSql.AppendFormat("@ID{0},@SID{0},@JID{0},@ItemID{0},@Answer{0},@NoteContent{0},@Accuracy{0},@AnswerTime{0},@Accumulated{0},@CreateTime{0},@DelFlag{0},@Remark{0});", i);
                    MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@ID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@SID{0}",i), MySqlDbType.VarChar,40),
                    new MySqlParameter(string.Format("@JID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@ItemID{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@Answer{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@NoteContent{0}",i), MySqlDbType.VarChar,500),
					new MySqlParameter(string.Format("@Accuracy{0}",i), MySqlDbType.Float,11),
                    new MySqlParameter(string.Format("@AnswerTime{0}",i), MySqlDbType.VarChar,10),
                    new MySqlParameter(string.Format("@Accumulated{0}",i), MySqlDbType.VarChar,10),
					new MySqlParameter(string.Format("@CreateTime{0}",i), MySqlDbType.DateTime),
					new MySqlParameter(string.Format("@DelFlag{0}",i), MySqlDbType.Int32,1),
					new MySqlParameter(string.Format("@Remark{0}",i), MySqlDbType.VarChar,50)
                                          };

                    parameters[0].Value = model.ID;
                    parameters[1].Value = model.SID;
                    parameters[2].Value = model.JID;
                    parameters[3].Value = model.ItemID;
                    parameters[4].Value = model.Answer;
                    parameters[5].Value = model.NoteContent;
                    parameters[6].Value = model.Accuracy;
                    parameters[7].Value = model.AnswerTime;
                    parameters[8].Value = model.Accumulated;
                    parameters[9].Value = model.CreateTime;
                    parameters[10].Value = model.DelFlag;
                    parameters[11].Value = model.Remark;

                    SqlList.Add(strSql.ToString());
                    sqlParamList.Add(parameters);
                    i++;
                    //保存答题记录
                    SqlList.Add(new WrongDal().SaveAnswerHistroy(model.SID, model.ItemID.ToString(), model.SubjectID, model.Answer, model.Accuracy.ToString(), model.AnswerTime.ToString()));
                    sqlParamList.Add(new MySqlParameter[] { });

                    #region 向错题本中插入数据

                    if (model.Accuracy == 0)
                    {
                        SqlList.Add(new WrongDal().SaveWrong(
                            model.SID,
                            syncJobModel.RuleType.ToString(),
                            model.ItemID.ToString(),
                            model.SubjectID,
                            model.Answer,
                            model.Accuracy.ToString(),
                            syncJobModel.KnowledgeID.ToString(),
                            syncJobModel.KnowledgeName,
                            model.GradeID.ToString(),
                            model.StageID.ToString()));
                        sqlParamList.Add(new MySqlParameter[] { });
                    }

                    #endregion

                }
            }
            #endregion
            #region 保存日记

            SqlList.Add(new StudentInfoDal().SaveDiary(
                 syncJobModel.SID,
                 (byte)syncJobModel.RuleType,
                 syncJobModel.KnowledgeName,
                 DataConverter.GetSubjectIDStr(Convert.ToInt32(syncJobModel.SubjectID)),
                 10,
                 modelList.Where(x => x.Accuracy == 1).Count().ToString(),
                 syncJobModel.KnowledgeID.ToString()));
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion

            #region 根据逻辑判断插入经验值
            var rightcount = modelList.Where(x => x.Accuracy == 1).Count();
            masterRate = (int)((Math.Round((decimal)rightcount / 10, 2)) * 100) + "%";
            int expervalue = 0;
            switch (rightcount)
            {
                case 6:
                    expervalue = 2;
                    break;
                case 7:
                    expervalue = 4;
                    break;
                case 8:
                    expervalue = 6;
                    break;
                case 9:
                    expervalue = 8;
                    break;
                case 10:
                    expervalue = 10;
                    break;
            }

            SqlList.Add(_studentInfoDal.UpdateExperNumber(syncJobModel.SID, expervalue));
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion

            #region 获取掌握率和轮数

            StringBuilder str = new StringBuilder();
            str.Append(@"update EI_SyncJob AS A INNER JOIN  (");
            str.AppendFormat(@"select max(RoundNumber)+1 as RoundNumber,'{0}' AS ID From EI_SyncJob ", syncJobModel.ID);
            str.AppendFormat(@" where SID='{0}' and KnowledgeID='{1}' and GradeID='{2}' and SubjectID='{3}' and RuleType='{4}' and StageID='{5}') AS B",
                syncJobModel.SID,
                syncJobModel.KnowledgeID,
                syncJobModel.GradeID,
                syncJobModel.SubjectID,
                syncJobModel.RuleType,
                 modelList.First().StageID);
            str.Append(" ON A.ID=B.ID ");
            str.AppendFormat(" SET  A.RoundNumber=B.RoundNumber,A.MasterRate='{0}',A.CreateTime='{1}' WHERE A.ID='{2}'",
                masterRate,
                DateTime.Now,
                syncJobModel.ID
                );

            SqlList.Add(str.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion
            result = MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;

            #region 更新奖杯数量算法
            str.Clear();
            str.AppendFormat("Select RoundNumber,MasterRate,TropNumber From EI_SyncJob where SID='{0}' and KnowledgeID='{1}' and GradeID='{2}' and SubjectID='{3}' and RuleType='{4}' and StageID='{5}'",
                syncJobModel.SID,
                syncJobModel.KnowledgeID,
                syncJobModel.GradeID,
                syncJobModel.SubjectID,
                syncJobModel.RuleType,
                modelList.First().StageID);
            DataSet ds = MySQLHelper.Query(str.ToString());
            int flag = 0;
            int tropcount = 0;
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (var r = 0; r < ds.Tables[0].Rows.Count; r++)
                {
                    if (ds.Tables[0].Rows[r]["MasterRate"].ToString() == "100%")
                    {
                        flag++;
                    }
                }
            }
            str.Clear();
            if (flag >= 1 && flag < 3)
            {
                //一次全对1个奖杯
                tropcount = 1;
            }
            else if (flag >= 3 && flag < 5)
            {
                //三次全对2个奖杯
                tropcount = 2;
            }
            else if (flag >= 5)
            {
                //五次全对3个奖杯
                tropcount = 3;
            }
            else //没有奖杯更新奖杯为0
            {
                tropcount = 0;
            }
            #endregion
            str.AppendFormat("update EI_SyncJob Set TropNumber='{0}',CreateTime='{1}'  where SID='{2}' and KnowledgeID='{3}' and GradeID='{4}' and SubjectID='{5}' and RuleType='{6}' and StageID='{7}'",
                tropcount,
                DateTime.Now,
                syncJobModel.SID,
                syncJobModel.KnowledgeID,
                syncJobModel.GradeID,
                syncJobModel.SubjectID,
                syncJobModel.RuleType,
                modelList.First().StageID
                );

            result = MySQLHelper.ExecuteSql(str.ToString()) > 0;
            return rightcount.ToString() + "_" + expervalue.ToString() + "_" + tropcount.ToString();
        }

        /// <summary>
        /// 测评分析结果层算法
        /// </summary>
        /// <param name="syncJobModel"></param>
        /// <returns></returns>
        public string SumbitTestAnalyList(SyncJobModel syncJobModel)
        {
            int masterRate =0;
            bool result = false;
        
            #region 批量提交数据
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            var modelList = syncJobModel.SyncJAnswerModelList;
            StringBuilder strSql1 = new StringBuilder();
            strSql1.AppendFormat("Delete FROM EI_SyncJAnswer WHERE JID='{0}';", syncJobModel.ID);
            SqlList.Add(strSql1.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            int i = 0;

            if (modelList.Count > 0)
            {
                foreach (var model in modelList)
                {
                    StringBuilder strSql = new StringBuilder();
                    strSql.Append("insert into EI_SyncJAnswer(");
                    strSql.Append("ID,SID,JID,ItemID,Answer,NoteContent,Accuracy,AnswerTime,Accumulated,CreateTime,DelFlag,Remark)");
                    strSql.Append(" values (");
                    strSql.AppendFormat("@ID{0},@SID{0},@JID{0},@ItemID{0},@Answer{0},@NoteContent{0},@Accuracy{0},@AnswerTime{0},@Accumulated{0},@CreateTime{0},@DelFlag{0},@Remark{0});", i);
                    MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@ID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@SID{0}",i), MySqlDbType.VarChar,40),
                    new MySqlParameter(string.Format("@JID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@ItemID{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@Answer{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@NoteContent{0}",i), MySqlDbType.VarChar,500),
					new MySqlParameter(string.Format("@Accuracy{0}",i), MySqlDbType.Float,11),
                    new MySqlParameter(string.Format("@AnswerTime{0}",i), MySqlDbType.VarChar,10),
                    new MySqlParameter(string.Format("@Accumulated{0}",i), MySqlDbType.VarChar,10),
					new MySqlParameter(string.Format("@CreateTime{0}",i), MySqlDbType.DateTime),
					new MySqlParameter(string.Format("@DelFlag{0}",i), MySqlDbType.Int32,1),
					new MySqlParameter(string.Format("@Remark{0}",i), MySqlDbType.VarChar,50)
                                          };

                    parameters[0].Value = model.ID;
                    parameters[1].Value = model.SID;
                    parameters[2].Value = model.JID;
                    parameters[3].Value = model.ItemID;
                    parameters[4].Value = model.Answer;
                    parameters[5].Value = model.NoteContent;
                    parameters[6].Value = model.Accuracy;
                    parameters[7].Value = model.AnswerTime;
                    parameters[8].Value = model.Accumulated;
                    parameters[9].Value = model.CreateTime;
                    parameters[10].Value = model.DelFlag;
                    parameters[11].Value = model.Remark;

                    SqlList.Add(strSql.ToString());
                    sqlParamList.Add(parameters);
                    i++;
                    //保存答题记录
                    SqlList.Add(new WrongDal().SaveAnswerHistroy(model.SID, model.ItemID.ToString(), model.SubjectID, model.Answer, model.Accuracy.ToString(), model.AnswerTime.ToString()));
                    sqlParamList.Add(new MySqlParameter[] { });

                    #region 向错题本中插入数据

                    if (model.Accuracy == 0)
                    {
                        SqlList.Add(new WrongDal().SaveWrong(
                            model.SID,
                            syncJobModel.RuleType.ToString(),
                            model.ItemID.ToString(),
                            model.SubjectID,
                            model.Answer,
                            model.Accuracy.ToString(),
                            syncJobModel.KnowledgeID.ToString(),
                            syncJobModel.KnowledgeName,
                            model.GradeID.ToString(),
                            model.StageID.ToString()));
                        sqlParamList.Add(new MySqlParameter[] { });
                    }

                    #endregion

                }
            }
            #endregion
            #region 保存日记

            SqlList.Add(new StudentInfoDal().SaveDiary(
                 syncJobModel.SID,
                 (byte)syncJobModel.RuleType,
                 syncJobModel.KnowledgeName,
                 DataConverter.GetSubjectIDStr(Convert.ToInt32(syncJobModel.SubjectID)),
                 10,
                 modelList.Where(x => x.Accuracy == 1).Count().ToString(),
                 syncJobModel.KnowledgeID.ToString()));
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion
            var rightcount = modelList.Where(x => x.Accuracy == 1).Count();
            masterRate = (int)((Math.Round((decimal)rightcount / 10, 2)) * 100);
            #region 更新测评分析的掌握率
            StringBuilder str = new StringBuilder();
            str.AppendFormat("Update EI_SyncJob Set MasterRate='{0}',CreateTime='{1}' where ID='{2}'",
                masterRate+"%",
                DateTime.Now,
                syncJobModel.ID
                );
            SqlList.Add(str.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion

            #region  根据逻辑判断插入经验值
            int expervalue = 0;
            if(masterRate>syncJobModel.HistoryLevel)
            {
                expervalue = 5;
                SqlList.Add(_studentInfoDal.UpdateExperNumber(syncJobModel.SID, expervalue));
                sqlParamList.Add(new MySqlParameter[] { });
            }
            #endregion

            result = MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
          
            return  rightcount.ToString()+"_"+masterRate.ToString()+"%";
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_SyncJAnswer model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_SyncJAnswer set ");
            strSql.Append("SID=@SID,");
            strSql.Append("Answer=@Answer,");
            strSql.Append("Accuracy=@Accuracy,");
            strSql.Append("AnswerTime=@AnswerTime,");
            strSql.Append("Accumulated=@Accumulated");
            strSql.Append(" where JID=@JID and ItemID=@ItemID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.Int32,40),
					new MySqlParameter("@Answer", MySqlDbType.VarChar,40),
					new MySqlParameter("@Accuracy", MySqlDbType.Float,11),
                    new MySqlParameter("@AnswerTime", MySqlDbType.VarChar,40),
					new MySqlParameter("@Accumulated", MySqlDbType.VarChar,10),
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
				    new MySqlParameter("@ItemID", MySqlDbType.Int32,11)
                                          };

            parameters[0].Value = model.SID;
            parameters[1].Value = model.Answer;
            parameters[2].Value = model.Accuracy;
            parameters[3].Value = model.AnswerTime;
            parameters[4].Value = model.Accumulated;
            parameters[5].Value = model.JID;
            parameters[6].Value = model.ItemID;


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
        /// 向错题本中插入记录
        /// </summary>
        /// <param name="idlist"></param>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public int InsertWrongList(ShowAnalysisModel showmodel)
        {
            int flag = 0;
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select SID,JID,ItemID,Answer,NoteContent,Accuracy,AnswerTime,Accumulated from EI_SyncJAnswer ");
            strSql.Append(" where JID=@JID AND FIND_IN_SET(ItemID,@ItemID) And Accuracy=0");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemID", MySqlDbType.VarChar,100)
                                         };
            parameters[0].Value = showmodel.jobId;
            parameters[1].Value = showmodel.idlist;
            DataTable dt = MySQLHelper.Query(strSql.ToString(), parameters).Tables[0];
            if (dt.Rows.Count > 0)
            {
                for (var i = 0; i < dt.Rows.Count; i++)
                {
                    //保存错题本
                    var str = new WrongDal().SaveWrong(showmodel.sid, showmodel.ruletype.ToString(), dt.Rows[i]["ItemID"].ToString(), showmodel.subjectid,
                           dt.Rows[i]["Answer"].ToString(), "0", showmodel.knid, showmodel.kname, "1", "1");
                    MySQLHelper.ExecuteSql(str);
                    flag++;

                }
            }

            //保存日记
            string sqlSql1 = new StudentInfoDal().SaveDiary(showmodel.sid, (byte)showmodel.ruletype, showmodel.kname, DataConverter.GetSubjectIDStr(Convert.ToInt32(showmodel.subjectid)), 10, (10 - Convert.ToInt32(dt.Rows.Count)).ToString(), showmodel.knid);
            MySQLHelper.ExecuteSql(sqlSql1.ToString());


            return dt.Rows.Count;
        }


        /// <summary>
        /// 向Redis中保存测评分析答题数据
        /// </summary>
        /// <param name="syncJobModel"></param>
        /// <returns></returns>
        public bool SaveRedisReferInfo(SyncJobModel syncJobModel)
        {
            var syncJAnswerModelList = syncJobModel.SyncJAnswerModelList;
            return RedisDal.SetValue(RedisTypeEnum.Jobitem, syncJobModel.ID, syncJAnswerModelList);
        }
        /// <summary>
        /// 从Rdis中获取数据
        /// </summary>
        /// <param name="jid"></param>
        /// <returns></returns>
        public SyncJobModel GetReferSyncModel(string jid)
        {
            var syncJobModel=new SyncJobModel
            {
                ID = jid,
                SyncJAnswerModelList = RedisDal.GetValue<List<SyncJAnswerModel>>(RedisTypeEnum.Jobitem, jid)
            };

            return syncJobModel;
        }

    }

}
