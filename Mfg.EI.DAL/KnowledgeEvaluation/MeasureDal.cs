using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public class MeasureDal
    {

        #region 获取测试卷状态
        /// <summary>
        /// 获取试卷状态
        /// </summary>
        /// <param name="measureID"></param>
        /// <returns>状态：0无效，1开始作答，2答题完毕（有效测评）255删除</returns>
        public int GetMeasureStatus(string measureID)
        {
            string sql = @" SELECT MeasureStatus FROM ei_measure_exam where MeasureID=@MeasureID";
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@MeasureID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = measureID });

            // MeasureStatus 状态：0无效，1开始作答，2答题完毕（有效测评）255删除；
            int measureStatus = 0;
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        measureStatus = a.GetByte(0);
                    }
                },
                parameters);

            return measureStatus;

        }
        #endregion

        #region 获取试题
        /// <summary>
        /// 获取试题
        /// </summary>
        /// <param name="measureID"></param>
        /// <returns></returns>
        public List<EI_MeasureItem> GetMeasureItem(string measureID)
        {
            string sql = @" SELECT 
                            a.MeasureID,a.MeasureStatus, a.ExamID,a.ExamName,
                            b.ItemID,b.ItemIndex,b.ItemBody,b.ItemBodyOption,b.ItemOption,b.ItemScore,b.DimID,b.DimName,a.TempID
                            FROM ei_measure_exam a 
                            INNER JOIN ei_measure_item b 
                            ON a.MeasureID=b.MeasureID
                            INNER JOIN ei_exam_dim c 
                            ON b.DimID=c.DimID
                            where a.MeasureID=@MeasureID
                            order by c.DimIndex,b.PatternID,b.ItemIndex ";
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@MeasureID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = measureID });
            List<EI_MeasureItem> list = new List<EI_MeasureItem>();
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    while (a.Read())
                    {
                        EI_MeasureItem dto = new EI_MeasureItem()
                        {
                            MeasureID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                            MeasureStatus = a.IsDBNull(1) ? 0 : a.GetByte(1),
                            ExamID = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                            ExamName = a.IsDBNull(3) ? "" : a.GetString(3),

                            ItemID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                            ItemIndex = a.IsDBNull(5) ? 0 : a.GetInt32(5),
                            ItemBody = a.IsDBNull(6) ? "" : a.GetString(6),
                            ItemBodyOption = a.IsDBNull(7) ? "" : a.GetString(7),
                            ItemOption = a.IsDBNull(8) ? "" : a.GetString(8),
                            ItemScore = a.IsDBNull(9) ? "" : a.GetString(9),
                            DimID = a.IsDBNull(10) ? 0 : a.GetInt32(10),
                            DimName = a.IsDBNull(11) ? "" : a.GetString(11),
                            TempID = a.IsDBNull(12) ? "" : a.GetString(12)
                        };
                        list.Add(dto);
                    }
                },
                parameters);


            return list;
        }
        #endregion

        #region 提交测评
        /// <summary>
        /// 提交测评
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public bool SubmitMeasure(List<EI_MeasureItem> list)
        {
            StringBuilder sql = new StringBuilder();

            //状态：0无效，1开始作答，2答题完毕（有效测评）255删除；
            #region 更新测评状态
            sql.Append(@" UPDATE ei_measure_exam SET MeasureStatus=2,LastEditTime=sysdate() WHERE  MeasureID=@MeasureID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@MeasureID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = list.First().MeasureID });

            sql.Append(@" UPDATE ei_tempstudentinfo set IsEffect=1 WHERE ID=@TempID;");
            parameters.Add(new MySqlParameter("@TempID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = list.First().TempID });
            #endregion

            #region 更新答题和得分
            StringBuilder sb = new StringBuilder();
            int i = 0;
            sb.Append(" ( ");
            foreach (var item in list)
            {
                #region MyRegion
                //                sql.AppendFormat(@" UPDATE ei_measure_item 
                //                                                    SET AnswerItem=@AnswerItem{0},
                //                                                    AnswerScore=@AnswerScore{0}, 
                //                                                    LastEditTime=sysdate(),
                //                                                    IntervalTime=@IntervalTime{0} 
                //                                                    WHERE  MeasureID=@MeasureID AND ItemID=@ItemID{0}; ", i);
                //                parameters.Add(new MySqlParameter(string.Format("@AnswerItem{0}", i), MySqlDbType.String, 10) { Direction = ParameterDirection.InputOutput, Value = item.AnswerItem });
                //                parameters.Add(new MySqlParameter(string.Format("@AnswerScore{0}", i), MySqlDbType.Float, 11) { Direction = ParameterDirection.InputOutput, Value = item.AnswerScore });
                //                parameters.Add(new MySqlParameter(string.Format("@IntervalTime{0}", i), MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = item.IntervalTime });
                //                parameters.Add(new MySqlParameter(string.Format("@ItemID{0}", i), MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = item.ItemID });
                #endregion

                if (i != 0)
                {
                    sb.AppendFormat(@" union all ");
                }

                sb.AppendFormat(@" select '{0}' AnswerItem , '{1}' AnswerScore , '{2}' IntervalTime , '{3}' MeasureID , '{4}' ItemID  ", item.AnswerItem, item.AnswerScore, item.IntervalTime, item.MeasureID, item.ItemID);

                i++;
            }
            sb.Append(" ) b ");


            sql.AppendFormat(@"  UPDATE ei_measure_item a  
                                 inner join {0} 
                                 on  a.MeasureID=b.MeasureID AND a.ItemID=b.ItemID
                                 SET a.AnswerItem=b.AnswerItem,
                                     a.AnswerScore=b.AnswerScore, 
                                     a.LastEditTime=sysdate(),
                                     a.IntervalTime=b.IntervalTime 
                                  ;", sb);


            #endregion

            bool result = MySQLHelper.ExecuteSql(sql.ToString(), parameters.ToArray()) > 0;

            if (result)
            {
                Task.Factory.StartNew(() =>
                {
                    //生成报表
                    new SmartExamReportDal().GenerateReportsByStoredProcedure(list.First().MeasureID);
                });
            }

            return result;
        }

        #endregion


        #region 添加试卷

        /// <summary>
        /// 添加试卷
        /// </summary>
        /// <returns></returns>
        public long AddMeasureExam(EI_Measure_exam measureExam)
        {
            //检查是否存在此用户
            try
            {
                string checkUserSql = "SELECT COUNT(1) FROM ei_measure_exam WHERE tempid=@ID";
                int count = 0;
                MySQLHelper.ExecuteStatementList(checkUserSql.ToString(),
                   (a) =>
                   {
                       while (a.Read())
                       {
                           count = a.GetInt32(0);
                       }

                   }, new List<MySqlParameter>() { (new MySqlParameter("@ID", MySqlDbType.VarChar, 40) { Value = measureExam.TempID }) });


                LogHelperNet.Error("EI_Measure_exam  2", null);

                long id = 0;
                if (count <= 0)
                {
                    StringBuilder strSql = new StringBuilder();
                    strSql.Append("insert into ei_measure_exam(");
                    strSql.Append("MeasureStatus,OrgID,TempID,TID,ExamID,ExamName,ExamEdition,ExpectTime,AgeRange,Remark,ReportDescFormat)");

                    strSql.Append(" SELECT @MeasureStatus,@OrgID,@TempID,@TID,ExamID,ExamName,ExamEdition,ExpectTime,AgeRange,Remark,ReportDescFormat FROM  ei_smart_exam WHERE ExamID =@ExamID ;");

                    strSql.Append(" SELECT LAST_INSERT_ID() AS MeasureID;");

                    strSql.Append("insert into ei_measure_item(");
                    strSql.Append(@"MeasureID,OrgID,TempID,TID,ItemIndex,MathIndex,ItemBody,ItemBodyOption,ItemOption,ItemScore,
                          AnswerItem,AnswerScore,DimID,DimName,DimRemark,PatternID,PatternName,PatternTag,PatternRemark,IntervalTime) ");

                    strSql.Append(@"SELECT (SELECT LAST_INSERT_ID() AS MeasureID),@OrgID,@TempID,@TID,a.ItemIndex,a.MathIndex,a.ItemBody,a.ItemBodyOption,a.ItemOption,a.ItemScore,
                          '',0,a.DimID,b.DimName,b.Remark,a.PatternID,c.PatternName,c.PatternTag,c.Remark,0   FROM  ei_exam_item a  INNER  JOIN ei_exam_dim b ON a.DimID = b.DimID     LEFT JOIN  ei_exam_pattern c 
                          ON a.PatternID = c.PatternID   WHERE  a.IsEnable=1 And a.ExamID=@ExamID And FIND_IN_SET (a.DimID ,@DimIDs )  ;");

                    List<MySqlParameter> parameters = new List<MySqlParameter>();

                    parameters.Add(new MySqlParameter("@MeasureStatus", MySqlDbType.Int32, 1));
                    parameters.Add(new MySqlParameter("@OrgID", MySqlDbType.Int32, 11));
                    parameters.Add(new MySqlParameter("@TempID", MySqlDbType.VarChar, 40));
                    parameters.Add(new MySqlParameter("@TID", MySqlDbType.Int32, 11));
                    parameters.Add(new MySqlParameter("@ExamID", MySqlDbType.Int32, 11));
                    parameters.Add(new MySqlParameter("@DimIDs", MySqlDbType.VarChar, 2000));

                    parameters[0].Value = measureExam.MeasureStatus;
                    parameters[1].Value = measureExam.OrgID;
                    parameters[2].Value = measureExam.TempID;
                    parameters[3].Value = measureExam.TID;
                    parameters[4].Value = measureExam.ExamID;
                    parameters[5].Value = measureExam.DimIDs;

                    MySQLHelper.ExecuteStatementList(strSql.ToString(),
                       (a) =>
                       {
                           while (a.Read())
                           {
                               id = a.GetInt64(0);
                           }

                       }, parameters);
                }
                else
                {
                    return id = -2;
                }
                return id;
            }
            catch (Exception f)
            {
                LogHelperNet.Error("AddMeasureExam", f);
            }
            return 0;
        }
        #endregion

    }
}
