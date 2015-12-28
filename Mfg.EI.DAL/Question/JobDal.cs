/*
 * author:谢利民;
 * function:公告表【EI_Announcement】操作的功能
 * adddate:2015-04-19
 * updatedate:2015-04-19
 */
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration.Configuration;
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
    /// JobDal:电子作业表操作的功能
    /// </summary>
    public class JobDal
    {

        #region 私有变量
        private CommonDal _commonDal = new CommonDal();//公用的Dal 

        #endregion

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_Job");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_Job model)
        {
            #region 添加job到redis
            var keyValues = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("ID",        model.ID),
                new KeyValuePair<string, string>("Name",      model.Name),
                new KeyValuePair<string, string>("GradeID",   model.GradeID.ToString()),
                new KeyValuePair<string, string>("SubjectID", model.SubjectID.ToString()),
                new KeyValuePair<string, string>("EndTime",   model.EndTime.ToString()),
                new KeyValuePair<string, string>("State",     model.State.ToString()),
                new KeyValuePair<string, string>("TID",       model.TID),
                new KeyValuePair<string, string>("CreateTime",model.CreateTime.ToString()),
                new KeyValuePair<string, string>("DelFlag",   model.DelFlag.ToString()),
                new KeyValuePair<string, string>("Remark",    string.IsNullOrEmpty(model.Remark)?"":model.Remark),
                new KeyValuePair<string, string>("StageID",   model.StageID.ToString())
                                          };

            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, model.ID, keyValues);
            #endregion

            #region Redis之前代码

            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("insert into EI_Job(");
            //strSql.Append("ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,StageID)");
            //strSql.Append(" values (");
            //strSql.Append("@ID,@Name,@GradeID,@SubjectID,@EndTime,@State,@TID,@CreateTime,@DelFlag,@Remark,@StageID)");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@ID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@Name", MySqlDbType.VarChar,50),
            //        new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
            //        new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
            //        new MySqlParameter("@EndTime", MySqlDbType.DateTime),
            //        new MySqlParameter("@State", MySqlDbType.Int32,1),
            //        new MySqlParameter("@TID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
            //        new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
            //        new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
            //        new MySqlParameter("@StageID", MySqlDbType.Int32,11)
            //                              };
            //parameters[0].Value = model.ID;
            //parameters[1].Value = model.Name;
            //parameters[2].Value = model.GradeID;
            //parameters[3].Value = model.SubjectID;
            //parameters[4].Value = model.EndTime;
            //parameters[5].Value = model.State;
            //parameters[6].Value = model.TID;
            //parameters[7].Value = model.CreateTime;
            //parameters[8].Value = model.DelFlag;
            //parameters[9].Value = model.Remark;
            //parameters[10].Value = model.StageID;

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
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_Job model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Job set ");
            strSql.Append("Name=@Name,");
            strSql.Append("GradeID=@GradeID,");
            strSql.Append("SubjectID=@SubjectID,");
            strSql.Append("EndTime=@EndTime,");
            strSql.Append("State=@State,");
            strSql.Append("TID=@TID,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
					new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
					new MySqlParameter("@EndTime", MySqlDbType.DateTime),
					new MySqlParameter("@State", MySqlDbType.Int32,1),
					new MySqlParameter("@TID", MySqlDbType.VarChar,40),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.Name;
            parameters[1].Value = model.GradeID;
            parameters[2].Value = model.SubjectID;
            parameters[3].Value = model.EndTime;
            parameters[4].Value = model.State;
            parameters[5].Value = model.TID;
            parameters[6].Value = model.CreateTime;
            parameters[7].Value = model.DelFlag;
            parameters[8].Value = model.Remark;
            parameters[9].Value = model.ID;

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
            strSql.Append("delete from EI_Job ");
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
            strSql.Append("delete from EI_Job ");
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




        #region 获取作业列表(老师分页)
        /// <summary>
        /// 获取作业列表(老师分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetJobListByDic(Dictionary<string, object> dic)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }



            #region 作废
            //string strSqlCount = "";
            //StringBuilder strSqlList = new StringBuilder();
            //StringBuilder strSqlWhere = new StringBuilder();
            //string strSqlLimit = "";


            //strSqlCount = " SELECT Count(1) Count from EI_Job ";

            //strSqlList.Append(" SELECT ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,StageID,Remark , ");
            //#region 科目
            //strSqlList.Append(" CASE WHEN SubjectID=1 THEN '语文' ");
            //strSqlList.Append(" WHEN SubjectID=2 THEN '数学' ");
            //strSqlList.Append(" WHEN SubjectID=3 THEN '英语' ");
            //strSqlList.Append(" WHEN SubjectID=4 THEN '物理' ");
            //strSqlList.Append(" WHEN SubjectID=5 THEN '化学' ");
            //strSqlList.Append(" WHEN SubjectID=6 THEN '地理' ");
            //strSqlList.Append(" WHEN SubjectID=7 THEN '历史' ");
            //strSqlList.Append(" WHEN SubjectID=8 THEN '政治' ");
            //strSqlList.Append(" WHEN SubjectID=9 THEN '生物' ");
            //strSqlList.Append(" ELSE '' END SubjectName, ");
            //#endregion
            //strSqlList.Append(" (SELECT COUNT(1) FROM EI_JRelS WHERE JID=EI_Job.ID) StuCount, ");//布置人数
            //strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM EI_JRelS WHERE JID=EI_Job.ID AND StuState=1 )>0 ");
            //strSqlList.Append(" THEN 0 ELSE 1 END IsCorrecting ,");//有无批改  (0:有批改  1无批改)
            //strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM EI_JRelS WHERE JID=EI_Job.ID AND StuState=2 )>0 ");
            //strSqlList.Append(" THEN 0 ELSE 1 END IsAnalysis ");//有无分析  (0:有分析  1无分析)


            //strSqlList.Append(" from EI_Job ");

            //#region 优化

            //strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0 ");
            //if (dictionary.ContainsKey("State"))
            //{
            //    if (Convert.ToInt32(dictionary["State"]) == 0)//0未批改，1已批改
            //    {

            //        strSqlWhere.Append(" AND State=1 ");
            //    }
            //    else
            //    {
            //        strSqlWhere.Append(" AND State=2 ");
            //    }
            //}

            //#endregion


            //if (dictionary.ContainsKey("GradeID"))//
            //{
            //    strSqlWhere.Append(" AND GradeID=@GradeID ");
            //}

            //if (dictionary.ContainsKey("SubjectID"))
            //{
            //    strSqlWhere.Append(" AND SubjectID=@SubjectID ");
            //}
            //if (dictionary.ContainsKey("TID"))
            //{
            //    strSqlWhere.Append(" AND TID=@TID ");
            //}

            //if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            //{
            //    strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            //}

            //string strOrder = " ORDER BY EndTime DESC , CreateTime DESC ";

            //StringBuilder sb = new StringBuilder();

            ////总数
            //sb.Append(strSqlCount);
            //sb.Append(strSqlWhere);
            //sb.Append(";");

            ////分页
            //sb.Append(strSqlList);
            //sb.Append(strSqlWhere);
            //sb.Append(strOrder);
            //sb.Append(strSqlLimit);
            //sb.Append(";"); 
            #endregion


            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";


            strSqlCount = " SELECT Count(1) Count from EI_Job ";

            strSqlList.Append(" SELECT  ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,StageID,Remark,SubjectName,");
            strSqlList.Append(" sum(StuState0),sum(StuState1),sum(StuState2),cast(sum(StuState1)+sum(StuState2) as signed)CompleteCount,cast(sum(StuState0+StuState1+StuState2) as signed)StuCount,  ");// StuState0 未提交  StuState1 已提交   StuState2 已批改  CompleteCount 已完成  StuCount 布置人数
            strSqlList.Append(" CASE WHEN sum(StuState1)>0 ");
            strSqlList.Append(" THEN 0 ELSE 1 END IsCorrecting ,");//有无批改  (0:有批改  1无批改)
            strSqlList.Append(" CASE WHEN sum(StuState2)>0 ");
            strSqlList.Append(" THEN 0 ELSE 1 END IsAnalysis ");//有无分析  (0:有分析  1无分析)

            strSqlList.Append(" from (  ");
            strSqlList.Append(" SELECT  ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,StageID,Remark,SubjectName,");
            strSqlList.Append(" CASE x.StuState WHEN 0 THEN x.Count ELSE 0 END  StuState0,");
            strSqlList.Append(" CASE x.StuState WHEN 1 THEN x.Count ELSE 0 END  StuState1,");
            strSqlList.Append(" CASE x.StuState WHEN 2 THEN x.Count ELSE 0 END  StuState2 ");
            strSqlList.Append(" from (  ");
            strSqlList.Append(" SELECT a.ID,a.Name,a.GradeID,a.SubjectID,a.EndTime,a.State,a.TID,a.CreateTime,a.DelFlag,a.StageID,a.Remark , ");
            #region 科目
            strSqlList.Append(" CASE WHEN SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName, ");
            #endregion

            strSqlList.Append(" b.StuState, count(1) Count ");
            strSqlList.Append(" from EI_Job a ");
            strSqlList.Append(" left join EI_JRelS b on  b.JID=a.ID ");




            //添加过滤条件

            strSqlList.Append(" WHERE 1=1 AND DelFlag=0  ");
            strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0  ");
            if (dictionary.ContainsKey("State"))
            {
                if (Convert.ToInt32(dictionary["State"]) == 0)//0未批改，1已批改
                {
                    strSqlList.Append(" AND a.State=1 ");

                    strSqlWhere.Append(" AND State=1 ");
                }
                else
                {
                    strSqlList.Append(" AND a.State=2 ");
                    strSqlWhere.Append(" AND State=2 ");
                }
            }
            if (dictionary.ContainsKey("GradeID"))//
            {
                strSqlList.Append(" AND GradeID=@GradeID ");
                strSqlWhere.Append(" AND GradeID=@GradeID ");
            }

            if (dictionary.ContainsKey("SubjectID"))
            {
                strSqlList.Append(" AND SubjectID=@SubjectID ");
                strSqlWhere.Append(" AND SubjectID=@SubjectID ");
            }
            if (dictionary.ContainsKey("TID"))
            {
                strSqlList.Append(" AND TID=@TID ");
                strSqlWhere.Append(" AND TID=@TID ");
            }


            strSqlList.Append(" GROUP BY a.ID,b.StuState  ) x");
            strSqlList.Append(" )y GROUP BY ID");


            if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            {
                strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            }

            string strOrder = " ORDER BY EndTime DESC , CreateTime DESC ";

            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            //sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);

        }




        public int GetJobListByDic(string tID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT Count(1) Count from EI_Job a  ");//总条数
            #region 查询条件

            //strSql.Append(" INNER JOIN EI_JRelS c on a.ID=c.JID ");
            //strSql.Append(" WHERE 1=1  ");
            //strSql.Append(" AND DelFlag=0 and c.StuState=1 AND a.TID=@TID ");

            strSql.Append(" WHERE 1=1 AND DelFlag=0 AND (SELECT COUNT(1) FROM EI_JRelS WHERE JID=a.ID)>0 ");

            //strSql.Append(" AND (SELECT COUNT(1) FROM EI_JRelS WHERE JID=a.ID AND StuState=1 )>0 ");// StuState学生作业状态,0未提交，1已提交和2已批改

            strSql.Append(" AND State=1 ");


            strSql.Append(" AND a.TID=@TID ");
            #endregion
            MySqlParameter[] parameters = {
					new MySqlParameter("@TID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = tID;
            return Convert.ToInt32(MySQLHelper.GetSingle(strSql.ToString(), parameters));
        }


        #endregion

        #region 获取作业列表(微信分页)
        /// <summary>
        /// 获取作业列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetJobList2WeixinByDic(Dictionary<string, object> dic)
        {

            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }

            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";

            strSqlCount = " SELECT Count(1) Count from EI_Job a INNER JOIN EI_JRelS b ON a.ID = b.JID  ";//总条数

            strSqlList.Append(" SELECT a.ID,a.Name,a.GradeID,a.SubjectID,b.SID,b.StuState , ");
            strSqlList.Append(" (SELECT SUM(Score) FROM EI_JAnswer WHERE SID=b.SID AND JID=a.ID) SumScore, ");//作业得分

            #region 科目
            strSqlList.Append(" CASE WHEN a.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN a.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN a.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN a.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN a.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN a.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN a.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN a.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN a.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName ");
            #endregion

            strSqlList.Append(" FROM EI_Job a ");
            strSqlList.Append(" INNER JOIN EI_JRelS b ON a.ID = b.JID ");

            #region 查询条件
            strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0 ");
            if (dictionary.ContainsKey("SID"))//学生ID
            {
                strSqlWhere.Append(" AND b.SID=@SID ");
            }
            if (dictionary.ContainsKey("SubjectID"))//科目ID
            {
                strSqlWhere.Append(" AND a.SubjectID=@SubjectID ");
            }
            if (dictionary.ContainsKey("StuState"))//学生作业状态,0未提交，1已提交和2已批改
            {
                //strSqlWhere.Append(" AND b.StuState=@StuState ");

                if (Convert.ToInt32(dictionary["StuState"]) == 0)
                {
                    strSqlWhere.Append(" AND b.StuState=0 ");

                }
                else if (Convert.ToInt32(dictionary["StuState"]) == 1)
                {
                    strSqlWhere.Append(" AND ( b.StuState=1 or b.StuState=2)");
                }

            }
            #endregion

            if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            {
                strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            }
            //dictionary.Add("Skip", dic["Skip"]);
            //dictionary.Add("Take", dic["Take"]);
            string strOrder = " ORDER BY a.EndTime DESC ,a.CreateTime DESC ";

            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);
        }

        #endregion

        #region 获取作业列表(学生分页)
        /// <summary>
        /// 获取作业列表(学生分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetJobList2StudentByDic(Dictionary<string, object> dic)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }

            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";

            strSqlCount = " SELECT Count(1) Count from EI_Job a INNER JOIN EI_JRelS b ON a.ID = b.JID  ";//总条数

            strSqlList.Append(" SELECT a.ID,a.Name,a.GradeID,a.SubjectID,b.SID,b.StuState ,a.State,c.Name Tname, a.EndTime,a.CreateTime,");
            #region 科目
            strSqlList.Append(" CASE WHEN a.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN a.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN a.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN a.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN a.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN a.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN a.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN a.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN a.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName, ");
            #endregion
            strSqlList.Append(" (SELECT SUM(Score) FROM EI_JAnswer WHERE SID=b.SID AND JID=a.ID) SumScore ");//作业得分
            strSqlList.Append(" FROM EI_Job a ");
            strSqlList.Append(" INNER JOIN EI_JRelS b ON a.ID = b.JID ");
            strSqlList.Append(" INNER JOIN EI_ManagerInfo c ON c.AccountNumber=a.TID ");

            #region 查询条件
            strSqlWhere.Append(" WHERE a.DelFlag=0 ");
            if (dictionary.ContainsKey("SID"))//学生ID
            {
                strSqlWhere.Append(" AND b.SID=@SID ");
            }

            if (dictionary.ContainsKey("StageID"))//学生大年级
            {
                strSqlWhere.Append(" AND a.StageID=@StageID ");
            }

            if (dictionary.ContainsKey("StuState"))//学生作业状态,0未提交，1已提交和2已批改
            {
                if (dictionary["StuState"].ToString() == "0")
                {
                    strSqlWhere.Append(" AND b.StuState=0 ");
                    strSqlWhere.Append(" AND a.EndTime>SYSDATE() ");
                }
                else if (dictionary["StuState"].ToString() == "1")
                {
                    strSqlWhere.Append(" AND b.StuState=1 ");
                }
                else//过了截至时间 全部都认为是已批改
                {
                    strSqlWhere.Append(" AND ( (a.EndTime<SYSDATE() AND b.StuState=0 ) or b.StuState=2 )");
                }
            }

            #endregion

            if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            {
                strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            }
            //dictionary.Add("Skip", dic["Skip"]);
            //dictionary.Add("Take", dic["Take"]);

            string strOrder = " ORDER BY a.EndTime DESC,a.CreateTime DESC ";

            StringBuilder sb = new StringBuilder();


            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);
        }

        public int GetJobList2StudentByDic(string sID, string bGrade)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT Count(1) Count from EI_Job a INNER JOIN EI_JRelS b ON a.ID = b.JID   ");//总条数
            #region 查询条件
            strSql.Append(" WHERE a.DelFlag=0 ");
            strSql.Append(" AND b.SID=@SID ");
            strSql.Append(" AND b.StuState=0 ");
            strSql.Append(" AND a.EndTime>SYSDATE() ");
            strSql.Append(" AND a.StageID=@StageID ");

            #endregion
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11)		};
            parameters[0].Value = sID;
            parameters[1].Value = bGrade;
            return Convert.ToInt32(MySQLHelper.GetSingle(strSql.ToString(), parameters));
        }

        #endregion

        #region 获取查看作业布置
        /// <summary>
        /// 获取查看作业布置
        /// </summary>
        /// <param name="ID">作业ID</param>
        /// <returns></returns>
        public DataSet GetSetted(string ID)
        {

            StringBuilder strSql = new StringBuilder();

            //获取作业
            strSql.Append(" SELECT ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,StageID,Remark from EI_Job where ID=@ID ;");

            //获取作业与学生关联
            strSql.Append(" SELECT b.JID, b.SID,b.StuState,c.Name SName from EI_Job a ");
            strSql.Append(" INNER JOIN EI_JRelS b ON a.ID=b.JID ");
            strSql.Append(" INNER JOIN EI_StudentInfo c on b.SID=c.MfgID ");
            strSql.Append(" where a.ID=@ID ; ");

            //获取作业与题目关联
            strSql.Append(" SELECT a.ID,a.Name,a.GradeID,a.SubjectID,a.EndTime,a.State,a.TID,a.CreateTime,a.DelFlag,a.StageID,a.Remark,b.JID,b.SequenceID,b.ItemID,b.ItemType,b.KnowledgeID,b.KnowledgeName,b.ItemSourceType,b.Score,b.DiffNum,b.PID,b.AddTime FROM  EI_Job a ");
            strSql.Append(" INNER JOIN EI_JRelI b on a.ID=b.JID ");
            strSql.Append(" where a.ID=@ID ; ");

            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)
					};
            parameters[0].Value = ID;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }



        #endregion

        #region 获取电子作业题
        /// <summary>
        /// 获取电子作业题
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        public DataSet GetJobItem(string ID, string SID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(
                " SELECT a.ID, a.Name,a.SubjectID,a.EndTime,b.SequenceID,b.JID,b.ItemID,b.ItemType,b.Score,c.SID,");

            strSql.Append(" CASE d.IsTextAnswer WHEN 0 THEN d.Answer WHEN 1 THEN d.AnswerText END AS Answer,");
            strSql.Append(" d.AnswerTime,d.IsTextAnswer,d.AnswerText,c.StuState ");
            strSql.Append(" FROM  EI_Job a ");
            strSql.Append(" INNER JOIN EI_JRelI b on a.ID=b.JID ");
            strSql.Append(" INNER JOIN EI_JRelS c ON c.JID=a.ID ");
            strSql.Append(" LEFT JOIN EI_JAnswer d on d.ItemID=b.ItemID AND d.SID=c.SID AND c.JID=d.JID  ");

            strSql.Append(" where a.ID=@ID AND c.SID=@SID  ");
            strSql.Append(" ORDER BY b.SequenceID; ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=ID},
                    	new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=SID}
					};
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion

        #region 删除电子作业
        /// <summary>
        /// 删除电子作业
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteJob(string ID)
        {

            int rows = 0;
            var isExists = new JAnswerDal().Exists(ID);
            if (!isExists)
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append(" DELETE FROM EI_Job WHERE ID=@ID ;");
                strSql.Append(" DELETE FROM EI_JRelI WHERE JID=@ID ;");
                strSql.Append(" DELETE FROM EI_JRelS WHERE JID=@ID ;");
                strSql.Append(" DELETE FROM EI_JAnswer WHERE JID=@ID ;");
                MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40){Direction = ParameterDirection.InputOutput,Value = ID}			};

                rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            }
            return rows;
        }

        #endregion


        #region 作业分析
        /// <summary>
        /// 根据作业ID获取布置对象的回答列表
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public DataSet GetStudentByJobID(string jobId, string sid = "")
        {
            StringBuilder strSql = new StringBuilder();

            //查询学生信息
            strSql.Append("SELECT EIS.MfgID,EIS.OrgID,EIS.SType,EIS.Name,EIS.Shool,EIS.Class,EIS.MasterName,");
            strSql.Append("EIS.MasterPhone,EIS.Gender,EIS.GradeID,EIS.CardNumber,EIS.QQ,EIS.Phone,EIS.Address,");
            strSql.Append("EIS.ImgUrl,EIS.RoleTypeID,EIS.DelFlag,EIS.Remark,EIG.`Name` AS GroupName,EIJS.StuState,EIJS.SumeTime  from EI_StudentInfo EIS ");
            strSql.Append("INNER JOIN EI_JRelS EIJS on EIS.MfgID=EIJS.SID and EIS.DelFlag=0");
            strSql.Append(" LEFT JOIN EI_GRelS EIGS ON EIGS.SID=EIS.MfgID LEFT JOIN EI_GroupInfo EIG ON EIG.ID =EIGS.GID ");
            strSql.Append(" where EIJS.JID=@jobId ");
            strSql.Append(" group BY EIS.MfgID ORDER BY EIGS.GID, EIGS.SID ;");

            //查询学生回答情况
            strSql.Append("select EIJS.TeacherComment as TeacherTotalComment, EIJA.ID,EIJA.Accuracy,EIJA.SID AS SID,EIJA.JID AS JobID,EIJI.SequenceID," +
                          "EIJA.Score,EIJI.ItemID,EIJ.`Name` AS JobName,EIJI.ItemType,EIJ.SubjectID,EIJI.Score as FullScore," +
                          "EIJA.Review AS TeacherComment,EIJA.AnswerTime,EIJ.GradeID," +
                          "  CASE EIJA.IsTextAnswer WHEN 0 THEN EIJA.Answer WHEN 1 THEN EIJA.AnswerText END AS Answer,EIJA.IsTextAnswer,EIJA.AnswerText, " +
                          "	EIJI.KnowledgeID,EIJI.KnowledgeName,EIJA.NoteContent,EIJS.StuState,EIJI.DiffNum from EI_JAnswer EIJA ");
            strSql.Append("INNER JOIN EI_JRelS EIJS ON EIJA.SID=EIJS.SID AND EIJA.JID=EIJS.JID ");
            strSql.Append(" INNER JOIN EI_JRelI EIJI ON EIJI.ItemID=EIJA.ItemID AND EIJI.JID =EIJA.JID ");
            strSql.Append(" INNER JOIN EI_Job EIJ ON EIJA.JID=EIJ.ID ");
            strSql.Append(" WHERE EIJA.DelFlag=0 AND ");
            strSql.Append("EIJS.JID=@jobId ");
            //if (!string.IsNullOrEmpty(sid))
            //{
            //    strSql.Append(" AND EIJS.SID=@SID ");
            //}
            strSql.Append("order by EIJI.ItemType,EIJI.SequenceID;");

            //查询知识点列表
            strSql.Append("select SUM(EIJA.Score) as ActuScore,SUM(EIJI.Score) as FULLScore,");
            strSql.Append(" EIJA.SID AS SID,EIJA.JID AS JobID,EIJI.ItemID,EIJI.KnowledgeID  as PointID,EIJI.KnowledgeName  as PointName ");
            strSql.Append("from EI_JAnswer EIJA INNER JOIN EI_JRelS EIJS ON EIJA.SID=EIJS.SID AND EIJA.JID=EIJS.JID  ");
            strSql.Append("INNER JOIN EI_JRelI EIJI ON EIJI.ItemID=EIJA.ItemID AND EIJI.JID =EIJA.JID ");
            strSql.Append("WHERE EIJA.DelFlag=0 AND EIJS.JID=@jobId ");
            strSql.Append("GROUP BY EIJI.KnowledgeID,EIJA.SID ;");
            //查询作业信息
            strSql.Append("select EIJ.SubjectID ,EIJ.`Name` AS JobName, JID AS JobID,ItemID,SequenceID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score as FullScore, DiffNum from EI_JRelI EIJI INNER JOIN EI_Job EIJ ON EIJI.JID=EIJ.ID");
            strSql.Append(" WHERE JID=@jobId ;");

            MySqlParameter[] parameters = {
					new MySqlParameter("@jobId", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40)};
            parameters[0].Value = jobId;
            if (!string.IsNullOrEmpty(sid))
            {
                parameters[1].Value = sid;
            }

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion
        #region 根据作业ID获取作业信息
        /// <summary>
        /// 根据作业ID获取作业信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public EI_Job GetModel(string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark from EI_Job ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobId;

            EI_Job model = new EI_Job();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_Job>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("select ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark from EI_Job ");
            //strSql.Append(" where ID=@ID ");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            //parameters[0].Value = jobId;

            //EI_Job model = new EI_Job();
            //DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    return ModelConvertHelper<EI_Job>.ConvertToModel(ds.Tables[0]);
            //}
            //else
            //{
            //    return null;
            //}
            #endregion
        }
        #endregion


        #region yangjin 根据作业ID获取作业信息 Redis
        public JobModel GetJobInfo(string jobId)
        {
            var jobinfo = new JobModel();
            //RedisDal.RemoveKey(RedisTypeEnum.Jobitem, jobId);
            if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, jobId))
            {
                var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, jobId);
                if (dicts.Count > 0)
                {
                    //job主表
                    jobinfo.ID = jobId;
                    jobinfo.Name = dicts["Name"];
                    jobinfo.GradeID = string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
                    jobinfo.SubjectID = string.IsNullOrEmpty(dicts["SubjectID"])
                        ? 0
                        : Convert.ToInt32(dicts["SubjectID"]);
                    jobinfo.EndTime = string.IsNullOrEmpty(dicts["EndTime"])
                        ? DateTime.Now.AddDays(3)
                        : Convert.ToDateTime(dicts["EndTime"]);
                    jobinfo.State = string.IsNullOrEmpty(dicts["State"]) ? 0 : Convert.ToInt32(dicts["State"]);
                    jobinfo.TID = dicts["TID"];
                    jobinfo.CreateTime = Convert.ToDateTime(dicts["CreateTime"]);

                    //作业题目
                    var jobItems =
                        dicts.Where(m => m.Key.Contains("Item_"))
                            .Select(m => m.Value.FromJsonTo<JobRelItemModel>())
                            .ToList();
                    jobinfo.JobrelItemList = jobItems;
                    //布置对象
                    var stuItems = new List<JRelSModel>() { };
                    if (dicts.ContainsKey("studentObjs"))
                    {
                        stuItems = dicts["studentObjs"].Split('|').ToList().Select(m =>
                        {
                            var s = m.Split(',');
                            return new JRelSModel()
                            {
                                JID = jobId,
                                SID = s[0],
                                StuState = 0,
                                SumeTime = 0,
                                Name = s[1]
                            };
                        }
                    ).ToList();

                    }
                    jobinfo.JrelsList = stuItems;
                }


            }
            else
            {
                StringBuilder strSql = new StringBuilder();

                //job主表

                strSql.Append(
                    "select ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,StageID from EI_Job ");
                strSql.Append(" where ID=@JID ;");
                //jobitems
                strSql.Append("SELECT ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,ADDTIME FROM EI_JRelI");
                strSql.Append(" where JID=@JID ORDER BY ItemType,SequenceID  ;");
                //job和学生关联
                strSql.Append("select JID,SID,StuState from EI_JRelS");
                strSql.Append(" where JID=@JID ;");

                //将数据保存到redis，并将数据库中数据删除，点击保存时进行插入操作
                strSql.Append("DELETE FROM  EI_Job");
                strSql.Append(" where ID=@JID;");

                strSql.Append("DELETE FROM  EI_JRelI");
                strSql.Append(" where JID=@JID;");

                MySqlParameter[] parameters =
                {
                    new MySqlParameter("@JID", MySqlDbType.VarChar, 40)
                };
                parameters[0].Value = jobId;
                DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
                jobinfo = ModelConvertHelper<JobModel>.ConvertToModel(ds.Tables[0]);
                var jobitems = ModelConvertHelper<JobRelItemModel>.ConvertToModelList(ds.Tables[1]);
                jobinfo.JobrelItemList = jobitems;
                var stuitems = ModelConvertHelper<JRelSModel>.ConvertToModelList(ds.Tables[2]);
                jobinfo.JrelsList = stuitems;
                //Add(eiJob);

                var keyValues = new List<KeyValuePair<string, string>>()
                {
                    new KeyValuePair<string, string>("ID",        jobinfo.ID),
                    new KeyValuePair<string, string>("Name",      jobinfo.Name),
                    new KeyValuePair<string, string>("GradeID",   jobinfo.GradeID.ToString()),
                    new KeyValuePair<string, string>("SubjectID", jobinfo.SubjectID.ToString()),
                    new KeyValuePair<string, string>("EndTime",   jobinfo.EndTime.ToString()),
                    new KeyValuePair<string, string>("State",     jobinfo.State.ToString()),
                    new KeyValuePair<string, string>("TID",       jobinfo.TID),
                    new KeyValuePair<string, string>("CreateTime",jobinfo.CreateTime.ToString()),
                    new KeyValuePair<string, string>("DelFlag",   jobinfo.DelFlag.ToString()),
                    new KeyValuePair<string, string>("Remark",    string.IsNullOrEmpty(jobinfo.Remark)?"":jobinfo.Remark),
                    new KeyValuePair<string, string>("StageID",   jobinfo.StageID.ToString())
                };
                jobitems.ForEach(
                    m => keyValues.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));

                RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, jobinfo.ID, "studentObjs");
                //布置对象
                if (stuitems != null)
                {
                    var stu = new StringBuilder();
                    stuitems.ForEach(
                        m => stu.Append(m.SID + "," + m.Name + "|"));
                    keyValues.Add(new KeyValuePair<string, string>("studentObjs", stu.ToString().TrimEnd('|')));
                }
                RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jobinfo.ID, keyValues);
            }

            return jobinfo;
        }
        #endregion

        #region 获取 作业 信息

        public List<JobQuestionDTO> GetQuestions(Guid jobID)
        {
            List<JobQuestionDTO> list = new List<JobQuestionDTO>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT 
	EI_Job.ID,
	EI_Job.`Name`, 
	EI_Job.SubjectID,
	EI_JRelI.SequenceID,
	EI_JRelI.ItemID,
	EI_JRelI.ItemType
FROM EI_JRelI
LEFT JOIN EI_Job ON EI_JRelI.JID=EI_Job.ID
WHERE EI_Job.ID = @JobID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@JobID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=jobID}
            };
            list = MySQLHelper.ExecuteStatement<JobQuestionDTO>(strSql.ToString(), (a) =>
            {
                return new JobQuestionDTO()
                {
                    JobID = a.IsDBNull(0) ? Guid.Empty : Guid.Parse(a.GetString(0)),
                    JobName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    SubjectID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                    SequenceID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    ItemID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    ItemType = a.IsDBNull(5) ? 0 : a.GetInt32(5)
                };
            }, parameters);

            return list;
        }

        #endregion


        #region 布置巩固作业

        /// <summary>
        /// 布置巩固作业
        /// </summary>
        /// <param name="jid">作业ID，考试ID</param>
        /// <param name="items">要布置的试题列表</param>
        /// <param name="type">类别，0 作业，1 考试</param>
        /// <param name="newjid"></param>
        /// <returns></returns>
        public bool AddJob(string jid, string items, int type, out string newjid)
        {
            newjid = "";
            try
            {
                if (type == 0)
                {
                    StringBuilder strSql = new StringBuilder();
                    newjid = Guid.NewGuid().ToString();
                    //新建作业
                    strSql.Append("insert into EI_Job (ID,`Name`,SubjectID,State,GradeID,TID,CreateTime,DelFlag,StageID,EndTime)");
                    strSql.Append(
                        "SELECT @newjid as ID,`Name`,SubjectID,0,GradeID,TID,SYSDATE() as CreateTime ,DelFlag,StageID,SYSDATE() AS EndTime FROM EI_Job where ID=@ID;");
                    MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
                    new MySqlParameter("@newjid", MySqlDbType.VarChar, 40)
                };

                    parameters[0].Value = jid;
                    parameters[1].Value = newjid;

                    var jobitems = JsonHelper.FromJsonTo<List<StudentJobItemModel>>(items);
                    jobitems = jobitems.OrderBy(m => m.ItemType).ToList();
                    int sequence = 0;


                    foreach (var item in jobitems)
                    {
                        sequence++;
                        strSql.Append(
                            " INSERT INTO EI_JRelI (ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime)");
                        strSql.AppendFormat(
                            " SELECT UUID() as ID,'{0}' AS JID,{1} AS SequenceID ,EI_JRelI.ItemID,EI_JRelI.ItemType,EI_JRelI.KnowledgeID,",
                            newjid, sequence);
                        strSql.Append(
                            " EI_JRelI.KnowledgeName,EI_JRelI.ItemSourceType,0 as Score,EI_JRelI.DiffNum,EI_JRelI.PID,EI_JRelI.AddTime");
                        strSql.AppendFormat(" from EI_JRelI where JID='{0}' and ItemID='{1}' ; ", jid, item.ItemID);

                    }
                    MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
                    return true;
                }
                else
                {
                    StringBuilder strSql = new StringBuilder();
                    newjid = Guid.NewGuid().ToString();
                    //新建作业
                    strSql.Append("insert into EI_Job (ID,`Name`,SubjectID,State,GradeID,TID,CreateTime,DelFlag,StageID,EndTime)");
                    strSql.Append(
                        "SELECT @newjid as ID,`Name`,SubjectID,State,GradeID,TID,SYSDATE() as CreateTime ,DelFlag,StageID,SYSDATE() AS EndTime FROM EI_Exam where ID=@ID;");
                    MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
                    new MySqlParameter("@newjid", MySqlDbType.VarChar, 40)
                };

                    parameters[0].Value = jid;
                    parameters[1].Value = newjid;

                    var jobitems = JsonHelper.FromJsonTo<List<StudentJobItemModel>>(items);
                    jobitems = jobitems.OrderBy(m => m.ItemType).ToList();
                    int sequence = 0;
                    foreach (var item in jobitems)
                    {
                        sequence++;
                        strSql.Append(
                            " INSERT INTO EI_JRelI (ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime)");
                        strSql.AppendFormat(
                            " SELECT UUID() as ID,'{0}' AS JID,{1} AS SequenceID ,EI_ERelI.ItemID,EI_ERelI.ItemType,EI_ERelI.KnowledgeID,",
                            newjid, sequence);
                        strSql.Append(
                            " EI_ERelI.KnowledgeName,EI_ERelI.ItemSourceType,0 as Score,EI_ERelI.DiffNum,EI_ERelI.PID,EI_ERelI.AddTime");
                        strSql.AppendFormat(" from EI_ERelI where EID='{0}' and ItemID='{1}' ; ", jid, item.ItemID);

                    }
                    MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
                    return true;
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error("布置巩固作业失败", ex);
                return false;
            }

        }

        /// <summary>
        /// 布置巩固作业
        /// </summary>
        /// <param name="jid">作业ID，考试ID</param>
        /// <param name="items">要布置的试题列表</param>
        /// <param name="type">类别，0 作业，1 考试</param>
        /// <param name="newjid"></param>
        /// <returns></returns>
        public bool AddJob(string jid, List<StudentJobItemModel> items, int type, out string newjid)
        {
            newjid = "";
            try
            {
                #region old
                //if (type == 0)
                //{
                //    StringBuilder strSql = new StringBuilder();
                //    newjid = Guid.NewGuid().ToString();
                //    //新建作业
                //    strSql.Append("insert into EI_Job (ID,`Name`,SubjectID,State,GradeID,TID,CreateTime,DelFlag,StageID,EndTime)");
                //    strSql.Append(
                //        "SELECT @newjid as ID,`Name`,SubjectID,State,GradeID,TID,SYSDATE() as CreateTime ,DelFlag,StageID,SYSDATE() AS EndTime FROM EI_Job where ID=@ID;");
                //    MySqlParameter[] parameters =
                //{
                //    new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
                //    new MySqlParameter("@newjid", MySqlDbType.VarChar, 40)
                //};

                //parameters[0].Value = jid;
                //parameters[1].Value = newjid;
                //var jobitems = items;
                //int sequence = 0;


                //foreach (var item in jobitems)
                //{
                //    sequence++;
                //    strSql.Append(
                //        " INSERT INTO EI_JRelI (ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime)");
                //    strSql.AppendFormat(
                //        " VALUES (UUID(),'{0}','{1}' ,'{2}' ,'{3}','{4}','{5}',0 ,",
                //        newjid, sequence, item.ItemID, ((int)item.ItemType).ToString(), item.KnowledgeID, item.KnowledgeName);
                //    strSql.AppendFormat(
                //      " 0,{0},0 ,'{1}');",
                //      item.DiffNum, DateTime.Now.ToString("yyyy/MM/dd"));

                //}
                //var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
                //return rows >= items.Count() + 1; 
                #endregion
                if (type == 0)
                {
                    StringBuilder strSql = new StringBuilder();
                    newjid = Guid.NewGuid().ToString();
                    strSql.Append(@"INSERT INTO ei_jobbook 
    (ID,`Name`,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare) ");
                    strSql.Append(
                 "SELECT @newjid as ID,`Name`,TID,StageID,GradeID,SubjectID,SYSDATE() as CreateTime,SYSDATE() as UpdateTime,0 as IsAssign,0 as IsEdit,1 as IsDel,0 as IsShare FROM EI_Job where ID=@ID;");
                    MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
                    new MySqlParameter("@newjid", MySqlDbType.VarChar, 40)
                };

                    parameters[0].Value = jid;
                    parameters[1].Value = newjid;
                    var jobitems = items;
                    int sequence = 0;
                    foreach (var item in jobitems)
                    {
                        sequence++;
                        strSql.Append(
                            "INSERT INTO ei_jbookreli                              (ID,BookID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID)");
                        strSql.AppendFormat(
                            " VALUES (UUID(),'{0}','{1}' ,'{2}' ,'{3}','{4}','{5}',0 ,",
                            newjid, sequence, item.ItemID, item.ItemStyle, item.KnowledgeID, item.KnowledgeName);
                        strSql.AppendFormat(" 0,{0},0 );", item.DiffNum);

                    }
                    var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
                    return rows >= items.Count() + 1;
                }
                else
                {
                    //    StringBuilder strSql = new StringBuilder();
                    //    newjid = Guid.NewGuid().ToString();
                    //    //新建作业
                    //    strSql.Append("insert into EI_Job (ID,`Name`,SubjectID,State,GradeID,TID,CreateTime,DelFlag,StageID,EndTime)");
                    //    strSql.Append(
                    //        "SELECT @newjid as ID,`Name`,SubjectID,State,GradeID,TID,SYSDATE() as CreateTime ,DelFlag,StageID,SYSDATE() AS EndTime FROM EI_Exam where ID=@ID;");
                    //    MySqlParameter[] parameters =
                    //{
                    //    new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
                    //    new MySqlParameter("@newjid", MySqlDbType.VarChar, 40)
                    //};

                    //    parameters[0].Value = jid;
                    //    parameters[1].Value = newjid;

                    //    var jobitems = items;
                    //    int sequence = 0;



                    //    foreach (var item in jobitems)
                    //    {
                    //        sequence++;
                    //        strSql.Append(
                    //            " INSERT INTO EI_JRelI (ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID,AddTime)");
                    //        strSql.AppendFormat(
                    //            " VALUES (UUID(),'{0}','{1}' ,'{2}' ,'{3}','{4}','{5}',0 ,",
                    //            newjid, sequence, item.ItemID, ((int)item.ItemType).ToString(), item.KnowledgeID, item.KnowledgeName);
                    //        strSql.AppendFormat(
                    //          " 0,{0},0 ,'{1}');",
                    //          item.DiffNum, DateTime.Now.ToString("yyyy/MM/dd"));

                    //    }
                    //    MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
                    //    return true;
                    StringBuilder strSql = new StringBuilder();
                    newjid = Guid.NewGuid().ToString();
                    strSql.Append(@"INSERT INTO ei_jobbook 
    (ID,`Name`,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare) ");
                    strSql.Append(
                 "SELECT @newjid as ID,`Name`,TID,StageID,GradeID,SubjectID,SYSDATE() as CreateTime,SYSDATE() as UpdateTime,0 as IsAssign,0 as IsEdit,1 as IsDel,0 as IsShare FROM EI_Exam where ID=@ID;");
                    MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
                    new MySqlParameter("@newjid", MySqlDbType.VarChar, 40)
                };

                    parameters[0].Value = jid;
                    parameters[1].Value = newjid;
                    var jobitems = items;
                    int sequence = 0;
                    foreach (var item in jobitems)
                    {
                        sequence++;
                        strSql.Append(
                            "INSERT INTO ei_jbookreli                              (ID,BookID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID)");
                        strSql.AppendFormat(
                            " VALUES (UUID(),'{0}','{1}' ,'{2}' ,'{3}','{4}','{5}',0 ,",
                            newjid, sequence, item.ItemID, item.ItemStyle, item.KnowledgeID, item.KnowledgeName);
                        strSql.AppendFormat(" 0,{0},0 );", item.DiffNum);

                    }
                    var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
                    return rows >= items.Count() + 1;
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error("布置巩固作业失败", ex);
                return false;
            }

        }
        #endregion

        #region 布置电子作业 修改日期20150616
        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        public bool SaveJob2Model(JobModel jobmodel)
        {
            #region 保存电子作业
            var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, jobmodel.ID);
            if (dicts.Count > 0)
            {
                //job主表

                jobmodel.ID = !dicts.ContainsKey("ID") ? string.Empty : dicts["ID"];
                //jobmodel.Name = dicts["Name"];
                jobmodel.GradeID = !dicts.ContainsKey("GradeID") ? 0 : string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
                jobmodel.SubjectID = !dicts.ContainsKey("SubjectID") ? 0 : string.IsNullOrEmpty(dicts["SubjectID"]) ? 0 : Convert.ToInt32(dicts["SubjectID"]);
                //jobmodel.EndTime = dicts["EndTime"];
                jobmodel.State = !dicts.ContainsKey("State") ? 0 : string.IsNullOrEmpty(dicts["State"]) ? 0 : Convert.ToInt32(dicts["State"]);
                jobmodel.TID = !dicts.ContainsKey("TID") ? string.Empty : dicts["TID"];
                jobmodel.CreateTime = DateTime.Now;
                jobmodel.DelFlag = 0;
                jobmodel.Remark = !dicts.ContainsKey("Remark") ? string.Empty : dicts["Remark"];
                jobmodel.StageID = !dicts.ContainsKey("StageID") ? 0 : string.IsNullOrEmpty(dicts["StageID"]) ? 0 : Convert.ToInt32(dicts["StageID"]);
            }
            List<String> SqlList = new List<String>();

            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();

            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_Job(");
            strSql.Append("ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,StageID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@Name,@GradeID,@SubjectID,@EndTime,@State,@TID,@CreateTime,@DelFlag,@Remark,@StageID);");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
                    new MySqlParameter("@EndTime", MySqlDbType.DateTime),
                    new MySqlParameter("@State", MySqlDbType.Int32,1),
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
                    new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11)
                };
            parameters[0].Value = jobmodel.ID;
            parameters[1].Value = jobmodel.Name;
            parameters[2].Value = jobmodel.GradeID;
            parameters[3].Value = jobmodel.SubjectID;
            //parameters[4].Value = jobmodel.EndTime;
            parameters[4].Value = Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", jobmodel.EndTime) + "  23:59:59");
            parameters[5].Value = jobmodel.State;
            parameters[6].Value = jobmodel.TID;
            parameters[7].Value = jobmodel.CreateTime;
            parameters[8].Value = jobmodel.DelFlag;
            parameters[9].Value = jobmodel.Remark;
            parameters[10].Value = jobmodel.StageID;

            SqlList.Add(strSql.ToString());
            sqlParamList.Add(parameters);
            strSql.Clear();
            strSql.AppendFormat(@"delete from EI_JRelI where JID='{0}';", jobmodel.ID);
            if (jobmodel.JobrelItemList.Count > 0)
            {
                foreach (var item in jobmodel.JobrelItemList)
                {
                    strSql.Append(@"Insert into EI_JRelI(ID,JID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        jobmodel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }
            }
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });

            #endregion

            #region 布置对象修改
            strSql.Clear();
            strSql.Append(@"delete from EI_JRelS  where  JID=@JID;");
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] {
              new MySqlParameter("@JID", MySqlDbType.VarChar, 40){Direction = ParameterDirection.InputOutput, Value = jobmodel.ID}
            });
            strSql.Clear();
            if (jobmodel.JrelsList.Count > 0)
            {
                foreach (var item in jobmodel.JrelsList)
                {
                    strSql.AppendFormat(@"insert into EI_JRelS(JID,SID,StuState)values ('{0}','{1}',{2});", jobmodel.ID, item.SID, (int?)StateEnum.NoSubmit);
                }
            }
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion

            #region 添加教学日记
            strSql.Clear();
            strSql.Append(@"insert into EI_TeachDiary(");
            strSql.Append(@"ID,Name,TId,CreateTime,DelFlag,Remark)");
            strSql.Append(@" values (");
            strSql.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}');", Guid.NewGuid().ToString(), "布置作业【" + jobmodel.Name + "】", jobmodel.TID, DateTime.Now, 0, "");
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion

            if (MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0)
            {
                //保存成功，清除缓存
                //RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, jobmodel.ID);
                return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, jobmodel.ID);

            }
            else
            {
                return false;
            }



            #region Redis之前代码
            //#region 保存电子作业
            //List<String> SqlList = new List<String>();
            //StringBuilder str = new StringBuilder();
            //List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            //MySqlParameter[] parameters =
            //    {
            //        new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
            //        new MySqlParameter("@Name", MySqlDbType.VarChar, 50),
            //        new MySqlParameter("@EndTime", MySqlDbType.DateTime, -1),
            //    };
            //parameters[0].Value = jobmodel.ID;
            //parameters[1].Value = jobmodel.Name;
            //parameters[2].Value = Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", jobmodel.EndTime) + "  23:59:59");

            //str.Append(@"UPDATE EI_Job set `Name`=@Name, EndTime=@EndTime WHERE ID=@ID;");
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(parameters);
            //str.Clear();
            //str.AppendFormat(@"delete from EI_JRelI where JID='{0}';", jobmodel.ID);
            //if (jobmodel.JobrelItemList.Count > 0)
            //{
            //    foreach (var item in jobmodel.JobrelItemList)
            //    {
            //        str.Append(@"Insert into EI_JRelI(ID,JID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
            //        str.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
            //            Guid.NewGuid().ToString(),
            //            jobmodel.ID,
            //            item.KnowledgeID,
            //            item.KnowledgeName,
            //            item.ItemID,
            //            item.ItemType,
            //            item.ItemSourceType,
            //            item.SequenceID,
            //            item.Score,
            //            item.DiffNum,
            //            item.PID
            //            );
            //    }
            //}
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] { });

            //#endregion

            //#region 布置对象修改
            //str.Clear();
            //str.Append(@"delete from EI_JRelS  where  JID=@JID;");
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] {
            //  new MySqlParameter("@JID", MySqlDbType.VarChar, 40){Direction = ParameterDirection.InputOutput, Value = jobmodel.ID}
            //});
            //str.Clear();
            //if (jobmodel.JrelsList.Count > 0)
            //{
            //    foreach (var item in jobmodel.JrelsList)
            //    {
            //        str.AppendFormat(@"insert into EI_JRelS(JID,SID,StuState)values ('{0}','{1}',{2});", jobmodel.ID, item.SID, (int?)StateEnum.NoSubmit);
            //    }
            //}
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] { });
            //#endregion

            //#region 添加教学日记
            //str.Clear();
            //str.Append(@"insert into EI_TeachDiary(");
            //str.Append(@"ID,Name,TId,CreateTime,DelFlag,Remark)");
            //str.Append(@" values (");
            //str.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}');", Guid.NewGuid().ToString(), "布置作业【" + jobmodel.Name + "】", jobmodel.TID, DateTime.Now, 0, "");
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] { });
            //#endregion

            //if (MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0)
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
        /// 保存电子作业到缓存
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        public bool SaveJob2ModelToCache(JobModel jobmodel)
        {
            #region 保存主表
            var keys = new List<KeyValuePair<string, string>>()
            {
                   //new KeyValuePair<string, string>("ID",          jobmodel.ID),
                   new KeyValuePair<string, string>("Name",        jobmodel.Name),
                   //new KeyValuePair<string, string>("GradeID",     jobmodel.GradeID.ToString()),
                   //new KeyValuePair<string, string>("SubjectID",   jobmodel.SubjectID.ToString()),
                   new KeyValuePair<string, string>("EndTime",     string.Format("{0:yyyy/MM/dd}", jobmodel.EndTime) + "  23:59:59"),
                   //new KeyValuePair<string, string>("State",       jobmodel.State.ToString()),
                   //new KeyValuePair<string, string>("TID",         jobmodel.TID),
                   //new KeyValuePair<string, string>("CreateTime",  jobmodel.CreateTime.ToString()),
                   //new KeyValuePair<string, string>("DelFlag",     jobmodel.DelFlag.ToString()),
                   //new KeyValuePair<string, string>("Remark",      jobmodel.Remark),
                   //new KeyValuePair<string, string>("StageID",     jobmodel.StageID.ToString())
            };
            #endregion

            #region 保存题目信息
            var jobitems = jobmodel.JobrelItemList;
            jobitems.ForEach(
                    m => keys.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            #endregion

            #region 布置对象修改

            RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, jobmodel.ID, "studentObjs");
            var stuItems = jobmodel.JrelsList ?? new List<JRelSModel>();
            var stu = new StringBuilder();
            if (stuItems.Count > 0)
            {
                foreach (var item in stuItems)
                {
                    stu.Append(item.SID + "," + item.Name + '|');
                }
                keys.Add(new KeyValuePair<string, string>("studentObjs", stu.ToString().TrimEnd('|')));
            }

            #endregion
            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jobmodel.ID, keys);
        }
        #endregion

        #region 添加作业评语
        public bool SaveTeacherCommnet(string jid, string sid, string commnet)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("UPDATE EI_JRelS SET TeacherComment=@commnet WHERE SID=@sid AND JID=@jid ");
            MySqlParameter[] parameters = new MySqlParameter[]{
            new MySqlParameter("@jid",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=jid},
            new MySqlParameter("@sid",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=sid},
            new MySqlParameter("@commnet",MySqlDbType.VarChar,500){Direction=ParameterDirection.InputOutput, Value=commnet}
            };
            var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        #region 获取作业箱列表分页数据
        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterModel"></param>
        /// <returns></returns>
        public void GetJobBookList(ParamFilterModel dto)
        {
            dto.PageIndex = dto.PageIndex < 1 ? 1 : dto.PageIndex;
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@GradeID", MySqlDbType.Int16,1){ Direction=ParameterDirection.InputOutput, Value=dto.GradeID},
             new MySqlParameter("@SubjectID", MySqlDbType.Int16,1){ Direction=ParameterDirection.InputOutput, Value=dto.SubjectID},
             new MySqlParameter("@TID", MySqlDbType.VarChar,45){ Direction=ParameterDirection.InputOutput, Value=dto.TID},
             new MySqlParameter("@PageSize", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.PageSize},
             new MySqlParameter("@CurrentPage", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=(dto.PageIndex-1)*dto.PageSize}
            };
            StringBuilder str = new StringBuilder();

            str.Append(@"select count(1)  from EI_JobBook a inner join EI_ManagerInfo b on a.TID=b.AccountNumber");
            str.Append(" where  (a.GradeID=@GradeID or @GradeID=0) and (a.SubjectID=@SubjectID or @SubjectID=0) and b.OrgID=(select x.OrgID from EI_ManagerInfo x where x.AccountNumber=@TID)");
            str.Append(" and ( a.IsShare=1 or (b.AccountNumber=@TID and a.IsShare=0)) and a.IsDel=0; ");

            str.Append(@"select a.ID,a.Name,b.Name,a.GradeID,a.SubjectID,a.StageID,a.CreateTime,a.UpdateTime,a.IsAssign,a.IsEdit,a.IsShare,");
            str.Append(" CASE WHEN a.SubjectID=1 THEN '语文'");
            str.Append(" WHEN a.SubjectID=2 THEN '数学'");
            str.Append(" WHEN a.SubjectID=3 THEN '英语'");
            str.Append(" WHEN a.SubjectID=4 THEN '物理'");
            str.Append(" WHEN a.SubjectID=5 THEN '化学'");
            str.Append(" WHEN a.SubjectID=6 THEN '地理'");
            str.Append(" WHEN a.SubjectID=7 THEN '历史'");
            str.Append(" WHEN a.SubjectID=8 THEN '政治'");
            str.Append(" WHEN a.SubjectID=9 THEN '生物'");
            str.Append(" ELSE '' END SubjectName,a.TID");
            str.Append("  from EI_JobBook a ");
            str.Append("inner join EI_ManagerInfo b on a.TID=b.AccountNumber");
            str.Append("  where  (a.GradeID=@GradeID or @GradeID=0) and (a.SubjectID=@SubjectID or @SubjectID=0) and b.OrgID=(select x.OrgID from EI_ManagerInfo x where x.AccountNumber=@TID)");
            str.Append("  and ( a.IsShare=1 or (b.AccountNumber=@TID and a.IsShare=0)) and a.IsDel=0");
            str.Append(" order by a.UpdateTime desc limit @CurrentPage,@PageSize;");

            var _index = (dto.PageIndex - 1) * dto.PageSize;
            MySQLHelper.ExecuteStatementList<JobBookModel>(str.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.MaxCount = a.GetInt32(0);
                    }
                }
                dto.bookmodelList = new List<JobBookModel>();
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            _index = _index + 1;//生成序号
                            JobBookModel _dto = new JobBookModel();
                            _dto.Index = _index;
                            _dto.ID = a.GetString(0);
                            _dto.Name = a.GetString(1);
                            _dto.TeacherName = a.GetString(2);
                            _dto.GradeID = a.GetInt32(3);
                            _dto.SubjectID = a.GetInt32(4);
                            _dto.StageID = a.GetInt32(5);
                            _dto.CreateTime = a.GetDateTime(6);
                            _dto.UpdateTime = a.GetDateTime(7);
                            _dto.IsAssign = a.GetInt32(8);
                            _dto.IsEdit = a.GetInt32(9);
                            _dto.IsShare = a.GetInt32(10);
                            _dto.SubjectName = a.GetString(11);
                            _dto.TID = a.GetString(12);
                            dto.bookmodelList.Add(_dto);
                        }
                    }
                }
                return null;//没有其它意义
            }, parameters);


        }
        #endregion
        #region  保存作业箱信息
        /// <summary>
        /// 保存作业箱信息
        /// </summary>
        /// <returns></returns>
        public bool SaveBookInfo(JobBookModel bookModel)
        {
            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Insert Into EI_JobBook(ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare)");
            strSql.AppendFormat("values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}');",
                bookModel.ID,
                bookModel.Name,
                bookModel.TID,
                bookModel.StageID,
                bookModel.GradeID,
                bookModel.SubjectID,
                bookModel.CreateTime,
                bookModel.UpdateTime,
                bookModel.IsAssign,
                bookModel.IsEdit,
                bookModel.IsDel,
                bookModel.IsShare
                );

            if (bookModel.JBookModelList.Count() > 0)
            {
                foreach (var item in bookModel.JBookModelList)
                {
                    strSql.Append(@"Insert into EI_JBookRelI(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        bookModel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }

            }
            SqlList.Add(strSql.ToString());
            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, bookModel.ID);
            }
            else
            {
                return false;
            }
        }

        #endregion

        #region 删除作业箱
        public bool DeleteBookInfo(string bookID)
        {
            StringBuilder strBuilder = new StringBuilder();
            strBuilder.AppendFormat(@"Update EI_JobBook set IsDel=1 where ID='{0}'", bookID);
            if (MySQLHelper.ExecuteSql(strBuilder.ToString()) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        #endregion


        #region 获取电子作业箱列表信息
        public JobBookModel GetBookModel(string bookID)
        {

            var jobinfo = new JobBookModel();
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat("SELECT ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare FROM EI_JobBook WHERE ID='{0}';", bookID);
            strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From EI_JBookRelI where BookID='{0}';", bookID);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                jobinfo = ModelConvertHelper<JobBookModel>.ConvertToModel(ds.Tables[0]);
                if (ds.Tables[1].Rows.Count > 0)
                {
                    jobinfo.JBookModelList = ModelConvertHelper<JBookRelIModel>.ConvertToModelList(ds.Tables[1]);

                }
            }
            return jobinfo;

            #region old
            //RedisDal.RemoveKey(RedisTypeEnum.Jobitem, bookID);
            //if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, bookID))
            //{
            //    var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, bookID);
            //    if (dicts.Count > 0)
            //    {
            //        //job主表
            //        jobinfo.ID = bookID;
            //        jobinfo.Name = dicts["Name"];
            //        jobinfo.GradeID = string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
            //        jobinfo.SubjectID = string.IsNullOrEmpty(dicts["SubjectID"])
            //            ? 0
            //            : Convert.ToInt32(dicts["SubjectID"]);
            //        jobinfo.TID = dicts["TID"];
            //        jobinfo.StageID = dicts.ContainsKey("StageID") ? (string.IsNullOrEmpty(dicts["StageID"]) ? 0 : Convert.ToInt32(dicts["StageID"])) : 0;

            //        //作业题目
            //        var jobItems =
            //            dicts.Where(m => m.Key.Contains("Item_"))
            //                .Select(m => m.Value.FromJsonTo<JBookRelIModel>())
            //                .ToList();
            //        jobinfo.JBookModelList = jobItems;
            //    }
            //}
            //else
            //{

            //    StringBuilder strSql = new StringBuilder();
            //    strSql.AppendFormat("SELECT ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare FROM EI_JobBook WHERE ID='{0}';", bookID);
            //    strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From EI_JBookRelI where BookID='{0}';", bookID);
            //    DataSet ds = MySQLHelper.Query(strSql.ToString());
            //    if (ds.Tables[0].Rows.Count > 0)
            //    {
            //        jobinfo = ModelConvertHelper<JobBookModel>.ConvertToModel(ds.Tables[0]);
            //        var keyValues = new List<KeyValuePair<string, string>>()
            //            {
            //                    new KeyValuePair<string, string>("ID",        jobinfo.ID),
            //                    new KeyValuePair<string, string>("Name",      jobinfo.Name),
            //                    new KeyValuePair<string, string>("GradeID",   jobinfo.GradeID.ToString()),
            //                    new KeyValuePair<string, string>("SubjectID", jobinfo.SubjectID.ToString()),
            //                    new KeyValuePair<string, string>("TID",       jobinfo.TID),
            //                    new KeyValuePair<string, string>("CreateTime",jobinfo.CreateTime.ToString()),
            //                    new KeyValuePair<string, string>("StageID",   jobinfo.StageID.ToString())
            //           };

            //        if (ds.Tables[1].Rows.Count > 0)
            //        {
            //            jobinfo.JBookModelList = ModelConvertHelper<JBookRelIModel>.ConvertToModelList(ds.Tables[1]);
            //            jobinfo.JBookModelList.ForEach(
            //         m => keyValues.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            //        }
            //        RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jobinfo.ID, keyValues);
            //    }

            //}

            #endregion

            #region Redis之前代码
            //var jobbook = new JobBookModel();
            //StringBuilder strSql = new StringBuilder();
            //strSql.AppendFormat("SELECT ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare FROM EI_JobBook WHERE ID='{0}'", bookID);
            //DataSet ds = MySQLHelper.Query(strSql.ToString());
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    jobbook = ModelConvertHelper<JobBookModel>.ConvertToModel(ds.Tables[0]);
            //}
            //strSql.Clear();
            //strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From EI_JBookRelI where BookID='{0}'", bookID);
            //ds = MySQLHelper.Query(strSql.ToString());
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    jobbook.JBookModelList = ModelConvertHelper<JBookRelIModel>.ConvertToModelList(ds.Tables[0]);
            //}

            //return jobbook;
            #endregion
        }
        #endregion

        #region  修改作业箱信息
        public bool UpdateBookInfo(JobBookModel bookModel)
        {
            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat("Update EI_JobBook Set Name='{0}',UpdateTime='{1}' where ID='{2}';",
                bookModel.Name,
                DateTime.Now,
                bookModel.ID
                );

            strSql.AppendFormat("delete from EI_JBookRelI where BookID='{0}';", bookModel.ID);
            if (bookModel.JBookModelList.Count() > 0)
            {
                foreach (var item in bookModel.JBookModelList)
                {
                    strSql.Append(@"Insert into EI_JBookRelI(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        bookModel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }

            }
            SqlList.Add(strSql.ToString());
            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                //  return true;
                return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, bookModel.ID);

            }
            else
            {
                return false;
            }
        }

        public bool UpdateBookInfoToCache(JobBookModel bookModel)
        {

            #region 保存主表
            var keys = new List<KeyValuePair<string, string>>()
            {
               new KeyValuePair<string, string>("Name", bookModel.Name),
            };
            #endregion

            #region 保存题目信息
            var jobitems = bookModel.JBookModelList;
            jobitems.ForEach(
                    m => keys.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            #endregion
            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, bookModel.ID, keys);
        }
        #endregion

        #region 保存作业布置对象
        /// <summary>
        /// 保存作业布置对象
        /// </summary>
        /// <returns></returns>
        public bool SaveObject(JobModel jobmodel, JobBookModel bookmodel)
        {

            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            var strGuid = Guid.NewGuid().ToString();

            strSql.Append("Insert Into EI_Job(ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,StageID)");
            strSql.AppendFormat("values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                strGuid,
                jobmodel.Name,
                jobmodel.GradeID,
                jobmodel.SubjectID,
                Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", jobmodel.EndTime) + "  23:59:59"),
                0,
                jobmodel.TID,
                DateTime.Now,
                0,
                "",
                bookmodel.StageID
                );

            if (bookmodel.JBookModelList.Count() > 0)
            {
                foreach (var item in bookmodel.JBookModelList)
                {
                    strSql.Append(@"Insert into ei_jreli(ID,JID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        strGuid,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }
            }

            #region 布置对象
            if (jobmodel.JrelsList.Count > 0)
            {
                foreach (var item in jobmodel.JrelsList)
                {
                    strSql.AppendFormat(@"insert into EI_JRelS(JID,SID,StuState)values ('{0}','{1}',{2});", strGuid, item.SID, (int?)StateEnum.NoSubmit);
                }
            }
            SqlList.Add(strSql.ToString());

            #endregion
            #region 保存教学日志
            strSql.Clear();
            strSql.Append(@"insert into EI_TeachDiary(");
            strSql.Append(@"ID,Name,TId,CreateTime,DelFlag,Remark)");
            strSql.Append(@" values (");
            strSql.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}');", Guid.NewGuid().ToString(), "布置作业【" + jobmodel.Name + "】", jobmodel.TID, DateTime.Now, 0, "");
            SqlList.Add(strSql.ToString());

            #endregion
            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion


    }
}
