
/*
 * author:杨礼文;
 * function:测评分析Dal
 * adddate:2015-05-17
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using MySql.Data.MySqlClient;
using Mfg.EI.ViewModel;

namespace Mfg.EI.DAL
{
    public class TestAnalysisDal
    {
        #region 测评分析列表
        /// <summary>
        /// 测评分析列表
        /// </summary>
        /// <param name="sID"></param>
        /// <param name="subjectID"></param>
        /// <returns></returns>
        public DataSet GetTestAnalysisList(string sID, string subjectID, string stageID)
        {

            StringBuilder strSqlList = new StringBuilder(@"
                                            set @num:=0;
set @tag:='';
SELECT * from (
SELECT m.KnowledgeID,m.KnowledgeName,ROUND((SUM(m.Accuracy)*100)/count(1),0) as Accuracy from (

SELECT t.KnowledgeID,t.KnowledgeName,t.Accuracy, t.CreateTime,

CASE WHEN @tag=t.KnowledgeID THEN @num:=@num+1 ELSE @num:=1 END as Num,@tag:=t.KnowledgeID  

FROM (

SELECT c.KnowledgeID,c.KnowledgeName,b.Accuracy,b.CreateTime 
from ei_syncjob a 
INNER JOIN ei_syncjreli c on a.ID=c.JID
INNER JOIN ei_syncjanswer b on a.ID=b.JID AND a.SID=b.SID  AND b.ItemID=c.ItemID
WHERE a.DelFlag=0  AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND a.SID=@SID

UNION ALL

SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_exam a INNER JOIN ei_erels b on a.ID=b.EID
INNER JOIN ei_ereli c on a.ID=c.EID
INNER JOIN ei_eanswer d on b.EID=d.EID AND b.SID=d.SID AND c.ItemID=d.ItemID
WHERE a.DelFlag=0  AND b.StuState=2 AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND b.SID=@SID

UNION ALL

SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_job a INNER JOIN ei_jrels b on a.ID=b.JID
INNER JOIN ei_jreli c on a.ID=c.JID
INNER JOIN ei_janswer d on b.JID=d.JID AND b.SID=d.SID AND c.ItemID=d.ItemID
WHERE a.DelFlag=0 AND b.StuState=2 AND a.StageID=@StageID and a.SubjectID=@SubjectID AND b.SID=@SID

) as t ORDER BY t.KnowledgeID, t.CreateTime DESC) as m WHERE m.Num<=30
GROUP BY m.KnowledgeID  ) as q ORDER BY q.Accuracy LIMIT 10;

                                                ");

          

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@SID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=sID},
                new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=subjectID},
                new MySqlParameter("@StageID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=stageID}
            };
            return MySQLHelper.Query(strSqlList.ToString(), parameters);
        }

        public DataSet GetKnowledgeList(string subjectID, string startTime, string endTime)
        {

            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            strSqlWhere.AppendFormat(" WHERE  SubjectID=@SubjectID  and b.CreateTime>'{0}' and  b.CreateTime<'{1}'", startTime, endTime);

            strSqlList.Append(
                "select totalAnswer.KnowledgeID,totalAnswer.KnowledgeName, Accuracy,totalAnswer.CreateTime,totalAnswer.SID,totalAnswer.SubjectID,totalAnswer. SubjectName");
            strSqlList.Append(" from ( ");
            #region 试卷
            strSqlList.Append(" SELECT a.KnowledgeID,a.KnowledgeName,b.Accuracy,b.CreateTime,b.SID,c.SubjectID, ");
            #region 科目
            strSqlList.Append(" CASE WHEN c.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN c.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN c.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN c.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN c.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN c.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN c.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN c.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN c.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName ");
            #endregion

            strSqlList.Append(" FROM EI_ERelI a  ");
            strSqlList.Append(" INNER JOIN EI_EAnswer b ON a.EID=b.EID AND a.ItemID=b.ItemID  ");
            strSqlList.Append(" INNER JOIN EI_Exam c ON c.ID=b.EID  ");
            strSqlList.Append(strSqlWhere);
            #endregion

            strSqlList.Append(" UNION ALL ");

            #region 电子作业
            strSqlList.Append(" SELECT a.KnowledgeID,a.KnowledgeName,b.Accuracy,b.CreateTime,b.SID,c.SubjectID, ");
            #region 科目
            strSqlList.Append(" CASE WHEN c.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN c.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN c.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN c.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN c.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN c.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN c.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN c.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN c.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName ");
            #endregion
            strSqlList.Append(" FROM EI_JRelI a  ");
            strSqlList.Append(" INNER JOIN EI_JAnswer b ON a.JID=b.JID AND a.ItemID=b.ItemID  ");
            strSqlList.Append(" INNER JOIN EI_Job c ON c.ID=b.JID  ");
            strSqlList.Append(strSqlWhere);
            #endregion

            strSqlList.Append(" UNION ALL ");

            #region 同步练习 弱项提分
            strSqlList.Append(" SELECT a.KnowledgeID,a.KnowledgeName,b.Accuracy,b.CreateTime,b.SID,c.SubjectID, ");
            #region 科目
            strSqlList.Append(" CASE WHEN c.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN c.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN c.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN c.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN c.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN c.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN c.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN c.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN c.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName ");
            #endregion
            strSqlList.Append(" FROM EI_SyncJRelI a  ");
            strSqlList.Append(" INNER JOIN EI_SyncJAnswer b ON a.JID=b.JID AND a.ItemID=b.ItemID  ");
            strSqlList.Append(" INNER JOIN EI_SyncJob c ON c.ID=b.JID  ");
            strSqlList.Append(strSqlWhere);

            #endregion

            strSqlList.Append(") as totalAnswer group by totalAnswer.SID,totalAnswer.KnowledgeID");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
               new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=subjectID}
            };


            return MySQLHelper.Query(strSqlList.ToString(), parameters);
        }

        /// <summary>
        /// 获取指定学生指定科目指定时间的掌握率
        /// </summary>
        /// <param name="sid">学生ID</param>
        /// <param name="subjectID">科目ID</param>
        /// <param name="month">时间</param>
        /// <returns></returns>
        public DataSet GetKnowledgeAccuracy(string sid, string subjectID, string month)
        {

            StringBuilder strSqlList = new StringBuilder();
            strSqlList.Append(@"SELECT
                                K.SID,
                                K.SubjectID,
                                K.KnowledgeID,
                                K.KnowledgeName,
                                K.SubjectName,
                                K.CreateTime As Month,
                                K.TotalAccuracy,
                                K.Accuracy,
                                K.FullAccuracy,
                                K.TopAccuracy,
                                K.AvgAccuracy
                                FROM
                                EI_KnowledgeHistory AS K
                                WHERE K.SID=@SID AND K.SubjectID=@SubjectID AND K.CreateTime=@CreateTime;");
            MySqlParameter[] sqlPars = new MySqlParameter[]{
            new MySqlParameter("@SID",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=sid},
            new MySqlParameter("@SubjectID",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=subjectID},
            new MySqlParameter("@CreateTime",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=month}
            };
            return MySQLHelper.Query(strSqlList.ToString(), sqlPars);
        }
        #endregion

        #region
        /// <summary>
        /// 定时执行统计分析任务
        /// </summary>
        /// <returns></returns>
        public bool AnalysisDataBatch()
        {

            StringBuilder strSqlList = new StringBuilder();
            #region 统计知识点掌握率
            strSqlList.Append(@"
                                INSERT INTO EI_KnowledgeHistory 
                                SELECT 
                                  T.SID,
                                  T.SubjectID,
                                  T.KnowledgeID,
                                  T.KnowledgeName,
                                  T.SubjectName,
                                  DATE_FORMAT(T.CreateTime, '%Y-%m') AS CreateTime,
                                  SUM(T.Accuracy) AS TotalAccuracy,
                                  SUM(T.Accuracy) / COUNT(1) AS Accuracy,
                                  COUNT(1) AS FullAccuracy,
                                  0 AS TopAccuracy,
                                  0 AS AvgAccuracy 
                                FROM
                                  (SELECT 
                                    a.KnowledgeID,
                                    a.KnowledgeName,
                                    b.Accuracy,
                                    b.CreateTime,
                                    b.SID,
                                    c.SubjectID,
                                    CASE
                                      WHEN c.SubjectID = 1 
                                      THEN '语文' 
                                      WHEN c.SubjectID = 2 
                                      THEN '数学' 
                                      WHEN c.SubjectID = 3 
                                      THEN '英语' 
                                      WHEN c.SubjectID = 4 
                                      THEN '物理' 
                                      WHEN c.SubjectID = 5 
                                      THEN '化学' 
                                      WHEN c.SubjectID = 6 
                                      THEN '地理' 
                                      WHEN c.SubjectID = 7 
                                      THEN '历史' 
                                      WHEN c.SubjectID = 8 
                                      THEN '政治' 
                                      WHEN c.SubjectID = 9 
                                      THEN '生物' 
                                      ELSE '' 
                                    END SubjectName 
                                  FROM
                                    EI_ERelI a 
                                    INNER JOIN EI_EAnswer b 
                                      ON a.EID = b.EID 
                                      AND a.ItemID = b.ItemID 
                                    INNER JOIN EI_Exam c 
                                      ON c.ID = b.EID 
                                  UNION
                                  ALL 
                                  SELECT 
                                    a.KnowledgeID,
                                    a.KnowledgeName,
                                    b.Accuracy,
                                    b.CreateTime,
                                    b.SID,
                                    c.SubjectID,
                                    CASE
                                      WHEN c.SubjectID = 1 
                                      THEN '语文' 
                                      WHEN c.SubjectID = 2 
                                      THEN '数学' 
                                      WHEN c.SubjectID = 3 
                                      THEN '英语' 
                                      WHEN c.SubjectID = 4 
                                      THEN '物理' 
                                      WHEN c.SubjectID = 5 
                                      THEN '化学' 
                                      WHEN c.SubjectID = 6 
                                      THEN '地理' 
                                      WHEN c.SubjectID = 7 
                                      THEN '历史' 
                                      WHEN c.SubjectID = 8 
                                      THEN '政治' 
                                      WHEN c.SubjectID = 9 
                                      THEN '生物' 
                                      ELSE '' 
                                    END SubjectName 
                                  FROM
                                    EI_JRelI a 
                                    INNER JOIN EI_JAnswer b 
                                      ON a.JID = b.JID 
                                      AND a.ItemID = b.ItemID 
                                    INNER JOIN EI_Job c 
                                      ON c.ID = b.JID 
                                  UNION
                                  ALL 
                                  SELECT 
                                    a.KnowledgeID,
                                    a.KnowledgeName,
                                    b.Accuracy,
                                    b.CreateTime,
                                    b.SID,
                                    c.SubjectID,
                                    CASE
                                      WHEN c.SubjectID = 1 
                                      THEN '语文' 
                                      WHEN c.SubjectID = 2 
                                      THEN '数学' 
                                      WHEN c.SubjectID = 3 
                                      THEN '英语' 
                                      WHEN c.SubjectID = 4 
                                      THEN '物理' 
                                      WHEN c.SubjectID = 5 
                                      THEN '化学' 
                                      WHEN c.SubjectID = 6 
                                      THEN '地理' 
                                      WHEN c.SubjectID = 7 
                                      THEN '历史' 
                                      WHEN c.SubjectID = 8 
                                      THEN '政治' 
                                      WHEN c.SubjectID = 9 
                                      THEN '生物' 
                                      ELSE '' 
                                    END SubjectName 
                                  FROM
                                    EI_SyncJRelI a 
                                    INNER JOIN EI_SyncJAnswer b 
                                      ON a.JID = b.JID 
                                      AND a.ItemID = b.ItemID 
                                    INNER JOIN EI_SyncJob c 
                                      ON c.ID = b.JID) AS T 
                                WHERE DATE_FORMAT(T.CreateTime, '%Y-%m') = DATE_FORMAT(
                                    DATE_SUB(CURDATE(), INTERVAL 1 MONTH),
                                    '%Y-%m'
                                  ) -- WHERE date_format(T.CreateTime ,'%Y-%m')=date_format(now(),'%Y-%m')
                                GROUP BY T.SID,
                                  T.SubjectID,
                                  T.KnowledgeID ;");
            #endregion
            #region 统计平均掌握率，最高掌握率
            strSqlList.Append(@"
                                UPDATE EI_KnowledgeHistory a INNER JOIN
                                    (SELECT
                                    KnowledgeID,
                                    CreateTime,
	                                MAX(Accuracy) AS TopAccuracy,
	                                SUM(TotalAccuracy)/SUM(FullAccuracy) AS AvgAccuracy
                                FROM
                                EI_KnowledgeHistory
                                GROUP BY KnowledgeID,CreateTime) AS b
                                ON a.CreateTime=b.CreateTime AND a.KnowledgeID=b.KnowledgeID
                                SET a.TopAccuracy=b.TopAccuracy,a.AvgAccuracy=b.AvgAccuracy
                                WHERE a.CreateTime= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH),'%Y-%m')
                                ;
                                 ");
            #endregion
            #region 统计每个学生知识点进步情况
            strSqlList.Append(@"
                             INSERT INTO  EI_AccuracyProgress
                            SELECT 
                              A.`SID`,
                              A.`SubjectID`,
                              A.`SubjectName`,
                              A.`KnowledgeID`,
                              A.`KnowledgeName`,
                              A.`Accuracy` AS OldAccuracy,
                              A.`TotalAccuracy` AS OldTotalAccuracy,
                              A.`FullAccuracy` AS OldFullAccuracy,
                              B.Accuracy AS NewAccuracy,
                              B.`TotalAccuracy` AS NewTotalAccuracy,
                              A.`FullAccuracy` AS NewFullAccuracy,
                              (B.`Accuracy` - A.`Accuracy`) AS DiffAccuracy,
                             B.`CreateTime`
                            FROM
                              EI_KnowledgeHistory AS A 
                              INNER JOIN EI_KnowledgeHistory AS B 
                                ON A.SID = B.SID 
                                AND A.SubjectID = B.SubjectID 
                                AND A.KnowledgeID = B.KnowledgeID 
                                AND B.Accuracy > A.Accuracy -- 上个月的数据
                                -- AND DATE_FORMAT(B.`CreateTime`, '%Y-%m')=DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH),'%Y-%m')
                                -- AND DATE_FORMAT(A.`CreateTime`, '%Y-%m')=DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 2 MONTH),'%Y-%m')
                                AND B.`CreateTime`= DATE_FORMAT(
                                  DATE_SUB(CURDATE(), INTERVAL 0 MONTH),
                                  '%Y-%m'
                                ) 
                                AND A.`CreateTime` = DATE_FORMAT(
                                  DATE_SUB(CURDATE(), INTERVAL 1 MONTH),
                                  '%Y-%m'
                                );");
            #endregion
            Common.LogHelperNet.Info("定时执行统计分析任务:" + strSqlList.ToString(), null);
            return MySQLHelper.ExecuteSql(strSqlList.ToString()) > 0;
        }
        #endregion

        #region 获取学生进步记录
        public DataSet GetStuProgess(string Mfgid, string subjectID, string dateTime)
        {
            StringBuilder strSqlList = new StringBuilder();
            strSqlList.AppendFormat(@"SELECT
                  `SID`,
                  `SubjectID`,
                  `SubjectName`,
                  `KnowledgeID`,
                  `KnowledgeName`,
                  `OldAccuracy`,
                  `OldTotalAccuracy`,
                  `OldFullAccuracy`,
                  `NewAccuracy`,
                  `NewTotalAccuracy`,
                  `NewFullAccuracy`,
                  `DiffAccuracy`,
                  `RecordMonth`
                FROM `EI`.`EI_AccuracyProgress` 
                 WHERE RecordMonth=@RecordMonth
                 AND SID=@SID
                 AND SubjectID=@SubjectID
                 ORDER BY DiffAccuracy
                ");
            MySqlParameter[] parameters = new MySqlParameter[]{
            new MySqlParameter("@RecordMonth",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput,Value=dateTime},
            new MySqlParameter("@SID",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput,Value=Mfgid},
            new MySqlParameter("@SubjectID",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput,Value=subjectID},
            };
            return MySQLHelper.Query(strSqlList.ToString(), parameters);
        }
        #endregion



        public KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
             
              new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
              new MySqlParameter("@KnowledgeId", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.KnowledgeId},
              new MySqlParameter("@OrgID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.OrgID}
            };

            sql.Append(@"SELECT LearningTarget,LearningDescription,EditTargetCount,EditDescriptionCount from ei_knowledgepoint where OrgID=@OrgID and KnowledgeId=@KnowledgeId and SubjectID=@SubjectID;");

            MySQLHelper.ExecuteStatement<KnowledgeCustomerPointValue>(sql.ToString(), (a) =>
            {

                dto.PointValue = new KnowledgeCustomerPointValue();

                dto.PointValue.LearningTarget = a.IsDBNull(0) ? string.Empty : a.GetString(0);
                dto.PointValue.LearningDescription = a.IsDBNull(1) ? string.Empty : a.GetString(1);
                dto.PointValue.EditTargetCount = a.GetInt16(2);
                dto.PointValue.EditDescriptionCount = a.GetInt16(3);

                return dto.PointValue;

            }, parameters);

            return dto;
        }

    }
}
