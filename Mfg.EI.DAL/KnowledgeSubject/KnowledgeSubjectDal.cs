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
    public class KnowledgeSubjectDal
    {
        /// <summary>
        /// 获取学科模型方法
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        public KnowledgeSubjectPointModel GetSubjectReport(string taid, string sid)
        {
            #region sql
            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.Append(@"SELECT 
                                        A.ID as SID,
                                        A.`Name`,
                                        A.Phone,
                                        A.GradeID,
                                        A.StageID,
                                        A.Age,
                                        A.School,
                                        A.Adddress,
                                        A.Gender,
                                        B.SubjectID,
                                        B.TotalHour,a.createtime
                                        from ei_tempstudentinfo A INNER JOIN ei_testanalyze B ON A.ID=B.SID
            WHERE  B.ID=@TAID AND  a.ID=@SID;");
            stringBuilder.Append(@"SELECT 
               B.SID,
                B.TAID,
                B.KID,
                B.KnowledgeName,
                B.ResultLevel,
                B.PointID,
                B.PointName,
                B.PTotalCount,
                B.PRightCount,
                B.CreateTime,
                B.Degree,
                B.EstimateValue,
                B.PointLevel
                FROM 
                ei_knowsubrepot B
               WHERE  B.TAID=@TAID and  B.SID=@SID;");
            stringBuilder.Append(@"SELECT
 B.SID,
B.TAID,
B.Difficty,
B.DiffictyName,
B.TotalCount,
B.RightCount,
B.AnswerTime,
B.RightRate,
case when B.UpdateExpectRate is null then B.ExpectRate else  B.UpdateExpectRate end as ExpectRate,
B.UpdateExpectRate,
B.IsUpdate,
B.CreateTime
 FROM  ei_knowsubrepot_difficuy B
where B.TAID=@TAID and  B.SID=@SID;
");

            #endregion
            List<MySqlParameter> p = new List<MySqlParameter> {
                                     new MySqlParameter("@TAID", MySqlDbType.String) { Direction = ParameterDirection.Input, Value = taid },
                                     new MySqlParameter("@SID", MySqlDbType.String) { Direction = ParameterDirection.Input, Value = sid }
                                 };
            var knowsubjectModel = new KnowledgeSubjectPointModel();

            MySQLHelper.ExecuteStatementList<KnowledgeSubjectPointModel>(stringBuilder.ToString(), a =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        knowsubjectModel.SID = a.GetString(0);
                        knowsubjectModel.Name = a.GetString(1);
                        knowsubjectModel.Phone = a.GetString(2);
                        knowsubjectModel.GradeID = a.GetString(3);
                        knowsubjectModel.StageID = a.GetString(4);
                        knowsubjectModel.Age = a.GetString(5);
                        knowsubjectModel.School = a.GetString(6);
                        knowsubjectModel.Adddress = a.GetString(7);
                        knowsubjectModel.Gender = a.GetString(8);
                        knowsubjectModel.SubjectID = a.GetString(9);
                        knowsubjectModel.TotalHour = a.IsDBNull(10) ? "0" : a.GetString(10);
                        knowsubjectModel.CreateTime = a.GetDateTime(11);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        knowsubjectModel.SujectPointList = new List<SubjectPointModel>();
                        while (a.Read())
                        {
                            knowsubjectModel.SujectPointList.Add(new SubjectPointModel()
                            {
                                SID = a.GetString(0),
                                TAID = a.GetString(1),
                                KID = a.GetString(2),
                                KnowledgeName = a.GetString(3),
                                ResultLevel = a.GetString(4),
                                PointID = a.GetString(5),
                                PointName = a.GetString(6),
                                PTotalCount = a.IsDBNull(7) ? "" : a.GetString(7),
                                PRightCount = a.IsDBNull(8) ? "" : a.GetString(8),
                                CreateTime = a.GetString(9),
                                Degree = a.IsDBNull(10) ? "" : a.GetString(10),
                                EstimateValue = a.IsDBNull(10) ? "" : a.GetString(11),
                                PointLevel = a.IsDBNull(10) ? "" : a.GetString(12)
                            });
                        }
                    }

                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        knowsubjectModel.SubjectDiffyList = new List<SubjectDifficyModel>();
                        while (a.Read())
                        {
                            knowsubjectModel.SubjectDiffyList.Add(new SubjectDifficyModel()
                            {
                                SID = a.IsDBNull(0) ? "" : a.GetString(0),
                                TAID = a.GetString(1),
                                Difficty = a.IsDBNull(2) ? "" : a.GetString(2),
                                DiffictyName = a.IsDBNull(3) ? "" : a.GetString(3),
                                TotalCount = a.IsDBNull(4) ? "" : a.GetString(4),
                                RightCount = a.IsDBNull(5) ? "" : a.GetString(5),
                                AnswerTime = a.IsDBNull(6) ? "" : a.GetString(6),
                                RightRate = a.IsDBNull(7) ? "" : a.GetString(7),
                                ExpectRate = a.IsDBNull(8) ? "" : a.GetString(8),
                                UpdateExpectRate = a.IsDBNull(9) ? "" : a.GetString(9),
                                IsUpdate = a.IsDBNull(10) ? "0" : a.GetString(10),
                                CreateTime = a.GetString(11),


                            });
                        }
                    }
                }

                return knowsubjectModel;

            }, p);

            var subjectList = knowsubjectModel.SujectPointList;
            int flagi = 0;
            if (subjectList != null)
                foreach (var item in subjectList)
                {
                    flagi++;
                    if (item.PointLevel == "必考")
                    {
                        long iticks = DateTime.Now.Ticks;
                        Random ran = new Random((int)iticks * flagi);
                        item.KaoPin = ran.Next(76, 100).ToString();
                    }
                    else if (item.PointLevel == "常考")
                    {
                        long iticks = DateTime.Now.Ticks;
                        Random ran = new Random((int)iticks * flagi);
                        item.KaoPin = ran.Next(51, 75).ToString();
                    }
                    else if (item.PointLevel == "易考")
                    {
                        long iticks = DateTime.Now.Ticks;
                        Random ran = new Random((int)iticks * flagi);
                        item.KaoPin = ran.Next(26, 50).ToString();
                    }
                    else if (item.PointLevel == "不考")
                    {
                        long iticks = DateTime.Now.Ticks;
                        Random ran = new Random((int)iticks * flagi);
                        item.KaoPin = ran.Next(0, 25).ToString();
                    }

                }
            //防止重复数据
            var difflist = knowsubjectModel.SubjectDiffyList;
            var grouplist = difflist.GroupBy(x => x.DiffictyName).Distinct();
            List<SubjectDifficyModel> listdiffmodel = new List<SubjectDifficyModel>();
            foreach (var item in grouplist)
            {
                listdiffmodel.Add(difflist.Where(x => x.DiffictyName == item.Key).FirstOrDefault());

            }
            knowsubjectModel.SubjectDiffyList = listdiffmodel.OrderBy(x => x.Difficty).ToList();

            return knowsubjectModel;




        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="taidList"></param>
        /// <returns></returns>
        public ReportConteSetModel GetConteSetModel(string taidList)
        {
            ReportConteSetModel reportsetmodel = new ReportConteSetModel();
            List<HourClassModel> HourClassList = new List<HourClassModel>();
            List<DiffClassModel> DiffClassList = new List<DiffClassModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat(@"select A.SubjectID,A.TotalHour,B.TAID,B.KID,B.KnowledgeName,B.ClassHour from ei_testanalyze A INNER JOIN ei_tarelkno B
                           ON A.ID=B.TAID  where B.IsUse=1 and  B.TAID in({0}) ORDER BY  A.CreateTime DESC;", taidList);
            DataSet ds = MySQLHelper.Query(strSql.ToString());

            if (ds.Tables[0].Rows.Count > 0)
            {
                HourClassList = ModelConvertHelper<HourClassModel>.ConvertToModelList(ds.Tables[0]);
            }

            strSql.Clear();

            strSql.AppendFormat(@"
           
SELECT
  A.SubjectID,
  B.TAID,
	B.DiffictyName,
	SUM(B.TotalCount) AS TotalCount,
	SUM(B.RightCount) AS RightCount,
	B.ExpectRate,
	B.UpdateExpectRate,
	B.IsUpdate
FROM
ei_testanalyze A  INNER JOIN
	ei_knowsubrepot_difficuy B
ON A.ID=B.TAID
WHERE
	TAID IN ({0})
GROUP BY B.TAID,B.DiffictyName 
ORDER BY A.CreateTime DESC;", taidList);
            ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                DiffClassList = ModelConvertHelper<DiffClassModel>.ConvertToModelList(ds.Tables[0]);
            }
            reportsetmodel.HourClassList = HourClassList;
            reportsetmodel.DiffClassList = DiffClassList;

            strSql.Clear();

            strSql.AppendFormat(@"SELECT DISTINCT DiffictyName from ei_knowsubrepot_difficuy WHERE TAID in ({0}) ORDER BY Difficty;", taidList);

            reportsetmodel.Diff = MySQLHelper.ExecuteStatement<string>(strSql.ToString(), (a) =>
            {
                return a.GetString(0);
            }, null);

            return reportsetmodel;
        }


        /// <summary>
        /// 保存设置内容
        /// </summary>
        /// <param name="reportsetModel"></param>
        /// <returns></returns>
        public bool SaveReportSet(ReportSetSaveModel reportsetModel)
        {
            StringBuilder strSql = new StringBuilder();
            var SetHourList = reportsetModel.SetHourList;
            var SetDiffList = reportsetModel.SetDiffList;
            //更新课时
            if (SetHourList.Count() > 0)
            {
                foreach (var item in SetHourList)
                {
                    strSql.AppendFormat(@"update ei_testanalyze set TotalHour='{0}' where ID='{1}' AND MeasureVersion=2; ", item.TotalHour, item.TAID);

                }
            }
            //更新难度
            if (SetDiffList.Count() > 0)
            {
                foreach (var diff in SetDiffList)
                {
                    strSql.AppendFormat(@"update ei_knowsubrepot_difficuy set UpdateExpectRate='{0}',IsUpdate=1 where TAID='{1}' AND DiffictyName='{2}';", diff.ExpertRate, diff.TAID, diff.DiffName);
                }
            }

            return MySQLHelper.ExecuteSql(strSql.ToString()) > 0;
        }

    }
}
