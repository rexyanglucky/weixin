/*
 * author:谢利民;
 * function:公告表【EI_Announcement】操作的功能
 * adddate:2015-04-19
 * updatedate:2015-04-19
 */
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
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
    ///  ERelSDal:考卷与学生连接表【EI_ERelS】操作的功能
    /// </summary>
    public class ERelSDal
    {

        #region 私有变量
        private ExamDal _examDal = new ExamDal();

        #endregion

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string examId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_ERelS");
            strSql.Append(" where EID=@EID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = examId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_ERelS model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_ERelS(");
            strSql.Append("EID,SID,StuState)");
            strSql.Append(" values (");
            strSql.Append("@EID,@SID,@StuState)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@StuState", MySqlDbType.Int32,1)};
            parameters[0].Value = model.EID;
            parameters[1].Value = model.SID;
            parameters[2].Value = model.StuState;

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
        public bool Update(EI_ERelS model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ERelS set ");
            strSql.Append("EID=@EID,");
            strSql.Append("SID=@SID,");
            strSql.Append("StuState=@StuState");
            strSql.Append(" where ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@StuState", MySqlDbType.Int32,1)};
            parameters[0].Value = model.EID;
            parameters[1].Value = model.SID;
            parameters[2].Value = model.StuState;

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
        public bool Delete(string examId)
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_ERelS ");
            strSql.Append(" where  EID=@EID");
            MySqlParameter[] parameters = {
                                              	new MySqlParameter("@EID", MySqlDbType.VarChar,40)
			};
            parameters[0].Value = examId;
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
        public EI_ERelS GetModel()
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select EID,SID,StuState from EI_ERelS ");
            strSql.Append(" where ");
            MySqlParameter[] parameters = {
			};

            EI_ERelS model = new EI_ERelS();
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
        public EI_ERelS DataRowToModel(DataRow row)
        {
            EI_ERelS model = new EI_ERelS();
            if (row != null)
            {
                if (row["EID"] != null)
                {
                    model.EID = row["EID"].ToString();
                }
                if (row["SID"] != null)
                {
                    model.SID = row["SID"].ToString();
                }
                if (row["StuState"] != null && row["StuState"].ToString() != "")
                {
                    model.StuState = int.Parse(row["StuState"].ToString());
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
            strSql.Append("select EID,SID,StuState ");
            strSql.Append(" FROM EI_ERelS ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return MySQLHelper.Query(strSql.ToString());
        }

        /// <summary>
        /// 根据作业ID获取布置对象集合
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public List<EI_ERelS> GetErelSList(string examId)
        {
            List<EI_JRelI> listRelI = new List<EI_JRelI>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select EID,SID,StuState from EI_ERelS");
            strSql.Append(" where EID=@EID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = examId;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_ERelS>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }

        }



        #region  该试卷是否已经提交
        /// <summary>
        /// 该试卷是否已经提交
        /// </summary>
        /// <param name="eID"></param>
        /// <param name="sID"></param>
        /// <returns></returns>
        public bool Exists(string eID, string sID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_ERelS");
            strSql.Append(" where EID=@EID AND SID=@SID AND StuState=2");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EID", MySqlDbType.VarChar,40)	,
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40)	
                                          };
            parameters[0].Value = eID;
            parameters[0].Value = sID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        #endregion


        #region 更新考试状态
        /// <summary>
        /// 更新考试状态
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateStuState(EI_ERelS model, Dictionary<string, double> dic, List<EI_ERelI> ei_ERelIList)
        {

            StringBuilder sbSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            int i = 0;

            if (dic != null)
            {
                foreach (var item in dic)
                {
                    var firstOrDefault = ei_ERelIList.Where(m => m.ItemID.ToString() == item.Key).FirstOrDefault();
                    if (item.Value>0)//更新Score
                    {
                        //Accuracy正确率 0错误 1正确
                        sbSql.AppendFormat(" UPDATE EI_EAnswer SET Score=@Score{0},Accuracy={1} WHERE SID=@SID AND EID=@EID AND ItemID=@ItemID{0} ;", i, item.Value);


                        float score = firstOrDefault == null ? 0 : (float)firstOrDefault.Score;

                        parameters.Add(new MySqlParameter("@Score" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = Math.Round(score * item.Value, MidpointRounding.AwayFromZero) });
                        parameters.Add(new MySqlParameter("@ItemID" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = Convert.ToInt32(item.Key) });

                    }
                    else//插入错题本
                    {

                        //Source 同步练习0，作业1，考试2，弱项3   Tag 标签，已掌握：1，未掌握：0
                        //在批改作业时插入错题本
                        //sbSql.Append(" INSERT INTO EI_Wrong (ID,SID,Source,Tag,ItemID,SubjectID,Answer,Accuracy,CreateTime,DelFlag)  ");
                        //sbSql.Append(" VALUES ");
                        //sbSql.AppendFormat("('ID{0}',@SID,2,0,@ItemID{0},@SubjectID{0},@Answer{0},0,SYSDATE(),0);", i);

                        //int subjectID = firstOrDefault == null ? 0 : firstOrDefault.SubjectID;
                        //string answer = firstOrDefault == null ? "" : firstOrDefault.Answer;

                        //parameters.Add(new MySqlParameter("@ID" + i, MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = Guid.NewGuid() });
                        //parameters.Add(new MySqlParameter("@ItemID" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = item.Key });
                        //parameters.Add(new MySqlParameter("@SubjectID" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = subjectID });
                        //parameters.Add(new MySqlParameter("@Answer" + i, MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = answer });
                    }
                    i++;
                }
            }

            sbSql.Append("update EI_ERelS set ");
            sbSql.Append("StuState=@StuState , SumeTime=@SumeTime ");
            sbSql.Append(" where EID=@EID AND SID=@SID ; ");

            sbSql.AppendFormat(" UPDATE EI_Exam SET State=1 WHERE ID=@EID ; ");

            parameters.Add(new MySqlParameter("@EID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.EID });
            parameters.Add(new MySqlParameter("@SID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.SID });
            parameters.Add(new MySqlParameter("@StuState", MySqlDbType.Int32, 1) { Direction = ParameterDirection.InputOutput, Value = model.StuState });
            parameters.Add(new MySqlParameter("@SumeTime", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.SumeTime });


            //return MySQLHelper.ExecuteSqlTran(  sbSql.ToString(), parameters) > 0;
            int rows = MySQLHelper.ExecuteSql(sbSql.ToString(), parameters.ToArray());
            return rows > 0;
        }

        /// <summary>
        /// 更新考试状态(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateTeaStuState(EI_ERelS model, Dictionary<string, double> dic, List<EI_ERelI> ei_ERelIList)
        {

            StringBuilder sbSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            int i = 0;

            if (dic != null)
            {
                foreach (var item in dic)
                {
                    var firstOrDefault = ei_ERelIList.Where(m => m.ItemID.ToString() == item.Key).FirstOrDefault();
                    if (item.Value>0)//更新Score
                    {
                        //Accuracy正确率 0错误 1正确
                        sbSql.AppendFormat(" UPDATE ei_tea_eanswer SET Score=@Score{0},Accuracy={1} WHERE TID=@TID AND EID=@EID AND ItemID=@ItemID{0} ;", i, item.Value);


                        float score = firstOrDefault == null ? 0 : (float)firstOrDefault.Score;

                        parameters.Add(new MySqlParameter("@Score" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = Math.Round(score * item.Value, MidpointRounding.AwayFromZero) });
                        parameters.Add(new MySqlParameter("@ItemID" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = Convert.ToInt32(item.Key) });

                    }
                    else//插入错题本
                    {

                       
                    }
                    i++;
                }
            }

            sbSql.Append("update ei_tea_erelt set ");
            sbSql.Append("StuState=@StuState , SumeTime=@SumeTime ");
            sbSql.Append(" where EID=@EID AND TID=@TID ; ");

            sbSql.AppendFormat(" UPDATE ei_tea_exam SET State=1 WHERE ID=@EID ; ");

            parameters.Add(new MySqlParameter("@EID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.EID });
            parameters.Add(new MySqlParameter("@TID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.TID });
            parameters.Add(new MySqlParameter("@StuState", MySqlDbType.Int32, 1) { Direction = ParameterDirection.InputOutput, Value = model.StuState });
            parameters.Add(new MySqlParameter("@SumeTime", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.SumeTime });


            //return MySQLHelper.ExecuteSqlTran(  sbSql.ToString(), parameters) > 0;
            int rows = MySQLHelper.ExecuteSql(sbSql.ToString(), parameters.ToArray());
            return rows > 0;
        }
        #endregion

        #region 获取未提交未批改的考试数量
        /// <summary>
        /// 获取未提交未批改的考试数量
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public int GetEI_ERelSCount(UserTypeEnum roleType, int userID, string bGrade)
        {

            //学生作业状态,0未提交，1已提交和2已批改
            if (roleType == UserTypeEnum.StudentDiamonds || roleType == UserTypeEnum.StudentPlatinum || roleType == UserTypeEnum.StudentStandard || roleType == UserTypeEnum.Student)//学生 待批改
            {
                return _examDal.GetExamList2StudentByDic(userID.ToString(), bGrade);
            }
            else//老师 待提交
            {
                return _examDal.GetExamListByDic(userID.ToString());
            }
        }

        #endregion

    }
}
