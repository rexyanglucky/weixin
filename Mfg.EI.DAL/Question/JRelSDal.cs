/*
 * author:谢利民;
 * function:教师学生关联表【EI_JRelS】操作的功能
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
    /// JRelSDal:教师学生关联表【EI_JRelS】的操作功能
    /// </summary>
    public class JRelSDal
    {


        #region 私有变量

        private JobDal _jobDal = new JobDal();


        #endregion

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_JRelS");
            strSql.Append(" where JID=@JID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobId;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_JRelS model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_JRelS(");
            strSql.Append("JID,SID,StuState)");
            strSql.Append(" values (");
            strSql.Append("@JID,@SID,@StuState)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@StuState", MySqlDbType.Int32,1)};
            parameters[0].Value = model.JID;
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
        public bool Update(EI_JRelS model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_JRelS set ");
            strSql.Append("SID=@SID,");
            strSql.Append("StuState=@StuState");
            strSql.Append(" where JID=@JID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@StuState", MySqlDbType.Int32,1)};
            parameters[0].Value = model.JID;
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
        public bool Delete(string jobId)
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_JRelS ");
            strSql.Append(" where  JID=@JID");
            MySqlParameter[] parameters = {
                                              	new MySqlParameter("@JID", MySqlDbType.VarChar,40)
			};
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
        /// 根据作业ID获取布置对象集合
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public List<EI_JRelS> GetJrelSList(string jobId)
        {
            List<EI_JRelI> listRelI = new List<EI_JRelI>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select JID,SID,StuState from EI_JRelS");
            strSql.Append(" where JID=@JID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobId;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_JRelS>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }

        }


        #region 更新作业状态
        /// <summary>
        /// 更新作业状态
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateStuState(EI_JRelS model, Dictionary<string, double> dic, List<EI_JRelI> ei_JRelIList)
        {

            StringBuilder sbSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            int i = 0;

            if (dic != null)
            {
                foreach (var item in dic)
                {
                    var firstOrDefault = ei_JRelIList.Where(m => m.ItemID.ToString() == item.Key).FirstOrDefault();
                    if (item.Value > 0)//更新Score
                    {
                        //Accuracy正确率 0错误 1正确
                        sbSql.AppendFormat(" UPDATE EI_JAnswer SET Score=@Score{0},Accuracy={1} WHERE SID=@SID AND JID=@JID AND ItemID=@ItemID{0} ;", i, item.Value);


                        float score = firstOrDefault == null ? 0 : (float)firstOrDefault.Score ;

                        parameters.Add(new MySqlParameter("@Score" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = Math.Round(score * item.Value, MidpointRounding.AwayFromZero) });
                        parameters.Add(new MySqlParameter("@ItemID" + i, MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = item.Key });

                    }
                    else//插入错题本
                    {



                        //Source 同步练习0，作业1，考试2，弱项3   Tag 标签，已掌握：1，未掌握：0

                        //在批改作业时插入错题本
                        //sbSql.Append(" INSERT INTO EI_Wrong (ID,SID,Source,Tag,ItemID,SubjectID,Answer,Accuracy,CreateTime,DelFlag)  ");
                        //sbSql.Append(" VALUES ");
                        //sbSql.AppendFormat("(@ID{0},@SID,1,0,@ItemID{0},@SubjectID{0},@Answer{0},0,SYSDATE(),0);", i);

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


            sbSql.Append("update EI_JRelS set ");
            sbSql.Append("StuState=@StuState , SumeTime=@SumeTime ");
            sbSql.Append(" where JID=@JID AND SID=@SID ;");

            sbSql.AppendFormat(" UPDATE EI_Job SET State=1 WHERE ID=@JID ;");

            parameters.Add(new MySqlParameter("@JID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.JID });
            parameters.Add(new MySqlParameter("@SID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = model.SID });
            parameters.Add(new MySqlParameter("@StuState", MySqlDbType.Int32, 1) { Direction = ParameterDirection.InputOutput, Value = model.StuState });
            parameters.Add(new MySqlParameter("@SumeTime", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.SumeTime });



            //return MySQLHelper.ExecuteSqlTran(  sbSql.ToString(), parameters) > 0;
            int rows = MySQLHelper.ExecuteSql(sbSql.ToString(), parameters.ToArray());
            return rows > 0;
        }
        #endregion

        #region 获取未提交未批改的作业数量
        /// <summary>
        /// 获取未提交未批改的作业数量
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public int GetEI_JRelSCount(UserTypeEnum roleType, int userID, string bGrade)
        {
            //学生作业状态,0未提交，1已提交和2已批改
            if (roleType == UserTypeEnum.StudentDiamonds || roleType == UserTypeEnum.StudentPlatinum || roleType == UserTypeEnum.StudentStandard || roleType == UserTypeEnum.Student)//学生 待批改
            {
                return _jobDal.GetJobList2StudentByDic(userID.ToString(), bGrade);
            }
            else//老师 待提交
            {

                return _jobDal.GetJobListByDic(userID.ToString());
            }
        }

        #endregion
    }


}
