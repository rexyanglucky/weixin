using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Common;
using Mfg.EI.DAL.KnowledgeEvaluation;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 学能试卷Dal
    /// </summary>
    public class SmartExamReportDal
    {

        /// <summary>
        /// 获取学能试卷列表
        /// </summary>
        /// <returns>List<EI_SmartExam/></returns>
        public SmartExamReportViewModel GetSmartExamRepoInfo(int mesureId)
        {

            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendLine(@"select 
							-- 报告名称，类别
							e.ExamName,
                            -- 报告结果
                            e.ReportDescResult,
                            e.ExamId,
                            e.ExamEdition
							from ei_measure_exam_report e 
							where e.MeasureID=@MeasureID and e.MeasureStatus!=255;");

            MySqlParameter p = new MySqlParameter("@MeasureID", MySqlDbType.Int64) { Direction = ParameterDirection.Input, Value = mesureId };
            var smartExam = new SmartExamReportViewModel();

            MySQLHelper.ExecuteStatementList<SmartExamReportViewModel>(stringBuilder.ToString(), a =>
           {
               if (a.HasRows)
               {
                   while (a.Read())
                   {

                       smartExam.ExamName = a.GetString(0);
                       smartExam.ReportDescResult = a.IsDBNull(1) ? "" : a.GetString(1);
                       smartExam.ExamId = a.GetString(2);
                       smartExam.ExamEdition = a.GetInt32(3);
                   }
               }

               return smartExam;

           }, new List<MySqlParameter> { p });

            if (smartExam.ExamEdition == 1)
            {
                return GetSmartExamRepoInfoOld(mesureId);
            }
            else
            {
                return GetSmartExamRepoInfoNew(mesureId);
            }
        }

        public SmartExamReportViewModel GetSmartExamRepoInfoNew(int mesureId)
        {

            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendLine(@"select 
							-- 报告名称，类别
							e.ExamName,
                            -- 报告结果
                            e.ReportDescResult,
                            e.ExamId,
                            e.ExamEdition
							from ei_measure_exam_report e 
							where e.MeasureID=@MeasureID and e.MeasureStatus!=255;");
            stringBuilder.AppendLine(@"select 
						-- 维度名称
                        r.DimName,
                        -- 维度值
                        r.DocValue,
                        -- 维度固定描述
                        r.Description,
                        -- 维度个性化描述
                        r.LocalDescription,
                        -- 维度备注
                        r.DimRemark,
                        r.ResultID
						from ei_measure_result r 
						where r.MeasureID=@MeasureID and r.ResultStatus!=255;");
            stringBuilder.Append(@"select 
                                pr.PattrenID,
                                pr.PattrenValue,
                                -- case  p.ExamID when 1 then pr.PattrenValuePercent 
								-- else pr.PatternXY end as PattrenValuePercent,
                                pr.PattrenValuePercent,
                                pr.PattrenName,
                                pr.ResultID,
								pr.PatternXY as DocEnum,
                                r.DocKey
								from 
                                ei_dim_pattren_result pr INNER JOIN ei_measure_result r 
                                on pr.ResultID=r.ResultID 
								INNER JOIN ei_measure_exam_report p on r.MeasureID=p.MeasureID
                                where r.MeasureID=@MeasureID;");

            MySqlParameter p = new MySqlParameter("@MeasureID", MySqlDbType.Int64) { Direction = ParameterDirection.Input, Value = mesureId };
            var smartExam = new SmartExamReportViewModel();
            var dimPattrenList = new List<DimPatrrenResult>() { };
            MySQLHelper.ExecuteStatementList<SmartExamReportViewModel>(stringBuilder.ToString(), a =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {

                        smartExam.ExamName = a.GetString(0);
                        smartExam.ReportDescResult = a.IsDBNull(1) ? "" : a.GetString(1);
                        smartExam.ExamId = a.GetString(2);
                        smartExam.ExamEdition = a.GetInt32(3);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        smartExam.DimList = new List<DimResult>();
                        while (a.Read())
                        {
                            smartExam.DimList.Add(new DimResult()
                            {
                                DimName = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                                DocValue = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                                Description = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                                LocalDescription = a.IsDBNull(3) ? string.Empty : a.GetString(3),
                                DimRemark = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                                ResultId = a.IsDBNull(5) ? 0 : a.GetInt32(5),
                                PatrrenList = new List<DimPatrrenResult>()
                            });
                        }
                    }

                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            dimPattrenList.Add(
                                new DimPatrrenResult()
                                {
                                    ParttenId = a.GetInt32(0),
                                    ParttenValue = a.GetInt32(1),
                                    ParttenValuePercent = a.GetFloat(2),
                                    PattrenName = a.GetString(3),
                                    ResultId = a.GetInt32(4),
                                    DocEnum = a.GetByte(5),
                                    DocKey = a.GetInt32(6)
                                });
                        }
                    }
                }
                return smartExam;

            }, new List<MySqlParameter> { p });


            smartExam.DimList.ToList().ForEach(m =>
            {
                var pattrenList = dimPattrenList.Where(n => n.ResultId.Equals(m.ResultId)).ToList();

                m.PatrrenList.AddRange(pattrenList);
            });
            return smartExam;





        }

        public SmartExamReportViewModel GetSmartExamRepoInfoOld(int mesureId)
        {

            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendLine(@"select 
							-- 报告名称，类别
							e.ExamName,
                            -- 报告结果
                            e.ReportDescResult,
                            e.ExamId,
                            e.ExamEdition
							from ei_measure_exam_report e 
							where e.MeasureID=@MeasureID and e.MeasureStatus!=255;");
            stringBuilder.AppendLine(@"select 
						-- 维度名称
                        r.DimName,
                        -- 维度值
                        r.DocValue,
                        -- 维度固定描述
                        r.Description,
                        -- 维度个性化描述
                        r.LocalDescription,
                        -- 维度备注
                        r.DimRemark,
                        r.ResultID
						from ei_measure_result r 
						where r.MeasureID=@MeasureID and r.ResultStatus!=255;");
            stringBuilder.Append(@"select 
                                pr.PattrenID,
                                pr.PattrenValue,
                                case  p.ExamID when 1 then pr.PattrenValuePercent 
								else pr.PatternXY end as PattrenValuePercent,
                                -- pr.PattrenValuePercent,
                                pr.PattrenName,
                                pr.ResultID,
								pr.PatternXY
								
                                from 
                                ei_dim_pattren_result pr INNER JOIN ei_measure_result r 
                                on pr.ResultID=r.ResultID 
								INNER JOIN ei_measure_exam_report p on r.MeasureID=p.MeasureID
                                where r.MeasureID=@MeasureID;");




            MySqlParameter p = new MySqlParameter("@MeasureID", MySqlDbType.Int64) { Direction = ParameterDirection.Input, Value = mesureId };
            var smartExam = new SmartExamReportViewModel();
            var dimPattrenList = new List<DimPatrrenResult>() { };
            MySQLHelper.ExecuteStatementList<SmartExamReportViewModel>(stringBuilder.ToString(), a =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {

                        smartExam.ExamName = a.GetString(0);
                        smartExam.ReportDescResult = a.GetString(1);
                        smartExam.ExamId = a.GetString(2);
                        smartExam.ExamEdition = a.GetInt32(3);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        smartExam.DimList = new List<DimResult>();
                        while (a.Read())
                        {
                            smartExam.DimList.Add(new DimResult()
                            {
                                DimName = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                                DocValue = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                                Description = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                                LocalDescription = a.IsDBNull(3) ? string.Empty : a.GetString(3),
                                DimRemark = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                                ResultId = a.IsDBNull(5) ? 0 : a.GetInt32(5),
                                PatrrenList = new List<DimPatrrenResult>()
                            });
                        }
                    }

                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            dimPattrenList.Add(
                                new DimPatrrenResult()
                                {
                                    ParttenId = a.GetInt32(0),
                                    ParttenValue = a.GetInt32(1),
                                    ParttenValuePercent = a.GetFloat(2),
                                    PattrenName = a.GetString(3),
                                    ResultId = a.GetInt32(4)
                                });
                        }
                    }
                }
                return smartExam;

            }, new List<MySqlParameter> { p });


            smartExam.DimList.ToList().ForEach(m =>
            {
                var pattrenList = dimPattrenList.Where(n => n.ResultId.Equals(m.ResultId)).ToList();

                m.PatrrenList.AddRange(pattrenList);
            });
            return smartExam;





        }

        #region 生成报表
        /// <summary>
        /// 生成报表
        /// </summary>
        /// <param name="measureID"></param>
        public void GenerateReports(string measureID)
        {
            List<EI_MeasureItem> measureItemList = new MeasureDal().GetMeasureItem(measureID);
            List<EI_Smart_doc> docList = new SmartdocDal().GetSmartdocList();


            var groups = measureItemList.GroupBy(m => m.DimID);
            foreach (var group in groups)
            {
                var groupList = measureItemList.Where(m => m.DimID == group.Key);
            }

        }
        #endregion


        #region 生成报表
        /// <summary>
        /// 生成报表（存储过程）
        /// </summary>
        /// <param name="measureID"></param>
        public void GenerateReportsByStoredProcedure(int measureID)
        {
            string sql = string.Format("CALL GetMeasure({0});", measureID);
            try
            {

                MySQLHelper.Query(sql);

                //                List<MySqlParameter> parameters = new List<MySqlParameter>()
                //            {
                //                new MySqlParameter("@measureID", MySqlDbType.Int64,11){ Direction=ParameterDirection.InputOutput, Value=measureID},
                //                new MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=0},
                //                new MySqlParameter("@ReportDescFormat", MySqlDbType.Text){ Direction=ParameterDirection.InputOutput, Value=""},
                //            };




                //                Int64 ExamID = 0;

                //                MySQLHelper.ExecuteStatementList<int>(@"SELECT a.ExamID from ei_measure_exam_report a 
                //WHERE a.MeasureID=@measureID;", a =>
                //                              {
                //                                  while (a.Read())
                //                                  {
                //                                      parameters[1].Value = ExamID = a.GetInt64(0);
                //                                  }
                //                                  return 0;

                //                              }, parameters);
                //                string a0 = string.Empty;
                //                if (ExamID == 1)
                //                {
                //                    var a1 = new List<string>();
                //                    MySQLHelper.ExecuteStatementList<int>(@"SELECT ReportDescFormat from ei_smart_exam WHERE ExamID=@ExamID;SELECT  CONCAT('（<span class=""b"">',b.PatternName,'</span>）') as PatternName from ei_measure_result a INNER JOIN ei_exam_pattern b on a.DocKey=b.PatternID
                //WHERE a.MeasureID=@measureID;", a =>
                //                              {
                //                                  while (a.Read())
                //                                  {
                //                                      a0 = a.GetString(0);
                //                                  }

                //                                  if (a.NextResult())
                //                                  {
                //                                      while (a.Read())
                //                                      {
                //                                          a1.Add(a.GetString(0));
                //                                      }
                //                                  }
                //                                  parameters[2].Value = a0 = string.Format(a0, a1.ToArray());
                //                                  return 0;

                //                              }, parameters);

                //                }
                //                else
                //                {
                //                    var a2 = new List<EI_Measure_Test>();
                //                    //                    MySQLHelper.ExecuteStatementList<int>(@"SELECT ReportDescFormat from ei_smart_exam WHERE ExamID=@ExamID;
                //                    //SELECT a.DimID,CONCAT('（',a.DimName,'）') as DimName,a.DocKey,c.DocKey
                //                    //from ei_measure_result a
                //                    //INNER JOIN ei_smart_doc c on a.DimID=c.DimID
                //                    //WHERE a.MeasureID=@measureID AND c.ExamID=@ExamID;", a =>
                //                    MySQLHelper.ExecuteStatementList<int>(@"SELECT ReportDescFormat from ei_smart_exam WHERE ExamID=@ExamID;
                //SELECT b.PatternXY,CONCAT('（<span class=""b"">', GROUP_CONCAT(a.DimName SEPARATOR '</span>）、（<span class=""b"">'),'</span>）') from ei_measure_result a
                //INNER JOIN ei_dim_pattren_result b on a.ResultID=b.ResultID
                //WHERE a.MeasureID=@measureID GROUP BY b.PatternXY;", a =>
                //                              {
                //                                  while (a.Read())
                //                                  {
                //                                      a0 = a.GetString(0);
                //                                  }

                //                                  if (a.NextResult())
                //                                  {
                //                                      while (a.Read())
                //                                      {
                //                                          a2.Add(new EI_Measure_Test()
                //                                          {
                //                                              DimID = a.GetByte(0),
                //                                              DimName = a.GetString(1),
                //                                              //DocKey = a.GetDouble(2),
                //                                              //DocKeyRow = a.GetDouble(3)
                //                                          });
                //                                      }
                //                                  }

                //                                  var showMessage = string.Empty;

                //                                  if (ExamID == 2)
                //                                  {
                //                                      var list1 = a2.Where(t => t.DimID == 3).Select(m => m.DimName);
                //                                      var list2 = a2.Where(t => t.DimID == 2).Select(m => m.DimName);
                //                                      var list3 = a2.Where(t => t.DimID == 1).Select(m => m.DimName);

                //                                      if (list1.Count() > 0)
                //                                      {

                //                                          //发现您的智能结构中发展较高的有{0}；发展一般的有{1}；发展较低的智能有{2}。
                //                                          showMessage += string.Format("发展较高的有{0}", list1.ToArray());


                //                                          if (list2.Count() > 0 || list3.Count() > 0)
                //                                          {
                //                                              showMessage += "；";
                //                                          }
                //                                      }
                //                                      if (list2.Count() > 0)
                //                                      {

                //                                          showMessage += string.Format("发展一般的有{0}", list2.ToArray());

                //                                          if (list3.Count() > 0)
                //                                          {
                //                                              showMessage += "；";
                //                                          }
                //                                      }
                //                                      if (list3.Count() > 0)
                //                                      {

                //                                          showMessage += string.Format("发展较低的智能有{0}", list3.ToArray());

                //                                      }
                //                                  }
                //                                  else if (ExamID == 3)
                //                                  {
                //                                      var list1 = a2.Where(t => t.DimID == 4).Select(m => m.DimName);
                //                                      var list2 = a2.Where(t => t.DimID == 3).Select(m => m.DimName);
                //                                      var list3 = a2.Where(t => t.DimID == 2).Select(m => m.DimName);
                //                                      var list4 = a2.Where(t => t.DimID == 1).Select(m => m.DimName);

                //                                      if (list1.Count() > 0)
                //                                      {
                //                                          //发现您的非智力因素中得分较高有{0}；得分一般的有{1}；得分较低的有{2}。
                //                                          showMessage += string.Format("非常高有{0}", list1.ToArray());

                //                                          if (list2.Count() > 0 || list3.Count() > 0 || list4.Count() > 0)
                //                                          {
                //                                              showMessage += "；";
                //                                          }
                //                                      }
                //                                      if (list2.Count() > 0)
                //                                      {

                //                                          showMessage += string.Format("较高的有{0}", list2.ToArray());

                //                                          if (list3.Count() > 0 || list4.Count() > 0)
                //                                          {
                //                                              showMessage += "；";
                //                                          }
                //                                      }
                //                                      if (list3.Count() > 0)
                //                                      {

                //                                          showMessage += string.Format("一般的有{0}", list3.ToArray());

                //                                          if (list4.Count() > 0)
                //                                          {
                //                                              showMessage += "；";
                //                                          }
                //                                      }

                //                                      if (list4.Count() > 0)
                //                                      {

                //                                          showMessage += string.Format("较低的有{0}", list4.ToArray());

                //                                      }

                //                                  }

                //                                  showMessage += "。";
                //                                  parameters[2].Value = a0 = string.Format(a0, showMessage);
                //                                  return 0;

                //                              }, parameters);
                //                }



                //                MySQLHelper.ExecuteStatementList<int>(@"UPDATE ei_measure_exam_report set ReportDescResult=@ReportDescFormat WHERE MeasureID=@measureID;", a =>
                //                {
                //                    return 0;

                //                }, parameters);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("存储过程生成报表失败，measureID={0}", measureID), ex);
            }
        }
        #endregion
    }
}
