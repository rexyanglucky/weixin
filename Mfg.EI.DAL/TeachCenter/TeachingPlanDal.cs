using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using Mfg.EI.Entity;

namespace Mfg.EI.DAL
{
    public class TeachingPlanDal
    {
        public PlanViewModel GetPlan(PlanParaViewModel para)
        {
            PlanViewModel dto = new PlanViewModel();
            StringBuilder sqlPara = new StringBuilder();
            sqlPara.Append(@"SELECT COUNT(1) as T from (
SELECT CASE WHEN a.SourceType=1 THEN (SELECT T1.`Name` from ei_studentinfo T1 WHERE T1.MfgID=a.SouceID LIMIT 1)
WHEN a.SourceType=2 THEN (SELECT T2.`Name` from ei_groupinfo T2 WHERE T2.ID=a.SouceID LIMIT 1)
ELSE '' END as SourceName
from ei_plan_mapping a
INNER JOIN ei_plan b on a.PlanID=b.PlanID
WHERE a.TID=@TID AND a.OrgID=@OrgID AND a.IsEffect=1 AND a.IsDelete=0 AND a.IsFinish=@IsFinish AND a.SourceType in (1,2)) as m
WHERE m.SourceName LIKE @Text;");

            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.OrgID},
              new MySqlParameter("@IsFinish", MySqlDbType.Bit,1){ Direction=ParameterDirection.InputOutput, Value=para.IsFinish},
              new MySqlParameter("@PageSize", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.PageSize},
              new MySqlParameter("@PageIndex", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=(para.PageIndex-1)*para.PageSize},
              new MySqlParameter("@Text", MySqlDbType.Text){ Direction=ParameterDirection.InputOutput, Value="%"+ para.SourceName+"%"}
            };
            dto.MaxCount = MySQLHelper.ExecuteStatement<Int32>(sqlPara.ToString(), (a) => a.GetInt32(0), sqlParameter).FirstOrDefault();
            //分页
            sqlPara.Clear();
            //
            if (para.IsFinish)
            {
                sqlPara.Append(@"SELECT m.MappingID,m.PlanID,m.SouceID,m.SourceType,m.GradeID,m.StageID,m.SubjectID,m.PlanNumber,m.PlanName,m.EndTime,m.SourceName,m.TeachSituation FROM (
SELECT a.MappingID, a.PlanID,a.SouceID,a.SourceType,a.GradeID,a.StageID,a.SubjectID,b.PlanNumber,b.PlanName,a.EndTime,
CASE WHEN a.SourceType=1 THEN (SELECT T1.`Name` from ei_studentinfo T1 WHERE T1.MfgID=a.SouceID LIMIT 1)
WHEN a.SourceType=2 THEN (SELECT T2.`Name` from ei_groupinfo T2 WHERE T2.ID=a.SouceID LIMIT 1)
ELSE '' END as SourceName,b.TeachSituation
from ei_plan_mapping a
INNER JOIN ei_plan b on a.PlanID=b.PlanID
WHERE a.TID=@TID AND a.OrgID=@OrgID AND a.IsEffect=1 AND a.IsDelete=0 AND a.IsFinish=@IsFinish AND a.SourceType in (1,2)) as m
WHERE m.SourceName LIKE @Text ORDER BY m.EndTime DESC LIMIT @PageIndex,@PageSize;");
                var _index = (para.PageIndex - 1) * para.PageSize;
                dto.List = MySQLHelper.ExecuteStatement<PlanListViewModel>(sqlPara.ToString(), (a) =>
                {
                    _index = _index + 1;
                    return new PlanListViewModel()
                    {
                        Index = _index,
                        MappingID = a.GetInt64(0),
                        PlanID = a.GetInt64(1),
                        SouceID = a.GetString(2),
                        SourceType = a.GetByte(3),
                        GradeID = a.GetInt32(4),
                        StageID = a.GetInt32(5),
                        SubjectID = a.GetInt32(6),
                        PlanNumber = a.GetInt16(7),
                        PlanName = a.GetString(8),
                        LastUpdateTime = a.GetDateTime(9),
                        LastUpdateTimeStr = string.Format("{0:yyyy-MM-dd HH:mm}", a.GetDateTime(9)), //a.GetDateTime(9).GetDateTimeFormats('g')[0].ToString(),
                        SourceName = a.GetString(10),
                        TeachSituation = a.GetByte(11)
                    };
                }, sqlParameter);
            }
            else
            {
                sqlPara.Append(@"SELECT m.MappingID,m.PlanID,m.SouceID,m.SourceType,m.CurrentNumber,m.PlanNumber,m.PlanName,m.LastUpdateTime,m.SourceName,m.GradeID,m.StageID,m.SubjectID,m.TeachSituation from (
SELECT a.MappingID, a.PlanID,a.SouceID,a.SourceType,
a.CurrentNumber,b.PlanNumber,b.PlanName,a.LastUpdateTime,
CASE WHEN a.SourceType=1 THEN (SELECT T1.`Name` from ei_studentinfo T1 WHERE T1.MfgID=a.SouceID LIMIT 1)
WHEN a.SourceType=2 THEN (SELECT T2.`Name` from ei_groupinfo T2 WHERE T2.ID=a.SouceID LIMIT 1)
ELSE '' END as SourceName,a.GradeID,a.StageID,a.SubjectID,b.TeachSituation
from ei_plan_mapping a
INNER JOIN ei_plan b on a.PlanID=b.PlanID
WHERE a.TID=@TID AND a.OrgID=@OrgID AND a.IsEffect=1 AND a.IsDelete=0 AND a.IsFinish=@IsFinish AND a.SourceType in (1,2)) as m
WHERE m.SourceName LIKE @Text ORDER BY m.LastUpdateTime DESC LIMIT @PageIndex,@PageSize;");
                var _index = (para.PageIndex - 1) * para.PageSize;
                dto.List = MySQLHelper.ExecuteStatement<PlanListViewModel>(sqlPara.ToString(), (a) =>
                {
                    _index = _index + 1;
                    return new PlanListViewModel()
                    {
                        Index = _index,
                        MappingID = a.GetInt64(0),
                        PlanID = a.GetInt64(1),
                        SouceID = a.GetString(2),
                        SourceType = a.GetByte(3),
                        CurrentNumber = a.GetInt16(4),
                        PlanNumber = a.GetInt16(5),
                        PlanName = a.GetString(6),
                        LastUpdateTime = a.GetDateTime(7),
                        LastUpdateTimeStr = string.Format("{0:yyyy-MM-dd HH:mm}", a.GetDateTime(7)),// a.GetDateTime(7).GetDateTimeFormats('g')[0].ToString(),
                        SourceName = a.GetString(8),
                        GradeID = a.GetInt32(9),
                        StageID = a.GetInt32(10),
                        SubjectID = a.GetInt32(11),
                        TeachSituation = a.GetByte(12)
                    };
                }, sqlParameter);
            }
            //
            return dto;
        }

        public PlanViewModel GetPlanSearch(PlanParaViewModel para)
        {
            PlanViewModel dto = new PlanViewModel();
            StringBuilder sqlPara = new StringBuilder();
            sqlPara.Append(@"SELECT COUNT(1) FROM (
SELECT a.StageID,
CASE WHEN a.SourceType=1 THEN (SELECT T1.`Name` from ei_studentinfo T1 WHERE T1.MfgID=a.SouceID LIMIT 1)
WHEN a.SourceType=2 THEN (SELECT T2.`Name` from ei_groupinfo T2 WHERE T2.ID=a.SouceID LIMIT 1)
ELSE '' END as SourceName,b.PlanName
from ei_plan_mapping a
INNER JOIN ei_plan b on a.PlanID=b.PlanID
INNER JOIN ei_manrelsta c on a.StageID=c.StageID AND a.SubjectID=c.SubjectID AND c.TID=@TID
WHERE a.OrgID=@OrgID AND a.IsEffect=1 AND a.IsDelete=0 AND a.SourceType in (1,2)) as m
WHERE (@StageID=0 OR m.StageID=@StageID) AND  (m.SourceName LIKE @Text OR m.PlanName LIKE @Text) ;");

            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@StageID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.StageID},
              new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.OrgID},
              new MySqlParameter("@PageSize", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.PageSize},
              new MySqlParameter("@PageIndex", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=(para.PageIndex-1)*para.PageSize},
              new MySqlParameter("@Text", MySqlDbType.Text){ Direction=ParameterDirection.InputOutput, Value="%"+ para.SourceName+"%"}
            };
            dto.MaxCount = MySQLHelper.ExecuteStatement<Int32>(sqlPara.ToString(), (a) => a.GetInt32(0), sqlParameter).FirstOrDefault();
            //分页
            sqlPara.Clear();
            //

            sqlPara.Append(@"SELECT m.MappingID,m.PlanID,m.SouceID,m.SourceType,m.GradeID,m.StageID,m.SubjectID,m.PlanNumber,m.PlanName,m.LastUpdateTime,m.SourceName,n.Name,m.TeachSituation FROM (
SELECT a.MappingID, a.PlanID,a.SouceID,a.SourceType,a.GradeID,a.StageID,a.SubjectID,b.PlanNumber,b.PlanName,a.LastUpdateTime,
CASE WHEN a.SourceType=1 THEN (SELECT T1.`Name` from ei_studentinfo T1 WHERE T1.MfgID=a.SouceID LIMIT 1)
WHEN a.SourceType=2 THEN (SELECT T2.`Name` from ei_groupinfo T2 WHERE T2.ID=a.SouceID LIMIT 1)
ELSE '' END as SourceName,a.TID,b.TeachSituation
from ei_plan_mapping a
INNER JOIN ei_plan b on a.PlanID=b.PlanID
INNER JOIN ei_manrelsta c on a.StageID=c.StageID AND a.SubjectID=c.SubjectID AND c.TID=@TID
WHERE a.OrgID=@OrgID AND a.IsEffect=1 AND a.IsDelete=0 AND a.SourceType in (1,2)) as m
INNER JOIN ei_managerinfo n  on m.TID=n.AccountNumber
WHERE (@StageID=0 OR m.StageID=@StageID) AND  (m.SourceName LIKE @Text OR m.PlanName LIKE @Text )
ORDER BY m.LastUpdateTime DESC LIMIT @PageIndex,@PageSize;");
            var _index = (para.PageIndex - 1) * para.PageSize;
            dto.List = MySQLHelper.ExecuteStatement<PlanListViewModel>(sqlPara.ToString(), (a) =>
            {
                _index = _index + 1;
                return new PlanListViewModel()
                {
                    Index = _index,
                    MappingID = a.GetInt64(0),
                    PlanID = a.GetInt64(1),
                    SouceID = a.GetString(2),
                    SourceType = a.GetByte(3),
                    GradeID = a.GetInt32(4),
                    StageID = a.GetInt32(5),
                    SubjectID = a.GetInt32(6),
                    PlanNumber = a.GetInt16(7),
                    PlanName = a.GetString(8),
                    LastUpdateTime = a.GetDateTime(9),
                    LastUpdateTimeStr = string.Format("{0:yyyy-MM-dd HH:mm}", a.GetDateTime(9)),// a.GetDateTime(9).GetDateTimeFormats('g')[0].ToString(),
                    SourceName = a.GetString(10),
                    CreateName = a.GetString(11),
                    TeachSituation = a.GetByte(12)
                };
            }, sqlParameter);

            //
            return dto;
        }

        public List<PlanGroup> GetGroup(PlanParaViewModel para)
        {
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT DISTINCT a3.GID,a3.`Name`,a3.SourceType,a3.CreateTime from (
SELECT k.GID,k.`Name`,k.SourceType,a2.StageID,a2.SubjectID,k.CreateTime FROM (
SELECT b.MfgID as GID,b.`Name`,1 as SourceType,a.CreateTime from ei_mrels as a INNER JOIN ei_studentinfo b on a.SID=b.MfgID
WHERE b.DelFlag=0 AND a.TID=@TID
UNION ALL
SELECT a.GID,b.`Name`,2 as SourceType,a.CreateTime from ei_grelm a INNER JOIN ei_groupinfo b on a.GID=b.ID
WHERE b.DelFlag=0 AND a.TID=@TID 
 ) as k CROSS JOIN (
SELECT StageID,SubjectID from ei_manrelsta a1 WHERE a1.TID=@TID) as a2
) as a3 LEFT JOIN (
SELECT a4.StageID,a4.SubjectID,a4.SourceType,a4.SouceID from ei_plan_mapping a4 WHERE a4.TID=@TID AND a4.IsEffect=1
) as a5 on a3.SourceType=a5.SourceType AND a3.GID=a5.SouceID AND a3.StageID=a5.StageID and a3.SubjectID=a5.SubjectID
WHERE a5.StageID is NULL;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
                    {
                        new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID}
                    };
            return MySQLHelper.ExecuteStatement<PlanGroup>(sql.ToString(), (a) => new PlanGroup()
            {
                GID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                GName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                SourceType = a.GetInt32(2),
                T = a.IsDBNull(3) ? string.Empty : a.GetDateTime(3).ToString()
            }, parameters);
        }

        #region 初始化数据
        /// <summary>
        /// 初始化数据
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <returns></returns>
        private int InitData(Int64 planID, int IsEffect)
        {
            int ReturnValue = 0;
            StringBuilder strSql = new StringBuilder();
            //-- 是否编辑 	IsEffect、1是0否
            //-- 计划 		PlanID
            //-- 返回值 		ReturnValue		1为操作成功；2为编辑状态时没有传入计划ID；3为其它原因
            //IN `IsEffect` bit,IN `PlanID` bigint,OUT `ReturnValue` tinyint

            strSql.AppendFormat(@"set @IsEffect:={0};SET @PlanID:={1};SET @ReturnValue:={2};
                                    CALL InitData(@IsEffect,@PlanID,@ReturnValue);
                                     SELECT @PlanID,@ReturnValue;", IsEffect, planID, ReturnValue);
            MySQLHelper.ExecuteStatementList(strSql.ToString(),
                (a) =>
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            ReturnValue = a.GetInt32(1);
                        }
                    }
                },
          null
          )
            ;
            return ReturnValue;
        }
        #endregion

        #region 获取需求设置
        /// <summary>
        /// 获取需求设置
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <returns></returns>
        public FirstStepModel GetPlanDraft(Int64 planID, int IsEffect)
        {
            int ReturnValue = 0;
            ReturnValue = InitData(planID, IsEffect);

            if (ReturnValue == 1)
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append(@" SELECT PlanName,PlanNumber,TeachSituation,b.StageID,b.GradeID,b.SubjectID,b.MaterialID,b.MaterialName,
                                        a.IsTest,a.IsEdit,a.IsEffect,a.PlanID,b.BookID,b.BookName
                             FROM ei_plan_mapping a 
                             INNER JOIN ei_plan_draft b on a.PlanID=b.PlanID 
                             WHERE a.PlanID=@PlanID ");

                List<MySqlParameter> parameters = new List<MySqlParameter>()
                    {
                        new MySqlParameter("@PlanID", MySqlDbType.Int64){ Direction=ParameterDirection.InputOutput, Value=planID}
                    };

                var result = MySQLHelper.ExecuteStatement<FirstStepModel>(strSql.ToString(), (a) =>
                {
                    return new FirstStepModel()
                    {
                        PlanName = a.GetString(0),
                        PlanNumber = a.GetInt16(1),
                        TeachSituation = a.GetByte(2),//教学情境：1同步教学；2综合复习；
                        StageID = a.GetInt32(3),//大年级(1，2，3)；小升初：1；中考：2；高考：3
                        GradeID = a.GetInt32(4),
                        SubjectID = a.GetInt32(5),
                        MaterialID = a.IsDBNull(6) ? "" : a.GetString(6),
                        MaterialName = a.IsDBNull(7) ? "" : a.GetString(7),
                        IsTest = a.GetBoolean(8) ? 1 : 0,
                        IsEdit = a.GetBoolean(9) ? 1 : 0,
                        IsEffect = a.GetBoolean(10) ? 1 : 0,
                        PlanID = a.GetInt64(11),
                        BookID = a.IsDBNull(12) ? "" : a.GetString(12),
                        BookName = a.IsDBNull(13) ? "" : a.GetString(13)

                    };
                }, parameters).FirstOrDefault();

                return result ?? new FirstStepModel();
            }
            return new FirstStepModel();
        }

        public byte SaveFinish(PlanParaViewModel para)
        {
            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@PlanID", MySqlDbType.Int64,11){ Direction=ParameterDirection.InputOutput, Value=para.PlanID},
              new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID},
            };
            StringBuilder sql = new StringBuilder();
            sql.Append(@"UPDATE ei_plan_mapping a set a.IsFinish=1,a.LastUpdateTime=NOW(),a.EndTime=now(),a.LastTID=@TID
WHERE a.PlanID=@PlanID AND a.IsEffect=1 AND a.IsDelete=0;");

            return Convert.ToByte(MySQLHelper.ExecuteStatement(sql.ToString(), sqlParameter).ToString());
        }

        public byte GetQuote(PlanParaViewModel para)
        {
            // IN `MappingXML` text,OUT `ReturnValue` tinyint
            var MappingXML = string.Format(@"<Mapping SourceType=""{0}"" SouceID=""{1}"" OrgID=""{2}"" TID=""{3}"" PlanID=""{4}""></Mapping>", para.SourceType, para.SouceID, para.OrgID, para.TID, para.PlanID);
            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@MappingXML", MySqlDbType.Text){ Direction=ParameterDirection.InputOutput, Value=MappingXML},
              new MySqlParameter("@PlanID", MySqlDbType.Int64,11){ Direction=ParameterDirection.Output},
              new MySqlParameter("@ReturnValue", MySqlDbType.Byte){ Direction=ParameterDirection.Output},
            };
            MySQLHelper.ExecuteStatement(@"CreateQuote", sqlParameter, CommandType.StoredProcedure);
            para.NewPlanID = Convert.ToInt64(sqlParameter[1].Value.ToString());
            return Convert.ToByte(sqlParameter[2].Value.ToString());
        }

        public PlanIndexViewModel GetPlanIndexs(PlanParaViewModel para)
        {
            PlanIndexViewModel dto = new PlanIndexViewModel();
            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@PlanID", MySqlDbType.Int64,11){ Direction=ParameterDirection.InputOutput, Value=para.PlanID},
              new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.TID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.OrgID}
            };
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT a.MappingID,a.SourceType,a.SouceID,a.StageID,a.GradeID,a.SubjectID,a.StartTime,a.EndTime,b.PlanName,b.PlanNumber,b.TeachSituation,
CASE WHEN a.SourceType=2 THEN (SELECT a1.`Name` from ei_groupinfo a1 WHERE a1.ID=a.SouceID LIMIT 1)
WHEN a.SourceType=1 THEN (SELECT a2.`Name` from ei_studentinfo a2 WHERE a2.MfgID=a.SouceID LIMIT 1)
ELSE '' END as SourceName
FROM ei_plan_mapping a INNER JOIN ei_plan b on a.PlanID=b.PlanID
WHERE b.PlanID=@PlanID;
SELECT a.PlanIndexID,a.NumberName from ei_plan_index a WHERE a.PlanID=@PlanID ORDER BY a.INumber;");
            MySQLHelper.ExecuteStatementList<PlanIndexViewModel>(sql.ToString(), a =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.MappingID = a.GetInt64(0);
                        dto.SourceType = a.GetByte(1);
                        dto.SouceID = a.GetString(2);
                        dto.StageID = a.GetInt32(3);
                        dto.GradeID = a.GetInt32(4);
                        dto.SubjectID = a.GetInt32(5);
                        dto.StartTime = a.GetDateTime(6);
                        dto.EndTime = a.GetDateTime(7);
                        dto.PlanName = a.GetString(8);
                        dto.PlanNumber = a.GetInt16(9);
                        dto.TeachSituation = a.GetByte(10);
                        dto.SourceName = a.GetString(11);
                    }
                }
                if (a.NextResult())
                {
                    dto.List = new List<PlanIndexUpViewModel>();
                    while (a.Read())
                    {
                        dto.List.Add(new PlanIndexUpViewModel()
                        {
                            PlanIndexID = a.GetInt64(0),
                            NumberName = a.GetString(1)
                        });
                    }
                }
                return null;
            }, sqlParameter);
            return dto;
        }

        public PlanPointViewModel GetPlanPoints(PlanParaViewModel para)
        {
            PlanPointViewModel dto = new PlanPointViewModel();
            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@PlanID", MySqlDbType.Int64,11){ Direction=ParameterDirection.InputOutput, Value=para.PlanID},
              new MySqlParameter("@PlanIndexID", MySqlDbType.Int64,11){ Direction=ParameterDirection.InputOutput, Value=para.PlanIndexID},
              new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.TID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.OrgID}
            };
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT a.IsTitle,a.IsFirst,a.IsTarget,a.IsDiff,a.IsTeach,a.IsSummary,
CASE WHEN a.IsTitle=1 THEN a.TitleName ELSE SPACE(0) END as TitleName,
CASE WHEN a.IsFirst=1 THEN a.FirstMark ELSE SPACE(0) END as FirstMark,
CASE WHEN a.IsTarget=1 THEN a.TargetMark ELSE SPACE(0) END as TargetMark,
CASE WHEN a.IsDiff=1 THEN a.DiffMark ELSE SPACE(0) END as DiffMark,
CASE WHEN a.IsSummary=1 THEN a.SummaryMark ELSE SPACE(0) END as SummaryMark
from ei_plan_index a 
WHERE a.PlanID=@PlanID AND a.PlanIndexID=@PlanIndexID;");
            sql.Append(@"SELECT a.PlanPointsID,a.ParentID,a.IsShow,a.IsRoot,a.IsLeaf,a.CurrentLever,a.IsHas,a.PointID,a.PointName,a.PointIndex from ei_plan_points a 
WHERE a.PlanIndexID=@PlanIndexID AND a.IsRoot=0 AND a.IsEffect=1 AND a.IsShow=1;");
            //            sql.Append(@"SELECT b.DetailID,a.PlanPointsID,b.PointType,b.ItemID,b.ItemIndex from ei_plan_points a 
            //INNER JOIN ei_plan_details b on a.PlanPointsID=b.PlanPointsID
            //WHERE a.PlanIndexID=@PlanIndexID AND b.IsEffect=1;");
            sql.Append(@"SELECT a.PlanPointsID,b.PointType,GROUP_CONCAT(b.ItemID ORDER BY b.ItemIndex) as T from ei_plan_points a 
INNER JOIN ei_plan_details b on a.PlanPointsID=b.PlanPointsID
WHERE a.PlanIndexID=@PlanIndexID AND b.IsEffect=1
GROUP BY a.PlanPointsID,b.PointType;");
            MySQLHelper.ExecuteStatementList<PlanPointViewModel>(sql.ToString(), a =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.IsTitle = a.GetBoolean(0);
                        dto.IsFirst = a.GetBoolean(1);
                        dto.IsTarget = a.GetBoolean(2);
                        dto.IsDiff = a.GetBoolean(3);
                        dto.IsTeach = a.GetBoolean(4);
                        dto.IsSummary = a.GetBoolean(5);
                        dto.TitleName = a.IsDBNull(6) ? string.Empty : a.GetString(6);
                        dto.FirstMark = a.IsDBNull(7) ? string.Empty : a.GetString(7);
                        dto.TargetMark = a.IsDBNull(8) ? string.Empty : a.GetString(8);
                        dto.DiffMark = a.IsDBNull(9) ? string.Empty : a.GetString(9);
                        dto.SummaryMark = a.IsDBNull(10) ? string.Empty : a.GetString(10);
                    }
                }
                if (a.NextResult())
                {
                    dto.List = new List<PlanPointItemViewModel>();
                    while (a.Read())
                    {
                        dto.List.Add(new PlanPointItemViewModel()
                        {
                            PlanPointsID = a.GetInt64(0),
                            ParentID = a.IsDBNull(1) ? 0 : a.GetInt64(1),
                            IsShow = a.GetBoolean(2),
                            IsRoot = a.GetBoolean(3),
                            IsLeaf = a.GetBoolean(4),
                            CurrentLever = a.GetByte(5),
                            IsHas = a.GetBoolean(6),
                            PointID = a.GetString(7),
                            PointName = a.GetString(8),
                            PointIndex = a.GetInt32(9)
                        });
                    }
                }
                if (a.NextResult())
                {
                    dto.Items = new List<PlanItemViewModel>();
                    while (a.Read())
                    {
                        dto.Items.Add(new PlanItemViewModel()
                        {
                            //DetailID = a.GetInt64(0),
                            PlanPointsID = a.GetInt64(0),
                            PointType = a.GetByte(1),
                            T = a.GetString(2)
                            //ItemID = a.GetInt32(3),
                            //ItemIndex = a.GetInt32(4),
                        });
                    }
                }
                return null;
            }, sqlParameter);
            return dto;
        }
        #endregion

        #region 获取教师阶段科目对应
        /// <summary>
        ///获取教师阶段科目对应
        /// </summary>
        public List<EI_ManRelSta> GetModelList(string tid)
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select StageID,SubjectID,MaterialID, ");
            #region 科目
            strSql.Append(" CASE WHEN SubjectID=1 THEN '语文' ");
            strSql.Append(" WHEN SubjectID=2 THEN '数学' ");
            strSql.Append(" WHEN SubjectID=3 THEN '英语' ");
            strSql.Append(" WHEN SubjectID=4 THEN '物理' ");
            strSql.Append(" WHEN SubjectID=5 THEN '化学' ");
            strSql.Append(" WHEN SubjectID=6 THEN '地理' ");
            strSql.Append(" WHEN SubjectID=7 THEN '历史' ");
            strSql.Append(" WHEN SubjectID=8 THEN '政治' ");
            strSql.Append(" WHEN SubjectID=9 THEN '生物' ");
            strSql.Append(" ELSE '' END SubjectName, ");
            #endregion

            #region 排序
            strSql.Append(" CASE WHEN SubjectID=1 THEN 2 ");
            strSql.Append(" WHEN SubjectID=2 THEN 1 ");
            strSql.Append(" WHEN SubjectID=3 THEN 3 ");
            strSql.Append(" WHEN SubjectID=4 THEN 4 ");
            strSql.Append(" WHEN SubjectID=5 THEN 5 ");
            strSql.Append(" WHEN SubjectID=6 THEN 6 ");
            strSql.Append(" WHEN SubjectID=7 THEN 7 ");
            strSql.Append(" WHEN SubjectID=8 THEN 8 ");
            strSql.Append(" WHEN SubjectID=9 THEN 9 ");
            strSql.Append(" ELSE '' END OrderIndex ");
            #endregion


            strSql.Append(" from EI_ManRelSta ");
            strSql.Append(" where TID=@TID ");
            strSql.Append(" ORDER BY OrderIndex  ");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40)          };
            parameters[0].Value = tid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_ManRelSta>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 保存需求设置
        /// <summary>
        /// 保存需求设置
        /// </summary>
        /// <param name="model"></param>
        /// <param name="planID"></param>
        /// <returns></returns>
        public bool SavePlan(FirstStepModel model)
        {

            //-- <Plan PlanID="1" PlanName="" PlanNumber="5" TeachSituation="1" StageID="" GradeID=""  SubjectID="" MaterialID="" MaterialName="" ></Plan>
            //-- <Mapping SourceType="2" SouceID="123" OrgID="1" TID="123" IsTest="1" IsEdit="0" IsEffect="0" ></Mapping>
            //-- PlanID:0返回值
            //-- ReturnValue：1为操作成功；2为异常
            //IN `MappingXML` text, IN `PlanXML`  text,OUT `PlanID` bigint,OUT `ReturnValue` tinyint


            string PlanXML =
                string.Format(
                    "<Plan PlanID=\"{0}\" PlanName=\"{1}\" PlanNumber=\"{2}\" TeachSituation=\"{3}\" StageID=\"{4}\" GradeID=\"{5}\"  SubjectID=\"{6}\" MaterialID=\"{7}\" MaterialName=\"{8}\" BookID=\"{9}\" BookName=\"{10}\"></Plan>",
                    model.PlanID, model.PlanName, model.PlanNumber, model.TeachSituation, model.StageID, model.GradeID, model.SubjectID, model.MaterialID, model.MaterialName, model.BookID, model.BookName);

            //SourceType 0为模板；1为学生；2为组； SouceID 用户ID或组ID OrgID 机构ID TID IsTest 是否有测评数据：1有；0无
            string MappingXML = string.Format("<Mapping SourceType=\"{0}\" SouceID=\"{1}\" OrgID=\"{2}\" TID=\"{3}\" IsTest=\"{4}\" IsEdit=\"{5}\" IsEffect=\"{6}\" ></Mapping>", model.SourceType, model.SouceID, model.OrgID, model.TID, model.IsTest, model.IsEdit, model.IsEffect);

            int ReturnValue = 0;

            string sql = string.Format(@"SET @MappingXML:='{0}';
                                         SET @PlanXML:='{1}';
                                         SET @PlanID:={2};
                                         SET @ReturnValue:={3};
                                         CALL CreatePlan(@MappingXML,@PlanXML,@PlanID,@ReturnValue);
                                         SELECT @PlanID,@ReturnValue;", MappingXML, PlanXML, model.PlanID, ReturnValue);
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            model.PlanID = a.GetInt64(0);
                            ReturnValue = a.GetInt32(1);
                        }
                    }
                },
          null
          )
            ;
            return ReturnValue == 1;
        }
        #endregion


        #region 获取课程规划
        /// <summary>
        /// 获取课程规划
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEdit"></param>
        /// <returns></returns>
        public List<SecondStepModel> GetPlan_Index_PointDraft(Int64 planID, int IsEffect)
        {
            int ReturnValue = 0;
            ReturnValue = InitData(planID, IsEffect);


            List<SecondStepModel> list = new List<SecondStepModel>();
            if (ReturnValue == 1)
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append(@"  SELECT                b.PlanIndexID,a.PlanID,b.NumberName,b.INumber,a.IsEdit,a.IsEffect,c.PlanPointsID,c.PointID,c.PointName,c.PointIndex,
                  c.IsRoot,b.IndexStatus,c.ParentID,a.StageID,a.GradeID,a.SubjectID,c.IsEffect p_IsEffect,a.SourceType,a.SouceID,d.TeachSituation,d.BookID,b.IsInit,c.CurrentLever
                                  from ei_plan_mapping a 
                                  INNER JOIN ei_plan_draft d on a.PlanID=d.PlanID         
                                  INNER JOIN ei_plan_index_draft b on a.PlanID=b.PlanID
                                  LEFT JOIN ei_plan_points_draft c on b.PlanIndexID=c.PlanIndexID  
                                  WHERE a.PlanID=@PlanID AND b.IsEffect=1
                                  Order by b.INumber,c.PointIndex ");

                List<MySqlParameter> parameters = new List<MySqlParameter>()
                    {
                        new MySqlParameter("@PlanID", MySqlDbType.Int64){ Direction=ParameterDirection.InputOutput, Value=planID}
                    };

                MySQLHelper.ExecuteStatementList(strSql.ToString(),
                 (a) =>
                 {
                     while (a.Read())
                     {
                         list.Add(new SecondStepModel()
                         {
                             PlanIndexID = a.GetInt64(0),
                             PlanID = a.GetInt64(1),
                             NumberName = a.GetString(2),
                             INumber = a.GetInt16(3),
                             IsEdit = a.GetBoolean(4) ? 1 : 0,
                             IsEffect = a.GetBoolean(5) ? 1 : 0,

                             PlanPointsID = a.IsDBNull(6) ? -1 : a.GetInt64(6),
                             PointID = a.IsDBNull(7) ? "" : a.GetString(7),
                             PointName = a.IsDBNull(8) ? "" : a.GetString(8),
                             PointIndex = a.IsDBNull(9) ? -1 : a.GetInt32(9),
                             IsRoot = a.IsDBNull(10) ? 1 : a.GetBoolean(10) ? 1 : 0,//是否根节点：1是；0否
                             IndexStatus = a.GetByte(11), //状态：0末开始；1进行中；2已完成
                             ParentID = a.IsDBNull(12) ? -1 : a.GetInt64(12),

                             StageID = a.GetInt32(13),
                             GradeID = a.GetInt32(14),
                             SubjectID = a.GetInt32(15),
                             P_IsEffect = a.IsDBNull(16) ? 0 : a.GetBoolean(16) ? 1 : 0,
                             SourceType = a.GetByte(17),
                             SouceID = a.GetString(18),
                             TeachSituation = a.GetByte(19),//教学情境：1同步教学；2综合复习；
                             BookID = a.GetString(20),
                             IsInit = a.IsDBNull(21) ? 0 : (a.GetBoolean(21) ? 1 : 0),
                             CurrentLever = a.GetByte(22)
                         });
                     }
                 }, parameters
                );

            }
            return list;
        }
        #endregion

        #region 保存课程规划
        /// <summary>
        /// 保存课程规划
        /// </summary>
        /// <param name="modelList"></param>
        /// <param name="planID"></param>
        /// <returns></returns>
        public bool SavePlan_Index_Point(List<SecondStepModel> modelList)
        {
            //-- PlanID:0 
            //-- <TidXML TID="123" OrgID="1" IsEdit="0" IsEffect="0"></TidXML>
            /*
                T:1为新增；0为删除；2为排序变化
                <PointXML>
                    <Item PointID="123" PointName="数一数" PointIndex="1" PlanIndexID="23" T="1"></Item>
                    <Item PointID="31" PointName="数一数" PointIndex="2" PlanIndexID="23" T="2"></Item>
                    <Item PointID="45" PointName="数一数" PointIndex="3" PlanIndexID="23" T="0"></Item>
                </PointXML>
            */

            //-- ReturnValue：1为操作成功；2为异常
            //IN `PlanID` bigint,IN `TidXML` text,IN `PointXML` text,OUT `ReturnValue` tinyint


            string TidXML =
               string.Format(
                   "<TidXML TID=\"{0}\" OrgID=\"{1}\" IsEdit=\"{2}\" IsEffect=\"{3}\"></TidXML>",
                    modelList[0].TID, modelList[0].OrgID, modelList[0].IsEdit, modelList[0].IsEffect);


            StringBuilder PointXML = new StringBuilder();
            PointXML.Append("<PointXML>");
            foreach (var item in modelList)
            {
                PointXML.AppendFormat("<Item PointID=\"{0}\" PointName=\"{1}\" PointIndex=\"{2}\" PlanIndexID=\"{3}\" T=\"{4}\"></Item>", item.PointID, item.PointName, item.PointIndex, item.PlanIndexID, item.T);
            }
            PointXML.Append("</PointXML>");




            int ReturnValue = 0;

            string sql = string.Format(@"SET @PlanID:={0};
                                         SET @TidXML:='{1}';
                                         SET @PointXML:='{2}';
                                         SET @ReturnValue:={3};
                                         CALL CreatePoint(@PlanID,@TidXML,@PointXML,@ReturnValue);
                                         SELECT @ReturnValue;", modelList[0].PlanID, TidXML, PointXML, ReturnValue);
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            ReturnValue = a.GetInt32(0);
                        }
                    }
                },
          null
          )
            ;
            return ReturnValue == 1;


        }
        #endregion


        #region 获取设计教案详情
        /// <summary>
        /// 获取设计教案详情
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        public PlanIndexViewModel GetPlanIndex(PlanParaViewModel para)
        {
            PlanIndexViewModel dto = new PlanIndexViewModel();
            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@PlanIndexID", MySqlDbType.Int64,11){ Direction=ParameterDirection.InputOutput, Value=para.PlanIndexID}
            };
            StringBuilder sql = new StringBuilder();
            sql.Append(@" SELECT DiffLever, ItemNumber,PlanLever,CourseLever,IsInit from ei_plan_index  WHERE PlanIndexID=@PlanIndexID ;");
            MySQLHelper.ExecuteStatementList(sql.ToString(), a =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.DiffLever = a.IsDBNull(0) ? (byte)0 : a.GetByte(0);
                        dto.ItemNumber = a.IsDBNull(1) ? 0 : a.GetInt32(1);
                        dto.PlanLever = a.IsDBNull(2) ? (byte)0 : a.GetByte(2);
                        dto.CourseLever = a.IsDBNull(3) ? (byte)0 : a.GetByte(3);
                        dto.IsInit = a.IsDBNull(4) ? 0 : (a.GetBoolean(4) ? 1 : 0);
                    }
                }
            }, sqlParameter);
            return dto;
        }
        #endregion

        #region 保存预览
        /// <summary>
        /// 保存预览
        /// </summary>
        /// <param name="modelList">PointXML</param>
        /// <param name="IndexStatusList">IndexXML</param>
        /// <returns></returns>
        public bool SavePlan_Index_Point_3(List<SecondStepModel> modelList, List<SecondStepModel> IndexStatusList)
        {
            //-- PlanID:0 
            //-- <TidXML TID="123" OrgID="1" IsEdit="0" IsEffect="0"></TidXML>
            //    /*
            //        T:1为新增；0为删除；2为排序变化
            //        <PointXML>
            //            <Item PointID="123" PointName="数一数" PointIndex="1" PlanIndexID="23" PlanPointsID="1" IsEffect="1" T="1"></Item>
            //            <Item PointID="31" PointName="数一数" PointIndex="2" PlanIndexID="23" PlanPointsID="2" IsEffect="1" T="2"></Item>
            //            <Item PointID="45" PointName="数一数" PointIndex="3" PlanIndexID="23" PlanPointsID="2" IsEffect="0" T="0"></Item>
            //        </PointXML>
            //    */

            /*
                T:2为状态变化
                <IndexXML>
                    <Item PlanIndexID="2" IndexStatus="2" T="2"></Item>
                </IndexXML>
            */

            //-- ReturnValue：1为操作成功；2为异常
            //IN `PlanID` bigint,IN `TidXML` text,IN `PointXML` text,IN`IndexXML` text,OUT `ReturnValue` tinyint



            #region TidXML

            string TidXML = "";
            if (modelList.Count > 0)
            {
                TidXML =
                    string.Format(
                        "<TidXML TID=\"{0}\" OrgID=\"{1}\" IsEdit=\"{2}\" IsEffect=\"{3}\"></TidXML>",
                        modelList[0].TID, modelList[0].OrgID, modelList[0].IsEdit, modelList[0].IsEffect);
            }
            else
            {
                TidXML =
                   string.Format(
                       "<TidXML TID=\"{0}\" OrgID=\"{1}\" IsEdit=\"{2}\" IsEffect=\"{3}\"></TidXML>",
                       IndexStatusList[0].TID, IndexStatusList[0].OrgID, IndexStatusList[0].IsEdit, IndexStatusList[0].IsEffect);
            }

            #endregion


            #region PointXML
            StringBuilder PointXML = new StringBuilder();
            PointXML.Append("<PointXML>");
            foreach (var item in modelList)
            {
                PointXML.AppendFormat("<Item PointID=\"{0}\" PointName=\"{1}\" PointIndex=\"{2}\" PlanIndexID=\"{3}\" PlanPointsID=\"{4}\" IsEffect=\"{5}\" T=\"{6}\"></Item>", item.PointID, item.PointName, item.PointIndex, item.PlanIndexID, item.PlanPointsID, item.P_IsEffect, item.T);
            }
            PointXML.Append("</PointXML>");
            #endregion

            #region IndexXML
            StringBuilder IndexXML = new StringBuilder();
            IndexXML.Append("<IndexXML>");
            foreach (var item in IndexStatusList)
            {
                IndexXML.AppendFormat("<Item PlanIndexID=\"{0}\" IndexStatus=\"{1}\" T=\"2\"></Item>", item.PlanIndexID, item.IndexStatus);
            }
            IndexXML.Append("</IndexXML>");
            #endregion


            int ReturnValue = 0;

            string sql = string.Format(@"SET @PlanID:={0};
                                         SET @TidXML:='{1}';
                                         SET @PointXML:='{2}';
                                         SET @IndexXML:='{3}';
                                         SET @ReturnValue:={4};
                                         CALL CreatePreview(@PlanID,@TidXML,@PointXML,@IndexXML,@ReturnValue);
                                         SELECT @ReturnValue;", modelList.Count > 0 ? modelList[0].PlanID : IndexStatusList[0].PlanID, TidXML, PointXML, IndexXML, ReturnValue);
            MySQLHelper.ExecuteStatementList(sql,
                (a) =>
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            ReturnValue = a.GetInt32(0);
                        }
                    }
                },
          null
          )
            ;
            return ReturnValue == 1;


        }




        #endregion

        #region 删除草稿箱
        /// <summary>
        /// 删除草稿箱
        /// </summary>
        /// <param name="planID"></param>
        /// <returns></returns>
        public bool DeleteDraft(Int64 planID)
        {

            List<MySqlParameter> sqlParameter = new List<MySqlParameter>()
            {
              new MySqlParameter("@PlanID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=planID},
              new MySqlParameter("@ReturnValue", MySqlDbType.Byte){ Direction=ParameterDirection.Output},
            };
            MySQLHelper.ExecuteStatement(@"DeletePlan", sqlParameter, CommandType.StoredProcedure);
            return Convert.ToByte(sqlParameter[1].Value.ToString()) == 1;
        }


        #endregion



        /// <summary>
        /// 插入试题
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ScreeningQuestionAdd(ei_plan_details model)
        {

            string sql = @"INSERT into ei_plan_details(PlanID,ItemIndex,ItemID,PointType,PlanPointsID,IsEffect,CreateTime )
            VALUE (@PlanID,@ItemIndex,@ItemID,@PointType,@PlanPointsID,@IsEffect,NOW())";
            MySqlParameter[] param = new MySqlParameter[] {
             new MySqlParameter("@PlanID",model.PlanID),
             new MySqlParameter("@ItemIndex",model.ItemIndex),
             new MySqlParameter("@ItemID",model.ItemID),
             new MySqlParameter("@PointType",model.PointType),
             new MySqlParameter("@PlanPointsID",model.PlanPointsID),
             new MySqlParameter("@IsEffect",model.IsEffect)


            };
            return MySQLHelper.ExecuteSql(sql, param);

        }

        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ScreeningQuestionDel(ei_plan_details model)
        {

            string sql = @" DELETE from ei_plan_details  where PlanID=@PlanID and ItemID=@ItemID and PlanPointsID=@PlanPointsID and PointType=@PointType";
            MySqlParameter[] param = new MySqlParameter[] {
              new MySqlParameter("@PlanID",model.PlanID),
              new MySqlParameter("@ItemID",model.ItemID),
              new MySqlParameter("@PlanPointsID",model.PlanPointsID) ,
               new MySqlParameter("@PointType",model.PointType)


            };
            return MySQLHelper.ExecuteSql(sql, param);

        }

        /// <summary>
        /// 获取所有科目信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Subject> GetAllSubject()
        {
            string sql = "select ID,SubjectCode,`Subject`,IsXOpen,IsCOpen,IsGOpen,CreateTime,DelFlag,Remark from ei_subject;";

            MySqlDataReader dr = MySQLHelper.ExecuteReader(sql);
            List<EI_Subject> list = new List<EI_Subject>();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    EI_Subject model = new EI_Subject();

                    model.ID = dr.GetInt32(0);
                    model.SubjectCode = dr.GetInt32(1);
                    model.Subject = dr.IsDBNull(2) ? string.Empty : dr.GetString(2);
                    model.IsXOpen = dr.GetBoolean(3);
                    model.IsCOpen = dr.GetBoolean(4);
                    model.IsGOpen = dr.GetBoolean(5);
                    model.CreateTime = dr.GetDateTime(6);
                    model.DelFlag = dr.GetInt32(7);
                    model.Remark = dr.IsDBNull(8) ? string.Empty : dr.GetString(8);
                    list.Add(model);


                }


            }

            return list;


            //return MySQLHelper.ExecuteStatement<EI_Subject>(sql, p => new EI_Subject
            //{
            //    ID = p.IsDBNull(0) ? 0 : p.GetInt32(0),
            //    SubjectCode = p.IsDBNull(1) ? 0 : p.GetInt32(1),
            //    Subject = p.IsDBNull(2) ? string.Empty : p.GetString(2),
            //    IsXOpen = p.IsDBNull(3) ? (byte)0 : p.GetByte(3),
            //    IsCOpen = p.IsDBNull(4) ? (byte)0 : p.GetByte(4),
            //    IsGOpen = p.IsDBNull(5) ? (byte)0 : p.GetByte(5),
            //    CreateTime = p.IsDBNull(6) ? DateTime.MinValue : p.GetDateTime(6),
            //    DelFlag = p.IsDBNull(7) ? 0 : p.GetInt32(7),
            //    Remark = p.IsDBNull(8) ? string.Empty : p.GetString(8)

            //}, null);
        }

        public int getCount(long PlanPointsID)
        {
            string sql = "select count(1) from ei_plan_details where PlanPointsID=@PlanPointsID";

            object result = MySQLHelper.GetSingle(sql, new MySqlParameter("@PlanPointsID", PlanPointsID));
            if (result == null)
                return 0;
            return int.Parse(result.ToString());
        }

    }
}
