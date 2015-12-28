using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Mfg.EI.DAL
{
    public class WrongDal
    {

        #region usemethod

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_Wrong");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 修改学生笔记
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateNote(string id, string NoteContent)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Wrong set ");

            strSql.Append("NoteContent=@NoteContent");

            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
				
					new MySqlParameter("@NoteContent", MySqlDbType.VarChar,500),
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40)
				};
            parameters[0].Value = NoteContent;
            parameters[1].Value = id;

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
        /// 修改学生回答
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateAnswer(string sid, string itemid, string answer, string subjectId, bool tag)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(SaveAnswerHistroy(sid, itemid, subjectId, answer, (tag ? 1 : 0).ToString(), ""));
            sb.Append(SaveWrong(sid, "", itemid, subjectId, answer, (tag ? 1 : 0).ToString(), "", "", "", ""));


            //Common.LogHelperNet.Info(sb.ToString(), null);
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("update EI_Wrong set ");

            //strSql.Append("Answer=@Answer,");
            //strSql.Append("Tag=@Tag,");
            //strSql.Append("Accuracy=@Accuracy,");
            //strSql.Append("WrongCount=WrongCount+1");

            //strSql.Append(" where ID=@ID ");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@Answer", MySqlDbType.VarChar,500),
            //        new MySqlParameter("@Tag", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@ID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@Accuracy", MySqlDbType.VarChar,40)
            //    };

            //parameters[0].Value = NoteContent;
            //parameters[1].Value = tag ? 1 : 0;
            //parameters[2].Value = id;
            //parameters[3].Value = tag ? 1 : 0;

            int rows = MySQLHelper.ExecuteSql(sb.ToString());
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
        /// 修改学生掌握情况
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateTag(string id, bool tag)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Wrong set ");


            strSql.Append("Tag=@Tag");

            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
				   
                    new MySqlParameter("@Tag", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40)
				};

            parameters[0].Value = tag ? 1 : 0;
            parameters[1].Value = id;

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
            strSql.Append("delete from EI_Wrong ");
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
        /// 获取标签列表，试题来源列表
        /// </summary>
        /// <returns></returns>
        public DataSet GetTagList(string sid, string subjectId, string stageId)
        {
            var strSql = new StringBuilder();
            //标签列表
            strSql.AppendLine("select '标签' as Type, EI.Tag as TagValue,CASE EI.TAG WHEN 0 THEN '未掌握' when 1 then '已掌握' END as Tag,count(1) AS TagCount");
            strSql.Append("FROM EI_Wrong EI where EI.DelFlag=0 AND EI.SID=@SID  AND EI.SubjectID=@SubjectID  AND EI.StageID=@StageID  group by EI.Tag;");
            //试题来源列表
            strSql.AppendLine("SELECT  '来源' as Type,'全部来源' as Tag ,-1 as TagValue, COUNT(1) as TagCount from EI_Wrong EIW where EIW.SID=@SID and EIW.DelFlag=0 AND EIW.SubjectID=@SubjectID AND EIW.StageID=@StageID");
            strSql.AppendLine(" UNION ALL ");
            strSql.AppendLine("select '来源' as Type,ED.`Value` as Tag , EW.Source as TagValue ,count(1) AS TagCount FROM EI_Wrong EW INNER JOIN EI_Dict ED");
            strSql.Append("ON EW.SID=@SID AND EW.DelFlag=0 AND EW.SubjectID=@SubjectID AND EW.StageID=@StageID  and ED.DelFlag=0  AND ED.Type='WrogSource'  AND EW.Source=ED.`Code` group by EW.Source ;");
            //知识点列表
            strSql.AppendLine("SELECT '知识点' AS TYPE, EIW.`KnowledgeID` AS TagValue,EIW.`KnowledgeName` AS Tag,COUNT(1) AS TagCount FROM EI_Wrong EIW WHERE EIW.DelFlag=0 AND EIW.SID=@SID  AND EIW.SubjectID=@SubjectID AND EIW.StageID=@StageID GROUP BY EIW.KnowledgeID,EIW.KnowledgeName ;");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SubjectID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@StageID",MySqlDbType.VarChar,40) };
            parameters[0].Value = sid;
            parameters[1].Value = subjectId;
            parameters[2].Value = stageId;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        public DataSet GetTagList(string sid)
        {
            StringBuilder strSql = new StringBuilder();
            //标签列表
            strSql.AppendLine("select '标签' as Type, EI.Tag as TagValue,CASE EI.TAG WHEN 0 THEN '未掌握' when 1 then '已掌握' END as Tag,count(1) AS TagCount");
            strSql.Append("FROM EI_Wrong EI where EI.DelFlag=0 AND EI.SID=@SID   group by EI.Tag;");
            //试题来源列表
            strSql.AppendLine("SELECT  '来源' as Type,'全部来源' as Tag ,-1 as TagValue, COUNT(1) as TagCount from EI_Wrong EIW where EIW.SID=@SID and EIW.DelFlag=0 ");
            strSql.AppendLine(" UNION ALL ");
            strSql.AppendLine("select '来源' as Type,ED.`Value` as Tag , EW.Source as TagValue ,count(1) AS TagCount FROM EI_Wrong EW INNER JOIN EI_Dict ED");
            strSql.Append("ON EW.SID=@SID AND EW.DelFlag=0  and ED.DelFlag=0  AND ED.Type='WrogSource'  AND EW.Source=ED.`Code` group by EW.Source ;");
            //知识点列表
            strSql.AppendLine("SELECT '知识点' AS TYPE, EIW.`KnowledgeID` AS TagValue,EIW.`KnowledgeName` AS Tag,COUNT(1) AS TagCount FROM EI_Wrong EIW WHERE EIW.DelFlag=0 AND EIW.SID=@SID  GROUP BY EIW.KnowledgeID;");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40)
                 };
            parameters[0].Value = sid;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 获取错题信息
        /// </summary>
        /// <param name="SID"></param>
        /// <param name="sourceValue"></param>
        /// <returns></returns>
        public DataSet GetSourceAllWrongList(string SID, string sourceValue = "", string tagValue = "", string knowleadgeID = "")
        {
            StringBuilder strSql = new StringBuilder();

            strSql.AppendLine("  SELECT EIW.ID,EIW.SID,EIW.`Source` AS SourceType,EIW.`Tag`,EIW.`ItemID`,EIW.`SubjectID`,");
            strSql.AppendLine("  CASE EIW.IsTextAnswer WHEN 0 THEN EIW.Answer WHEN 1 THEN EIW.AnswerText END AS Answer,EIW.IsTextAnswer,EIW.AnswerText,");
            strSql.AppendLine("  EIW.`Accuracy`,EIW.`NoteContent`,EIW.`CreateTime`,EIW.`KnowledgeID`,EIW.`KnowledgeName`,EIW.`DelFlag`,EIW.`Remark` FROM EI_Wrong EIW ");
            strSql.AppendLine("  WHERE EIW.`SID`=@SID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,40),
                    new MySqlParameter("@Source", MySqlDbType.Int32,40),
                    new MySqlParameter("@tagValue", MySqlDbType.Int32,40),
                    new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,40)
                                         };
            parameters[0].Value = SID;
            if (!string.IsNullOrEmpty(sourceValue))
            {
                strSql.AppendLine(" AND EIW.Source=@Source ");
                parameters[2].Value = sourceValue;
            }
            if (!string.IsNullOrEmpty(tagValue))
            {
                strSql.AppendLine(" AND EIW.Tag=@tagValue ");
                parameters[3].Value = tagValue;
            }
            if (!string.IsNullOrEmpty(knowleadgeID))
            {
                strSql.AppendLine(" AND EIW.KnowledgeID=@KnowledgeID ");
                parameters[4].Value = knowleadgeID;
            }

            strSql.AppendLine(" ORDER BY EIW.`CreateTime` ");


            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 获取错题信息
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="sourceValue"></param>
        /// <returns></returns>
        public DataSet GetSourceWrongList(string sid, string subjectId, string sourceValue = "", string tagValue = "", string knowleadgeID = "", string stageId = "")
        {
            StringBuilder strSql = new StringBuilder();

            strSql.AppendLine("  SELECT EIW.WrongCount, EIW.ID,EIW.SID,EIW.`Source` AS SourceType,EIW.`Tag`,EIW.`ItemID`,EIW.`SubjectID`,");
            strSql.AppendLine(" CASE EIW.IsTextAnswer WHEN 0 THEN EIW.Answer WHEN 1 THEN EIW.AnswerText END AS Answer,EIW.IsTextAnswer,EIW.AnswerText,");

            strSql.AppendLine("  EIW.`Accuracy`,EIW.`NoteContent`,EIW.`CreateTime`,EIW.`KnowledgeID`,EIW.`KnowledgeName`,EIW.`DelFlag`,EIW.`Remark` FROM EI_Wrong EIW ");
            strSql.AppendLine("  WHERE EIW.`SID`=@SID AND EIW.`SubjectID`=@SubjectID AND EIW.DelFlag=0   ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,40),
                    new MySqlParameter("@Source", MySqlDbType.Int32,40),
                    new MySqlParameter("@tagValue", MySqlDbType.Int32,40),
                    new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,40),
                    new MySqlParameter("@stageId", MySqlDbType.VarChar,40)
                                         };
            parameters[0].Value = sid;
            parameters[1].Value = subjectId;
            if (!string.IsNullOrEmpty(sourceValue))
            {
                strSql.AppendLine(" AND EIW.Source=@Source ");
                parameters[2].Value = sourceValue;
            }
            if (!string.IsNullOrEmpty(tagValue))
            {
                strSql.AppendLine(" AND EIW.Tag=@tagValue ");
                parameters[3].Value = tagValue;
            }
            if (!string.IsNullOrEmpty(knowleadgeID))
            {
                strSql.AppendLine(" AND EIW.KnowledgeID=@KnowledgeID ");
                parameters[4].Value = knowleadgeID;
            }
            if (!string.IsNullOrEmpty(stageId))
            {
                strSql.AppendLine(" AND EIW.stageId=@stageId ");
                parameters[5].Value = stageId;
            }

            strSql.AppendLine(" ORDER BY EIW.`CreateTime` desc ;");

            //查询答题历史记录
            strSql.AppendFormat(
                " SELECT COUNT(1) AS ACount,GROUP_CONCAT(Answer ORDER BY CreateTime DESC)");//添加时间倒序保证第一个答案是最新的
            strSql.AppendFormat(" AS AHistory, ItemID FROM EI_AnswerHistory WHERE");
            strSql.AppendFormat(" SubjectID='{0}' AND SID='{1}' GROUP BY ItemID,SubjectID,SID;", subjectId, sid);

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="subjectId"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="sourceValue"></param>
        /// <param name="tagValue"></param>
        /// <param name="knowleadgeId"></param>
        /// <param name="stageId"></param>
        /// <returns></returns>
        public DataSet GetSourceWrongList(string sid, string subjectId, int start, int end, string sourceValue = "", string tagValue = "", string knowleadgeId = "", string stageId = "")
        {
            var strSql = new StringBuilder();

            strSql.AppendLine("  SELECT EIW.WrongCount, EIW.ID,EIW.SID,EIW.`Source` AS SourceType,EIW.`Tag`,EIW.`ItemID`,EIW.`SubjectID`,");
            strSql.AppendLine(" CASE EIW.IsTextAnswer WHEN 0 THEN EIW.Answer WHEN 1 THEN EIW.AnswerText END AS Answer,EIW.IsTextAnswer,EIW.AnswerText,");

            strSql.AppendLine("  EIW.`Accuracy`,EIW.`NoteContent`,EIW.`CreateTime`,EIW.`KnowledgeID`,EIW.`KnowledgeName`,EIW.`DelFlag`,EIW.`Remark` FROM EI_Wrong EIW ");
            strSql.AppendLine("  WHERE EIW.`SID`=@SID AND EIW.`SubjectID`=@SubjectID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,40),
                    new MySqlParameter("@Source", MySqlDbType.Int32,40),
                    new MySqlParameter("@tagValue", MySqlDbType.Int32,40),
                    new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,40),
                    new MySqlParameter("@stageId", MySqlDbType.VarChar,40)
                                         };
            parameters[0].Value = sid;
            parameters[1].Value = subjectId;
            if (!string.IsNullOrEmpty(sourceValue))
            {
                strSql.AppendLine(" AND EIW.Source=@Source ");
                parameters[2].Value = sourceValue;
            }
            if (!string.IsNullOrEmpty(tagValue))
            {
                strSql.AppendLine(" AND EIW.Tag=@tagValue ");
                parameters[3].Value = tagValue;
            }
            if (!string.IsNullOrEmpty(knowleadgeId))
            {
                strSql.AppendLine(" AND EIW.KnowledgeID=@KnowledgeID ");
                parameters[4].Value = knowleadgeId;
            }
            if (!string.IsNullOrEmpty(stageId))
            {
                strSql.AppendLine(" AND EIW.stageId=@stageId ");
                parameters[5].Value = stageId;
            }

            strSql.AppendLine(" ORDER BY EIW.`CreateTime` desc ;");

            //查询答题历史记录
            strSql.AppendFormat(
                " SELECT COUNT(1) AS ACount,GROUP_CONCAT(Answer ORDER BY CreateTime DESC)");//添加时间倒序保证第一个答案是最新的
            strSql.AppendFormat(" AS AHistory, ItemID FROM EI_AnswerHistory WHERE");
            strSql.AppendFormat(" SubjectID='{0}' AND SID='{1}' GROUP BY ItemID,SubjectID,SID;", subjectId, sid);

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #region 插入错题本

        /// <summary>
        /// 插入错题本
        /// </summary>
        /// <param name="sid">学生ID</param>
        /// <param name="source">题目来源 0 同步学习，1电子作业，2在线考试，3测评分析</param>
        /// <param name="itemId">题目ID</param>
        /// <param name="subjectId">科目ID</param>
        /// <param name="answer">学生回答</param>
        /// <param name="accuracy">正确率，0~1 float</param>
        /// <param name="knowledgeId">知识点ID</param>
        /// <param name="knolwledgeName">知识点名称</param>
        /// <param name="gradeId">年级ID 1~12</param>
        /// <param name="stageId">大年级ID 1,2,3</param>
        /// <param name="isTextAnswer"></param>
        /// <returns>sql</returns>
        public string SaveWrong(string sid, string source, string itemId, string subjectId, string answer, string accuracy,
            string knowledgeId, string knolwledgeName, string gradeId, string stageId, int isTextAnswer = 0)
        {
            var sb = new StringBuilder();


            //如果有就更新错题次数
            sb.AppendFormat("update EI_Wrong O INNER JOIN (SELECT ");
            sb.AppendFormat("'{0}' as ID, ", "");
            sb.AppendFormat("'{0}' as SID, ", sid);
            sb.AppendFormat("'{0}' as Source, ", string.IsNullOrEmpty(source) ? "0" : source);
            sb.AppendFormat("'{0}' as Tag, ", accuracy.Equals("1") ? 1 : 0);
            sb.AppendFormat("'{0}' as ItemID, ", itemId);
            sb.AppendFormat("'{0}' as SubjectID, ", subjectId);
            //sb.AppendFormat("'{0}' as Answer, ", answer);
            sb.AppendFormat("{0} as Accuracy, ", accuracy);
            sb.AppendFormat("'{0}' as KnowledgeID, ", knowledgeId);
            sb.AppendFormat("'{0}' as KnowledgeName, ", knolwledgeName);
            sb.AppendFormat("'{0}' as NoteContent, ", "");
            sb.AppendFormat("'{0}' as GradeID, ", gradeId);
            sb.AppendFormat("'{0}' as StageID, ", stageId);
            sb.AppendFormat("'{0}' as IsTextAnswer, ", isTextAnswer);
            //判断将答案存入哪个字段
            if (isTextAnswer == 0)
            {
                sb.AppendFormat("'{0}' as Answer, ", answer);
                sb.Append("null as AnswerText, ");
            }
            else
            {
                sb.AppendFormat("'{0}' as AnswerText, ", answer);
                sb.Append("null as Answer, ");
            }
            sb.AppendFormat("'{0}' as CreateTime, ", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            sb.AppendFormat("0 as DelFlag, ");
            sb.AppendFormat("'{0}' as Remark ", "");
            sb.AppendFormat("FROM DUAL  ) AS N  ");
            sb.AppendFormat("on O.ItemID=N.ItemID AND O.SubjectID=N.SubjectID AND O.SID=N.SID ");
            sb.AppendFormat("set ");
            //sb.AppendFormat("O.Answer=CONCAT(O.Answer,',',N.Answer), ");
            sb.AppendFormat("O.IsTextAnswer=N.IsTextAnswer, ");
            sb.AppendFormat("O.Answer=N.Answer, ");
            sb.AppendFormat("O.AnswerText=N.AnswerText, ");
            sb.AppendFormat("O.Tag=N.Tag, ");
            sb.AppendFormat("O.Accuracy=N.Accuracy, ");
            if (string.IsNullOrEmpty(accuracy) || float.Parse(accuracy) < 1)
            {
                sb.AppendFormat("O.WrongCount=O.WrongCount+1 ");
            }
            else
            {
                sb.AppendFormat("O.WrongCount=O.WrongCount ");
            }

            sb.AppendFormat("where O.SID=N.SID AND O.SubjectID=N.SubjectID AND O.ItemID=N.ItemID; ");
            //如果没有就插入
            sb.AppendFormat("Insert into EI_Wrong ");
            sb.AppendFormat("(ID, ");
            sb.AppendFormat("SID, ");
            sb.AppendFormat("Source, ");
            sb.AppendFormat("Tag, ");
            sb.AppendFormat("ItemID, ");
            sb.AppendFormat("SubjectID, ");
            sb.AppendFormat("Answer, ");
            sb.AppendFormat("AnswerText, ");
            sb.AppendFormat("IsTextAnswer, ");
            sb.AppendFormat("Accuracy, ");
            sb.AppendFormat("KnowledgeID, ");
            sb.AppendFormat("KnowledgeName, ");
            sb.AppendFormat("NoteContent, ");
            sb.AppendFormat("GradeID, ");
            sb.AppendFormat("StageID, ");
            sb.AppendFormat("CreateTime, ");
            sb.AppendFormat("DelFlag, ");
            sb.AppendFormat("WrongCount, ");
            sb.AppendFormat("Remark) ");
            sb.AppendFormat(" SELECT ");
            sb.AppendFormat("'{0}' as ID, ", Guid.NewGuid());
            sb.AppendFormat("'{0}' as SID, ", sid);
            sb.AppendFormat("'{0}' as Source, ", string.IsNullOrEmpty(source) ? "0" : source);
            sb.AppendFormat("'{0}' as Tag, ", accuracy.Equals("1") ? 1 : 0);
            sb.AppendFormat("'{0}' as ItemID, ", itemId);
            sb.AppendFormat("'{0}' as SubjectID, ", string.IsNullOrEmpty(subjectId) ? "0" : subjectId);
            if (isTextAnswer == 0)
            {
                sb.AppendFormat("'{0}' as Answer, ", answer);
                sb.Append("null as AnswerText, ");
            }
            else
            {
                sb.Append("null as Answer, ");
                sb.AppendFormat("'{0}' as AnswerText, ", answer);

            }
            sb.AppendFormat("'{0}' as IsTextAnswer, ", isTextAnswer);
            sb.AppendFormat("{0} as Accuracy, ", accuracy);
            sb.AppendFormat("'{0}' as KnowledgeID, ", knowledgeId);
            sb.AppendFormat("'{0}' as KnowledgeName, ", knolwledgeName);
            sb.AppendFormat("'{0}' as NoteContent, ", "");
            sb.AppendFormat("'{0}' as GradeID, ", string.IsNullOrEmpty(gradeId) ? "0" : gradeId);
            sb.AppendFormat("'{0}' as StageID, ", string.IsNullOrEmpty(stageId) ? "0" : stageId);
            sb.AppendFormat("'{0}' as CreateTime, ", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            sb.AppendFormat("0 as DelFlag, ");
            sb.AppendFormat("1 as WrongCount, ");
            sb.AppendFormat("'{0}' as Remark ", "");
            sb.AppendFormat("FROM ");
            sb.AppendFormat(
                "DUAL WHERE not EXISTS (select 1 from EI_Wrong where  ItemID='{0}' AND SubjectID='{1}' AND SID='{2}'); ",
                itemId, subjectId, sid);
            //sb.Append(SaveAnswerHistroy(sid, itemId, subjectId, answer, accuracy, ""));


            return sb.ToString();

        }


        /// <summary>
        /// 插入错题本
        /// </summary>
        /// <param name="sid">学生ID</param>
        /// <param name="source">题目来源 0 同步学习，1电子作业，2在线考试，3测评分析</param>
        /// <param name="itemId">题目ID</param>
        /// <param name="subjectId">科目ID</param>
        /// <param name="answer">学生回答</param>
        /// <param name="accuracy">正确率，0~1 float</param>
        /// <param name="knowledgeId">知识点ID</param>
        /// <param name="knolwledgeName">知识点名称</param>
        /// <param name="gradeId">年级ID 1~12</param>
        /// <param name="stageId">大年级ID 1,2,3</param>
        /// <param name="parameters"></param>
        /// <param name="isTextAnswer"></param>
        /// <returns>sql</returns>
        public string SaveWrong(string sid, string source, string itemId, string subjectId, string answer, string accuracy,
            string knowledgeId, string knolwledgeName, string gradeId, string stageId, out MySqlParameter[] parameters, int i, int isTextAnswer = 0)
        {
            var sb = new StringBuilder();


            //如果有就更新错题次数
            sb.AppendFormat("update EI_Wrong O INNER JOIN (SELECT ");
            sb.AppendFormat("'{0}' as ID, ", "");
            sb.AppendFormat("'{0}' as SID, ", sid);
            sb.AppendFormat("'{0}' as Source, ", string.IsNullOrEmpty(source) ? "0" : source);
            sb.AppendFormat("'{0}' as Tag, ", accuracy.Equals("1") ? 1 : 0);
            sb.AppendFormat("'{0}' as ItemID, ", itemId);
            sb.AppendFormat("'{0}' as SubjectID, ", subjectId);
            //sb.AppendFormat("'{0}' as Answer, ", answer);
            sb.AppendFormat("{0} as Accuracy, ", accuracy);
            sb.AppendFormat("'{0}' as KnowledgeID, ", knowledgeId);
            sb.AppendFormat("@knolwledgeNameWrong{0} as KnowledgeName, ", i);
            sb.AppendFormat("'{0}' as NoteContent, ", "");
            sb.AppendFormat("'{0}' as GradeID, ", gradeId);
            sb.AppendFormat("'{0}' as StageID, ", stageId);
            sb.AppendFormat("'{0}' as IsTextAnswer, ", isTextAnswer);
            //判断将答案存入哪个字段
            if (isTextAnswer == 0)
            {
                sb.AppendFormat("@answerWrong{0} as Answer, ", i);
                sb.Append("null as AnswerText, ");
            }
            else
            {
                sb.AppendFormat("@answerWrong{0} as AnswerText, ", i);
                sb.Append("null as Answer, ");
            }
            sb.AppendFormat("'{0}' as CreateTime, ", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            sb.AppendFormat("0 as DelFlag, ");
            sb.AppendFormat("'{0}' as Remark ", "");
            sb.AppendFormat("FROM DUAL  ) AS N  ");
            sb.AppendFormat("on O.ItemID=N.ItemID AND O.SubjectID=N.SubjectID AND O.SID=N.SID ");
            sb.AppendFormat("set ");
            //sb.AppendFormat("O.Answer=CONCAT(O.Answer,',',N.Answer), ");
            sb.AppendFormat("O.IsTextAnswer=N.IsTextAnswer, ");
            sb.AppendFormat("O.Answer=N.Answer, ");
            sb.AppendFormat("O.AnswerText=N.AnswerText, ");
            sb.AppendFormat("O.Tag=N.Tag, ");
            sb.AppendFormat("O.Accuracy=N.Accuracy, ");
            if (string.IsNullOrEmpty(accuracy) || float.Parse(accuracy) < 1)
            {
                sb.AppendFormat("O.WrongCount=O.WrongCount+1 ");
            }
            else
            {
                sb.AppendFormat("O.WrongCount=O.WrongCount ");
            }

            sb.AppendFormat("where O.SID=N.SID AND O.SubjectID=N.SubjectID AND O.ItemID=N.ItemID; ");
            //如果没有就插入
            sb.AppendFormat("Insert into EI_Wrong ");
            sb.AppendFormat("(ID, ");
            sb.AppendFormat("SID, ");
            sb.AppendFormat("Source, ");
            sb.AppendFormat("Tag, ");
            sb.AppendFormat("ItemID, ");
            sb.AppendFormat("SubjectID, ");
            sb.AppendFormat("Answer, ");
            sb.AppendFormat("AnswerText, ");
            sb.AppendFormat("IsTextAnswer, ");
            sb.AppendFormat("Accuracy, ");
            sb.AppendFormat("KnowledgeID, ");
            sb.AppendFormat("KnowledgeName, ");
            sb.AppendFormat("NoteContent, ");
            sb.AppendFormat("GradeID, ");
            sb.AppendFormat("StageID, ");
            sb.AppendFormat("CreateTime, ");
            sb.AppendFormat("DelFlag, ");
            sb.AppendFormat("WrongCount, ");
            sb.AppendFormat("Remark) ");
            sb.AppendFormat(" SELECT ");
            sb.AppendFormat("'{0}' as ID, ", Guid.NewGuid());
            sb.AppendFormat("'{0}' as SID, ", sid);
            sb.AppendFormat("'{0}' as Source, ", string.IsNullOrEmpty(source) ? "0" : source);
            sb.AppendFormat("'{0}' as Tag, ", accuracy.Equals("1") ? 1 : 0);
            sb.AppendFormat("'{0}' as ItemID, ", itemId);
            sb.AppendFormat("'{0}' as SubjectID, ", string.IsNullOrEmpty(subjectId) ? "0" : subjectId);
            if (isTextAnswer == 0)
            {
                sb.AppendFormat("@answerWrong{0} as Answer, ", i);
                sb.Append("null as AnswerText, ");
            }
            else
            {
                sb.Append("null as Answer, ");
                sb.AppendFormat("@answerWrong{0} as AnswerText, ", i);

            }
            sb.AppendFormat("'{0}' as IsTextAnswer, ", isTextAnswer);
            sb.AppendFormat("{0} as Accuracy, ", accuracy);
            sb.AppendFormat("'{0}' as KnowledgeID, ", knowledgeId);
            sb.AppendFormat("@knolwledgeNameWrong{0} as KnowledgeName, ", i);
            sb.AppendFormat("'{0}' as NoteContent, ", "");
            sb.AppendFormat("'{0}' as GradeID, ", string.IsNullOrEmpty(gradeId) ? "0" : gradeId);
            sb.AppendFormat("'{0}' as StageID, ", string.IsNullOrEmpty(stageId) ? "0" : stageId);
            sb.AppendFormat("'{0}' as CreateTime, ", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            sb.AppendFormat("0 as DelFlag, ");
            sb.AppendFormat("1 as WrongCount, ");
            sb.AppendFormat("'{0}' as Remark ", "");
            sb.AppendFormat("FROM ");
            sb.AppendFormat(
                "DUAL WHERE not EXISTS (select 1 from EI_Wrong where  ItemID='{0}' AND SubjectID='{1}' AND SID='{2}'); ",
                itemId, subjectId, sid);
            //sb.Append(SaveAnswerHistroy(sid, itemId, subjectId, answer, accuracy, ""));

            parameters = new[]
            {
                new MySqlParameter(string.Format("@answerWrong{0}",i),MySqlDbType.VarChar,2000){Direction = ParameterDirection.Input,Value = answer},
                new MySqlParameter(string.Format("@knolwledgeNameWrong{0}",i),MySqlDbType.VarChar,100){Direction = ParameterDirection.Input,Value = knolwledgeName}
            };
            return sb.ToString();

        }
        #endregion

        #region 保存答题记录

        /// <summary>
        /// 保存答题记录
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="itemid"></param>
        /// <param name="subjectId"></param>
        /// <param name="answer"></param>
        /// <param name="accuracy"></param>
        /// <param name="answerTime"></param>
        /// <param name="isTextAnswer"></param>
        /// <returns></returns>
        public string SaveAnswerHistroy(string sid, string itemid, string subjectId, string answer, string accuracy, string answerTime, int isTextAnswer = 0)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT INTO `EI_AnswerHistory`");
            sb.Append("(`ID`,");
            sb.Append("`SID`,");
            sb.Append("`ItemID`,");
            sb.Append("`Answer`,");
            sb.Append("`AnswerText`,");
            sb.Append("`IsTextAnswer`,");
            sb.Append("`AnswerTime`,");
            sb.Append("`Accuracy`,");
            sb.Append("`CreateTime`,");
            sb.Append("`SubjectID`)");
            sb.Append("VALUES ");
            sb.Append(" ( ");
            sb.AppendFormat("UUID(),");
            sb.AppendFormat("'{0}',", sid);
            sb.AppendFormat("'{0}',", itemid);
            if (isTextAnswer == 0)
            {
                sb.AppendFormat("'{0}', ", answer);
                sb.Append("null, ");
            }
            else
            {
                sb.Append("null, ");
                sb.AppendFormat("'{0}', ", answer);

            }
            sb.AppendFormat("'{0}',", isTextAnswer);

            sb.AppendFormat("'{0}',", string.IsNullOrEmpty(answerTime) ? "0" : answerTime);
            sb.AppendFormat("'{0}',", accuracy);
            sb.AppendFormat("SYSDATE(),");
            sb.AppendFormat("'{0}'", subjectId);
            sb.Append(" ) ;");
            return sb.ToString();

        }


        /// <summary>
        /// 保存答题记录
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="itemid"></param>
        /// <param name="subjectId"></param>
        /// <param name="answer"></param>
        /// <param name="accuracy"></param>
        /// <param name="answerTime"></param>
        /// <param name="parameters"></param>
        /// <param name="isTextAnswer"></param>
        /// <returns></returns>
        public string SaveAnswerHistroy(string sid, string itemid, string subjectId, string answer, string accuracy, string answerTime, out MySqlParameter[] parameters, int i, int isTextAnswer = 0)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT INTO `EI_AnswerHistory`");
            sb.Append("(`ID`,");
            sb.Append("`SID`,");
            sb.Append("`ItemID`,");
            sb.Append("`Answer`,");
            sb.Append("`AnswerText`,");
            sb.Append("`IsTextAnswer`,");
            sb.Append("`AnswerTime`,");
            sb.Append("`Accuracy`,");
            sb.Append("`CreateTime`,");
            sb.Append("`SubjectID`)");
            sb.Append("VALUES ");
            sb.Append(" ( ");
            sb.AppendFormat("UUID(),");
            sb.AppendFormat("'{0}',", sid);
            sb.AppendFormat("'{0}',", itemid);
            if (isTextAnswer == 0)
            {
                sb.AppendFormat("@answerHistory{0}, ", i);
                sb.Append("null, ");
            }
            else
            {
                sb.Append("null, ");
                sb.AppendFormat("@answerHistory{0}, ", i);

            }
            sb.AppendFormat("'{0}',", isTextAnswer);

            sb.AppendFormat("'{0}',", string.IsNullOrEmpty(answerTime) ? "0" : answerTime);
            sb.AppendFormat("'{0}',", accuracy);
            sb.AppendFormat("'{0}',", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            sb.AppendFormat("'{0}'", subjectId);
            sb.Append(" ) ;");

            parameters = new MySqlParameter[]
            {
                new MySqlParameter(string.Format("@answerHistory{0}",i),MySqlDbType.VarChar,2000){Direction = ParameterDirection.Input,Value = answer} 
            };


            return sb.ToString();

        }

        #endregion

        #endregion
        #region BasicMethod
        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_Wrong model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_Wrong(");
            strSql.Append("ID,EJAId,Source,Tag,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@ID,@EJAId,@Source,@Tag,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@EJAId", MySqlDbType.VarChar,40),
					new MySqlParameter("@Source", MySqlDbType.Int32,11),
					new MySqlParameter("@Tag", MySqlDbType.Int32,11),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.EJAId;
            parameters[2].Value = model.Source;
            parameters[3].Value = model.Tag;
            parameters[4].Value = model.CreateTime;
            parameters[5].Value = model.DelFlag;
            parameters[6].Value = model.Remark;

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
        public bool Update(EI_Wrong model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Wrong set ");
            strSql.Append("EJAId=@EJAId,");
            strSql.Append("Source=@Source,");
            strSql.Append("Tag=@Tag,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@EJAId", MySqlDbType.VarChar,40),
					new MySqlParameter("@Source", MySqlDbType.Int32,11),
					new MySqlParameter("@Tag", MySqlDbType.Int32,11),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.EJAId;
            parameters[1].Value = model.Source;
            parameters[2].Value = model.Tag;
            parameters[3].Value = model.CreateTime;
            parameters[4].Value = model.DelFlag;
            parameters[5].Value = model.Remark;
            parameters[6].Value = model.ID;

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
            strSql.Append("delete from EI_Wrong ");
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
        public EI_Wrong DataRowToModel(DataRow row)
        {
            EI_Wrong model = new EI_Wrong();
            if (row != null)
            {
                if (row["ID"] != null)
                {
                    model.ID = row["ID"].ToString();
                }
                if (row["EJAId"] != null)
                {
                    model.EJAId = row["EJAId"].ToString();
                }
                if (row["Source"] != null && row["Source"].ToString() != "")
                {
                    model.Source = int.Parse(row["Source"].ToString());
                }
                if (row["Tag"] != null && row["Tag"].ToString() != "")
                {
                    model.Tag = int.Parse(row["Tag"].ToString());
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
        /// 得到一个对象实体
        /// </summary>
        public EI_Wrong GetModel(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,EJAId,Source,Tag,CreateTime,DelFlag,Remark from EI_Wrong ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            EI_Wrong model = new EI_Wrong();
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
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,EJAId,Source,Tag,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_Wrong ");
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
            strSql.Append("select count(1) FROM EI_Wrong ");
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
            strSql.Append(")AS Row, T.*  from EI_Wrong T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }

        /*
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        {
            MySqlParameter[] parameters = {
                    new MySqlParameter("@tblName", MySqlDbType.VarChar, 255),
                    new MySqlParameter("@fldName", MySqlDbType.VarChar, 255),
                    new MySqlParameter("@PageSize", MySqlDbType.Int32),
                    new MySqlParameter("@PageIndex", MySqlDbType.Int32),
                    new MySqlParameter("@IsReCount", MySqlDbType.Bit),
                    new MySqlParameter("@OrderType", MySqlDbType.Bit),
                    new MySqlParameter("@strWhere", MySqlDbType.VarChar,1000),
                    };
            parameters[0].Value = "EI_Wrong";
            parameters[1].Value = "ID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return MySQLHelper.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  BasicMethod
        #region  ExtensionMethod

        #endregion  ExtensionMethod
    }
}
