﻿/*
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

namespace Mfg.EI.DAL
{
    /// <summary>
    ///JAnswerDal: 电子作业答题表【EI_JAnswer】操作的功能
    /// </summary>
    public class JAnswerDal
    {
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string jID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_JAnswer");
            strSql.Append(" where JID=@JID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_JAnswer model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_JAnswer(");
            strSql.Append("ID,SID,JID,ItemID,Answer,Score,AnswerTime,Review,NoteContent,Accuracy,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@ID,@SID,@JID,@ItemID,@Answer,@Score,@AnswerTime,@Review,@NoteContent,@Accuracy,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@ItemID", MySqlDbType.Int32,11),
					new MySqlParameter("@Answer", MySqlDbType.VarChar,40),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
					new MySqlParameter("@AnswerTime", MySqlDbType.VarChar,10),
					new MySqlParameter("@Review", MySqlDbType.VarChar,500),
					new MySqlParameter("@NoteContent", MySqlDbType.VarChar,500),
					new MySqlParameter("@Accuracy", MySqlDbType.Float,2),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.SID;
            parameters[2].Value = model.JID;
            parameters[3].Value = model.ItemID;
            parameters[4].Value = model.Answer;
            parameters[5].Value = model.Score;
            parameters[6].Value = model.AnswerTime;
            parameters[7].Value = model.Review;
            parameters[8].Value = model.NoteContent;
            parameters[9].Value = model.Accuracy;
            parameters[10].Value = model.CreateTime;
            parameters[11].Value = model.DelFlag;
            parameters[12].Value = model.Remark;

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
        /// 添加多条数据
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        public bool Add(List<EI_JAnswer> models)
        {
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            int i = 0;
            foreach (var model in models)
            {
                StringBuilder strSql = new StringBuilder();

                strSql.Append("insert into EI_JAnswer(");
                strSql.Append("ID,SID,JID,ItemID,Answer,Score,AnswerTime,Review,NoteContent,Accuracy,CreateTime,DelFlag,Remark)");
                strSql.Append(" values (");
                strSql.AppendFormat("@ID{0},@SID{0},@JID{0},@ItemID{0},@Answer{0},@Score{0},@AnswerTime{0},@Review{0},@NoteContent{0},@Accuracy{0},@CreateTime{0},@DelFlag{0},@Remark{0});", i);

                MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@ID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@SID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@JID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@ItemID{0}",i), MySqlDbType.Int32,11),
					new MySqlParameter(string.Format("@Answer{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@Score{0}",i), MySqlDbType.Float,5),
					new MySqlParameter(string.Format("@AnswerTime{0}",i), MySqlDbType.VarChar,10),
					new MySqlParameter(string.Format("@Review{0}",i), MySqlDbType.VarChar,500),
					new MySqlParameter(string.Format("@NoteContent{0}",i), MySqlDbType.VarChar,500),
					new MySqlParameter(string.Format("@Accuracy{0}",i), MySqlDbType.Float,2),
					new MySqlParameter(string.Format("@CreateTime{0}",i), MySqlDbType.DateTime),
					new MySqlParameter(string.Format("@DelFlag{0}",i), MySqlDbType.Int32,1),
					new MySqlParameter(string.Format("@Remark{0}",i), MySqlDbType.VarChar,50)};
                parameters[0].Value = model.ID;
                parameters[1].Value = model.SID;
                parameters[2].Value = model.JID;
                parameters[3].Value = model.ItemID;
                parameters[4].Value = model.Answer;
                parameters[5].Value = model.Score;
                parameters[6].Value = model.AnswerTime;
                parameters[7].Value = model.Review;
                parameters[8].Value = model.NoteContent;
                parameters[9].Value = model.Accuracy;
                parameters[10].Value = model.CreateTime;
                parameters[11].Value = model.DelFlag;
                parameters[12].Value = model.Remark;

                SqlList.Add(strSql.ToString());
                sqlParamList.Add(parameters);
                i++;
            }

            return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;

        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_JAnswer model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_JAnswer set ");
            strSql.Append("SID=@SID,");
            strSql.Append("JID=@JID,");
            strSql.Append("ItemID=@ItemID,");
            strSql.Append("Answer=@Answer,");
            strSql.Append("Score=@Score,");
            strSql.Append("AnswerTime=@AnswerTime,");
            strSql.Append("Review=@Review,");
            strSql.Append("NoteContent=@NoteContent,");
            strSql.Append("Accuracy=@Accuracy,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@ItemID", MySqlDbType.Int32,11),
					new MySqlParameter("@Answer", MySqlDbType.VarChar,40),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
					new MySqlParameter("@AnswerTime", MySqlDbType.VarChar,10),
					new MySqlParameter("@Review", MySqlDbType.VarChar,500),
					new MySqlParameter("@NoteContent", MySqlDbType.VarChar,500),
					new MySqlParameter("@Accuracy", MySqlDbType.Float,2),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.SID;
            parameters[1].Value = model.JID;
            parameters[2].Value = model.ItemID;
            parameters[3].Value = model.Answer;
            parameters[4].Value = model.Score;
            parameters[5].Value = model.AnswerTime;
            parameters[6].Value = model.Review;
            parameters[7].Value = model.NoteContent;
            parameters[8].Value = model.Accuracy;
            parameters[9].Value = model.CreateTime;
            parameters[10].Value = model.DelFlag;
            parameters[11].Value = model.Remark;
            parameters[12].Value = model.ID;

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
        /// 修改教师批改信息
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        public bool Update(List<EI_JAnswer> models, string tId, string tname)
        {
            if (models.Count(m => m.ItemType == 1) < models.Count)
            {

                List<String> SqlList = new List<String>();
                List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
                int i = 0;
                var accary = 0f;
                var totalScore = 0f;
                var totalFullScore = 0;

                #region 更新答题表分数评语 保存学霸日记

                foreach (var model in models)
                {

                    StringBuilder strSql = new StringBuilder();
                    strSql.Append("update EI_JAnswer set ");
                    strSql.Append(string.Format("Score=@Score{0},", i));
                    strSql.Append(string.Format("Review=@Review{0},", i));
                    strSql.Append(string.Format("Accuracy=@Accuracy{0}", i));
                    strSql.Append(string.Format(" where ID=@ID{0};", i));
                    MySqlParameter[] parameters =
                    {
                        new MySqlParameter(string.Format("@Score{0}", i), MySqlDbType.Float, 5),
                        new MySqlParameter(string.Format("@Review{0}", i), MySqlDbType.VarChar, 500),
                        new MySqlParameter(string.Format("@Accuracy{0}", i), MySqlDbType.Float, 4),
                        new MySqlParameter(string.Format("@ID{0}", i), MySqlDbType.VarChar, 40)
                    };

                    parameters[0].Value = model.Score;
                    parameters[1].Value = model.Review;
                    parameters[2].Value = model.Accuracy;
                    parameters[3].Value = model.ID;
                    i++;
                    SqlList.Add(strSql.ToString());
                    sqlParamList.Add(parameters);
                    if (model.Accuracy != null)
                    {
                        accary = accary + model.Accuracy.Value;
                    }

                    totalScore = totalScore + (model.Score == null ? 0 : model.Score.Value);
                    totalFullScore = (int)(totalFullScore + model.FullScore);
                    //插入答题记录
                    i++;
                    MySqlParameter[] paraHistory;
                    SqlList.Add(new WrongDal().SaveAnswerHistroy(model.SID, model.ItemID.ToString(), model.SubjectID.ToString(),
                             model.Answer, model.Accuracy.ToString(), model.AnswerTime, out paraHistory, i, model.IsTextAnswer));
                    sqlParamList.Add(paraHistory);
                }
                var str = new StudentInfoDal().SaveDiary(models[0].SID, 1, models[0].jobName, tname, totalFullScore,
                    totalScore.ToString(), models[0].JID);
                SqlList.Add(str);
                sqlParamList.Add(new MySqlParameter[] { });

                #endregion

                #region 计算该试卷的正确率,添加学生经验值


                var rate = (double)(accary / models.Count());
                if (rate >= 0.6 && rate < 0.7)
                {
                    SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 4));
                    sqlParamList.Add(new MySqlParameter[] { });

                }
                else if (rate >= 0.7 && rate < 0.8)
                {
                    SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 8));
                    sqlParamList.Add(new MySqlParameter[] { });
                }
                else if (rate >= 0.8 && rate < 0.9)
                {
                    SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 12));
                    sqlParamList.Add(new MySqlParameter[] { });
                }
                else if (rate >= 0.9 && rate < 1)
                {
                    SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 16));
                    sqlParamList.Add(new MySqlParameter[] { });
                }
                else if (rate == 1)
                {
                    SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 20));
                    sqlParamList.Add(new MySqlParameter[] { });
                }

                #endregion

                #region 更新批改状态

                //更新为已批改状态
                SqlList.Add(string.Format("update EI_JRelS set StuState=2 where SID=@SID{0} AND JID=@JID{0};", i));

                MySqlParameter[] para =
                {
                    new MySqlParameter(string.Format("@SID{0}", i), MySqlDbType.VarChar, 40),
                    new MySqlParameter(string.Format("@JID{0}", i), MySqlDbType.VarChar, 40)
                };
                para[0].Value = models[0].SID;
                para[1].Value = models[0].JID;
                sqlParamList.Add(para);
                //更新作业主表批改状态

                string strsql = @"UPDATE  EI_Job A SET A.State = (CASE WHEN (SELECT COUNT(1)  FROM  EI_JRelS  WHERE JID = A.ID  AND StuState = 1) > 0 THEN 1  ELSE 2 END) WHERE A.ID = @JID ";
                MySqlParameter[] para1 =
                {
                  new MySqlParameter("@JID", MySqlDbType.VarChar, 40)
                };
                para1[0].Value = models[0].JID;
                SqlList.Add(strsql);
                sqlParamList.Add(para1);


                #endregion

                #region 将错题存入错题本

                var wrongModels = models.Where(m => m.Accuracy < 1).ToList();

                if (wrongModels.Count > 0)
                {

                    foreach (var model in wrongModels)
                    {
                        i = i + 1;

                        //SqlList.Add(
                        //    string.Format(
                        //        "INSERT INTO EI_Wrong (`ID`,`SID`,`Source`,`Tag`,`ItemID`,`SubjectID`,`Answer`,`Accuracy`,`CreateTime`,`DelFlag`,`KnowledgeID`,`KnowledgeName`) VALUES ('{0}',@SID{1},'1','0',@ItemID{1},@SubjectID{1},@Answer{1},@Accuracy{1},SYSDATE(),0,@KnowledgeID{1},@KnowledgeName{1});",
                        //        Guid.NewGuid(), i));
                        //MySqlParameter[] param =
                        //{
                        //    new MySqlParameter(string.Format("@SID{0}", i), MySqlDbType.VarChar, 40),
                        //    new MySqlParameter(string.Format("@ItemID{0}", i), MySqlDbType.Int32),
                        //    new MySqlParameter(string.Format("@SubjectID{0}", i), MySqlDbType.Int32),
                        //    new MySqlParameter(string.Format("@Answer{0}", i), MySqlDbType.VarChar, 500),
                        //    new MySqlParameter(string.Format("@Accuracy{0}", i), MySqlDbType.Float),
                        //    new MySqlParameter(string.Format("@KnowledgeID{0}", i), MySqlDbType.VarChar, 40),
                        //    new MySqlParameter(string.Format("@KnowledgeName{0}", i), MySqlDbType.VarChar, 40),
                        //};
                        //param[0].Value = model.SID;
                        //param[1].Value = model.ItemID;
                        //param[2].Value = model.SubjectID;
                        //param[3].Value = model.Answer;
                        //param[4].Value = model.Accuracy;
                        //param[5].Value = model.KnowledgeID;
                        //param[6].Value = model.KnowledgeName;


                        //sqlParamList.Add(param);

                        MySqlParameter[] paraHistory;
                        //     SqlList.Add(new WrongDal().SaveWrong(model.SID, "1", model.ItemID.ToString(), model.SubjectID.ToString(), model.Answer, model.Accuracy.ToString(),
                        //model.KnowledgeID.ToString(), model.KnowledgeName, model.GradeID.ToString(), model.StageId, model.IsTextAnswer));
                        SqlList.Add(new WrongDal().SaveWrong(model.SID, "1", model.ItemID.ToString(), model.SubjectID.ToString(), model.Answer, model.Accuracy.ToString(),
                  model.KnowledgeID.ToString(), model.KnowledgeName, model.GradeID.ToString(), model.StageId, out paraHistory, i, model.IsTextAnswer));
                        sqlParamList.Add(paraHistory);
                    }
                }

                #endregion

                #region 教师日记

                if (models.Count > 0)
                {
                    SqlList.Add(new TeachDiaryDal().SaveDiary(string.Format("批改作业【{0}】", models[0].jobName), tId));
                    sqlParamList.Add(new MySqlParameter[] { });
                }

                #endregion
                return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
            }
            else
            {
                return true;
            }

        }



        /// <summary>
        /// 修改学生笔记
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateNote(EI_JAnswer model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_JAnswer set ");

            strSql.Append("NoteContent=@NoteContent");

            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
				
					new MySqlParameter("@NoteContent", MySqlDbType.VarChar,500),
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40)
				};
            parameters[0].Value = model.NoteContent;
            parameters[1].Value = model.ID;

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
            strSql.Append("delete from EI_JAnswer ");
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
        public bool DeleteList(string IDlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_JAnswer ");
            strSql.Append(" where ID in (" + IDlist + ")  ");
            int rows = MySQLHelper.ExecuteSql(strSql.ToString());
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
        public EI_JAnswer GetModel(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,SID,JID,ItemID,Answer,Score,AnswerTime,Review,NoteContent,Accuracy,CreateTime,DelFlag,Remark from EI_JAnswer ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            EI_JAnswer model = new EI_JAnswer();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public EI_JAnswer DataRowToModel(DataRow row)
        {
            EI_JAnswer model = new EI_JAnswer();
            if (row != null)
            {
                if (row["ID"] != null)
                {
                    model.ID = row["ID"].ToString();
                }
                if (row["SID"] != null)
                {
                    model.SID = row["SID"].ToString();
                }
                if (row["JID"] != null)
                {
                    model.JID = row["JID"].ToString();
                }
                if (row["ItemID"] != null && row["ItemID"].ToString() != "")
                {
                    model.ItemID = int.Parse(row["ItemID"].ToString());
                }
                if (row["Answer"] != null)
                {
                    model.Answer = row["Answer"].ToString();
                }
                if (row["Score"] != null && row["Score"].ToString() != "")
                {
                    model.Score = float.Parse(row["Score"].ToString());
                }
                if (row["AnswerTime"] != null && row["AnswerTime"].ToString() != "")
                {
                    model.AnswerTime = row["AnswerTime"].ToString();
                }
                if (row["Review"] != null)
                {
                    model.Review = row["Review"].ToString();
                }
                if (row["NoteContent"] != null)
                {
                    model.NoteContent = row["NoteContent"].ToString();
                }
                if (row["Accuracy"] != null && row["Accuracy"].ToString() != "")
                {
                    model.Accuracy = float.Parse(row["Accuracy"].ToString());
                }
                if (row["CreateTime"] != null && row["CreateTime"].ToString() != "")
                {
                    model.CreateTime = DateTime.Parse(row["CreateTime"].ToString());
                }
                if (row["DelFlag"] != null && row["DelFlag"].ToString() != "")
                {
                    model.DelFlag = int.Parse(row["DelFlag"].ToString());
                }
                if (row["Remark"] != null)
                {
                    model.Remark = row["Remark"].ToString();
                }
            }
            return model;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,SID,JID,ItemID,Answer,Score,AnswerTime,Review,NoteContent,Accuracy,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_JAnswer ");
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
            strSql.Append("select count(1) FROM EI_JAnswer ");
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
            strSql.Append(")AS Row, T.*  from EI_JAnswer T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }





        public bool Exists(string jID, string sID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_JAnswer");
            strSql.Append(" where JID=@JID AND SID=@SID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)	,
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40)	
                                          };
            parameters[0].Value = jID;
            parameters[1].Value = sID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        #region 批量添加
        /// <summary>
        /// 批量添加
        /// </summary>
        /// <param name="jID"></param>
        /// <param name="sID"></param>
        /// <param name="itemList">题目Id</param>
        /// <returns></returns>
        public bool BatchAdd(string jID, string sID, List<string> itemIDList)
        {
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>();

            strSql.AppendFormat("DELETE FROM EI_JAnswer WHERE SID=@SID AND JID=@JID AND FIND_IN_SET (ItemID ,'{0}' );", string.Join(",", itemIDList));

            if (itemIDList.Count > 0)
            {
                strSql.Append("insert into EI_JAnswer(");
                strSql.Append("ID,SID,JID,ItemID,Answer,Score,AnswerTime,Review,NoteContent,Accuracy,CreateTime,DelFlag,Remark)");
                strSql.Append(" values ");
            }
            int i = 0;
            foreach (var item in itemIDList)
            {
                strSql.AppendFormat("('{0}',@SID,@JID,@ItemID{1},null,0,0,null,null,0,SYSDATE(),0,null),", Guid.NewGuid(), i);

                parameters.Add(new MySqlParameter("@ItemID" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = item });
                i++;
            }
            parameters.Add(new MySqlParameter("@SID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = sID });
            parameters.Add(new MySqlParameter("@JID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = jID });

            return MySQLHelper.ExecuteSql(strSql.ToString().TrimEnd(','), parameters.ToArray()) > 0;
        }

        #endregion

        #region 提交答案
        /// <summary>
        /// 提交答案
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool SubmitAnswer(EI_JAnswer model)
        {
            List<String> sqlList = new List<string>();
            List<MySqlParameter[]> parameterList = new List<MySqlParameter[]>();
            string strDeleteSql = "  DELETE FROM EI_JAnswer WHERE SID=@SID AND JID=@JID AND ItemID=@ItemID ; ";//删除

            MySqlParameter[] paramDele =
            {
                	new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.SID},
                    new MySqlParameter("@JID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.JID},
                    new MySqlParameter("@ItemID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.ItemID}
            };
            sqlList.Add(strDeleteSql);
            parameterList.Add(paramDele);

            StringBuilder sqlAdd = new StringBuilder();//添加
            sqlAdd.Append(" insert into EI_JAnswer(ID,SID,JID,ItemID,Answer,Score,AnswerTime,Review,NoteContent,Accuracy,CreateTime,DelFlag,Remark,IsTextAnswer,AnswerText) ");
            sqlAdd.Append(" values ");
            sqlAdd.Append("( @ID,@SID,@JID,@ItemID,@Answer,@Score,@AnswerTime,@Review,@NoteContent,@Accuracy,@CreateTime,@DelFlag,@Remark,@IsTextAnswer,@AnswerText);");
            MySqlParameter[] paramAdd =
            {
                new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.ID},
                //new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.SID},
                //new MySqlParameter("@EID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.EID},

                //new MySqlParameter("@ItemID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.ItemID},
                new MySqlParameter("@Answer", MySqlDbType.VarChar,1000){ Direction=ParameterDirection.InputOutput, Value=(model.IsTextAnswer==0?model.Answer:null)},
                new MySqlParameter("@Score", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.Score},

                new MySqlParameter("@AnswerTime", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.AnswerTime},
                new MySqlParameter("@Review", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.Review},
                new MySqlParameter("@NoteContent", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.NoteContent},

                new MySqlParameter("@Accuracy", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.Accuracy},
                new MySqlParameter("@CreateTime", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.CreateTime},
                new MySqlParameter("@DelFlag", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.DelFlag},

                new MySqlParameter("@Remark", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=model.Remark},
                new MySqlParameter("@IsTextAnswer", MySqlDbType.Bit,1){ Direction=ParameterDirection.InputOutput, Value=model.IsTextAnswer},
                new MySqlParameter("@AnswerText", MySqlDbType.VarChar,2000){ Direction=ParameterDirection.InputOutput, Value=(model.IsTextAnswer==1?model.Answer:null)}
                
            };

            sqlList.Add(sqlAdd.ToString());
            parameterList.Add(paramAdd);

            return MySQLHelper.ExecuteSqlTran(sqlList, parameterList) > 0;
        }

        #endregion


        Func<int, int, string> getBgrade = (m, n) =>
        {
            if (m <= 5)
            {

                return "1";
            }
            else if (m == 6)
            {
                //0 五四，1 六三
                if (n == 0)
                {
                    return "2";
                }
                else
                {
                    return "1";
                }

            }
            else if (m <= 9 && m > 6)
            {
                return "2";
            }
            else if (m > 9)
            {
                return "3";
            }
            return "1";
        };

        public bool ChangeJobState(ViewModel.StudentJobModel jobModel, string tid, string tname)
        {
            if (jobModel.StuState == 2)
            {
                return true;
            }

            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            int i = 0;
            #region //更新为已批改状态
            StringBuilder strSql = new StringBuilder("update EI_JRelS set StuState=2 where SID=@SID AND JID=@JID;");
            MySqlParameter[] parameters = {
				
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@JID", MySqlDbType.VarChar,40)
				};
            parameters[0].Value = jobModel.Student.MfgID;
            parameters[1].Value = jobModel.JobID;
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(parameters);

            //更新作业主表批改状态
            string strsql = @"UPDATE  EI_Job A SET A.State = (CASE WHEN (SELECT COUNT(1)  FROM  EI_JRelS  WHERE JID = A.ID  AND StuState = 1) > 0 THEN 1  ELSE 2 END) WHERE A.ID = @JID1 ";
            MySqlParameter[] para1 =
                {
                  new MySqlParameter("@JID1", MySqlDbType.VarChar, 40)
                };
            para1[0].Value = jobModel.JobID;
            SqlList.Add(strsql);
            sqlParamList.Add(para1);
            #endregion

            #region 将错题存入错题本
            var models = jobModel.Items;

            //将错题存入错题本
            var wrongModels = models.Where(m => m.Accuracy < 1).ToList();


            if (wrongModels.Count > 0)
            {

                foreach (var model in wrongModels)
                {

                    //i = i + 1;

                    //SqlList.Add(string.Format("INSERT INTO EI_Wrong (`ID`,`SID`,`Source`,`Tag`,`ItemID`,`SubjectID`,`Answer`,`Accuracy`,`CreateTime`,`DelFlag`,`KnowledgeID`,`KnowledgeName`) VALUES ('{0}',@SID{1},'1','0',@ItemID{1},@SubjectID{1},@Answer{1},@Accuracy{1},SYSDATE(),0,@KnowledgeID{1},@KnowledgeName{1});", Guid.NewGuid(), i));
                    //MySqlParameter[] param = { 
                    //                  new MySqlParameter(string.Format("@SID{0}",i),MySqlDbType.VarChar,40),
                    //                  new MySqlParameter(string.Format("@ItemID{0}",i),MySqlDbType.Int32),
                    //                  new MySqlParameter(string.Format("@SubjectID{0}",i),MySqlDbType.Int32),
                    //                  new MySqlParameter(string.Format("@Answer{0}",i),MySqlDbType.VarChar,500),
                    //                  new MySqlParameter(string.Format("@Accuracy{0}",i),MySqlDbType.Float),
                    //                  new MySqlParameter(string.Format("@KnowledgeID{0}",i),MySqlDbType.VarChar,40),
                    //                  new MySqlParameter(string.Format("@KnowledgeName{0}",i),MySqlDbType.VarChar,40),
                    //                 };
                    //param[0].Value = model.SID;
                    //param[1].Value = model.ItemID;
                    //param[2].Value = model.SubjectID;
                    //param[3].Value = model.Answer;
                    //param[4].Value = model.Accuracy;
                    //param[5].Value = model.KnowledgeID;
                    //param[6].Value = model.KnowledgeName;
                    //new WrongDal().SaveWrong(model.SID, "1", model.ItemID.ToString(), model.SubjectID.ToString(), model.Answer, model.Accuracy.ToString(),
                    //    model.KnowledgeID.ToString(), model.KnowledgeName, jobModel.GradeID.ToString(), getBgrade(jobModel.GradeID));

                    //sqlParamList.Add(param);
                    SqlList.Add(new WrongDal().SaveWrong(model.SID, "1", model.ItemID.ToString(), model.SubjectID.ToString(), model.Answer, model.Accuracy.ToString(),
                         model.KnowledgeID.ToString(), model.KnowledgeName, jobModel.GradeID.ToString(), jobModel.StageId));

                    sqlParamList.Add(new MySqlParameter[] { });
                    //sqlParamList.Add(new MySqlParameter[] { });
                }


            }
            #endregion
            #region  保存答题记录
            if (models.Count > 0)
            {
                foreach (var model in models)
                {
                    //保存答题记录
                    i++;
                    SqlList.Add(new WrongDal().SaveAnswerHistroy(model.SID, model.ItemID.ToString(),
                        model.SubjectID.ToString(), model.Answer, model.Accuracy.ToString(), model.AnswerTime, model.IsTextAnswer));
                    sqlParamList.Add(new MySqlParameter[] { });
                }
            }
            #endregion


            #region 计算该试卷的正确率,添加学生经验值
            var accuary = 0f;
            var totalScore = 0f;
            var totalFullScore = 0;
            foreach (var item in models)
            {
                totalScore = totalScore + item.Score;
                totalFullScore = (int)(totalFullScore + item.FullScore);
                accuary = accuary + item.Accuracy;
            }
            var rate = (double)(accuary / models.Count());

            if (rate >= 0.6 && rate < 0.7)
            {
                SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 4));
                sqlParamList.Add(new MySqlParameter[] { });

            }
            else if (rate >= 0.7 && rate < 0.8)
            {
                SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 8));
                sqlParamList.Add(new MySqlParameter[] { });
            }
            else if (rate >= 0.8 && rate < 0.9)
            {
                SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 12));
                sqlParamList.Add(new MySqlParameter[] { });
            }
            else if (rate >= 0.9 && rate < 1)
            {
                SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 16));
                sqlParamList.Add(new MySqlParameter[] { });
            }
            else
            {
                SqlList.Add(new StudentInfoDal().UpdateExperNumber(models[0].SID, 20));
                sqlParamList.Add(new MySqlParameter[] { });
            }

            #endregion

            #region 保存学生日记
            var strStudentDiary = new StudentInfoDal().SaveDiary(models[0].SID, 1, jobModel.JobName, tname, totalFullScore, totalScore.ToString(), jobModel.JobID);
            sqlParamList.Add(new MySqlParameter[] { });
            SqlList.Add(strStudentDiary);
            #endregion

            #region 保存教师日记
            if (models.Count > 0)
            {
                SqlList.Add(new TeachDiaryDal().SaveDiary(string.Format("批改作业【{0}】", jobModel.JobName), tid));
                sqlParamList.Add(new MySqlParameter[] { });
            }
            #endregion
            return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;

        }
        /// <summary>
        /// 插入错题本
        /// </summary>
        /// <param name="jobModel"></param>
        /// <returns></returns>
        public bool AddWrongBook(ViewModel.StudentJobModel jobModel)
        {
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            int i = 0;


            var models = jobModel.Items;

            //将错题存入错题本
            var wrongModels = models.Where(m => m.Accuracy < 1 && m.ItemType == ViewModel.ItemState.Choice).ToList();

            if (wrongModels.Count > 0)
            {

                foreach (var model in wrongModels)
                {
                    i = i + 1;

                    SqlList.Add(string.Format("INSERT INTO EI_Wrong (`ID`,`SID`,`Source`,`Tag`,`ItemID`,`SubjectID`,`Answer`,`Accuracy`,`CreateTime`,`DelFlag`,`KnowledgeID`,`KnowledgeName`) VALUES ('{0}',@SID{1},'1','0',@ItemID{1},@SubjectID{1},@Answer{1},@Accuracy{1},SYSDATE(),0,@KnowledgeID{1},@KnowledgeName{1});", Guid.NewGuid(), i));
                    MySqlParameter[] param = { 
                                      new MySqlParameter(string.Format("@SID{0}",i),MySqlDbType.VarChar,40),
                                      new MySqlParameter(string.Format("@ItemID{0}",i),MySqlDbType.Int32),
                                      new MySqlParameter(string.Format("@SubjectID{0}",i),MySqlDbType.Int32),
                                      new MySqlParameter(string.Format("@Answer{0}",i),MySqlDbType.VarChar,500),
                                      new MySqlParameter(string.Format("@Accuracy{0}",i),MySqlDbType.Float),
                                      new MySqlParameter(string.Format("@KnowledgeID{0}",i),MySqlDbType.VarChar,40),
                                      new MySqlParameter(string.Format("@KnowledgeName{0}",i),MySqlDbType.VarChar,40),
                                     };
                    param[0].Value = model.SID;
                    param[1].Value = model.ItemID;
                    param[2].Value = model.SubjectID;
                    param[3].Value = model.Answer;
                    param[4].Value = model.Accuracy;
                    param[5].Value = model.KnowledgeID;
                    param[6].Value = model.KnowledgeName;

                    sqlParamList.Add(param);
                }
            }

            return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
        }
    }
}