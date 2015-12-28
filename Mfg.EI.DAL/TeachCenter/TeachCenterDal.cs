using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;

namespace Mfg.EI.DAL
{
    public class TeachCenterDal
    {


        /// <summary>
        /// 设计教案
        /// </summary>
        /// <param name="lessonsModel"></param>
        /// <param name="isOverride"></param>
        /// <returns></returns>
        public bool SavePrepareLessonsDetial(PrepareLessonsModel lessonsModel)
        {
            bool result = false;

            List<string> sqlList = new List<string>();
            List<MySqlParameter[]> paramList = new List<MySqlParameter[]>();

            var index = 0;
            #region 删除试题表
            string sqldel =
                string.Format(
                    "DELETE a from  ei_plan_details a  INNER JOIN ei_plan_points  b on a.PlanPointsID =b.PlanPointsID where b.PlanIndexID=@PlanIndexID{0};",
                    index);
            MySqlParameter[] sqlParameterDel =
             {
             new MySqlParameter{ParameterName = string.Format("@PlanIndexID{0}",index),DbType = DbType.Int64,Value = lessonsModel.PlanIndexID},
            };
            sqlList.Add(sqldel);
            paramList.Add(sqlParameterDel);
            #endregion
            lessonsModel.PlanPointsList.ForEach(
                     point =>
                     {
                         #region 更新知识点考法列表 ei_plan_points
                         index++;
                         if (point.CurrentLever == 2)//知识点
                         {
                             StringBuilder sqlUpdate = new StringBuilder(string.Empty);
                             #region  backup
                             //                    sqlUpdate.AppendFormat(@"
                             //                                        update ei_plan_points set 
                             //                                        
                             //	                                       -- PlanPointsID=@PlanPointsID{0},
                             //	                                       -- PlanID=@PlanID{0},
                             //	                                       -- PlanIndexID =@PlanIndexID{0},
                             //	                                       -- ParentID=@ParentID{0},
                             //	                                       -- IsShow=@IsShow{0},
                             //	                                       -- IsEffect=@IsEffect{0},
                             //	                                       -- IsRoot=@IsRoot{0},
                             //	                                       -- IsLeaf=@IsLeaf{0},
                             //	                                       -- CurrentLever=@CurrentLever{0},
                             //	                                       -- IsHas =@IsHas{0},
                             //	                                        EgNumber=@EgNumber{0},
                             //	                                        WorkNumber=@WorkNumber{0},
                             //	                                       -- PointID =@PointID{0},
                             //	                                       -- PointName =@PointName{0},
                             //	                                       -- PointIndex=@PointIndex{0},
                             //	                                       -- CreateTime=@CreateTime 
                             //                                        
                             //                                        where PlanIndexID=@PlanIndexID{0} and PointID=@PointID{0};
                             //                                       ", index);
                             #endregion
                             sqlUpdate.AppendFormat(@"
                                        update ei_plan_points set 
                                       	    EgNumber=@EgNumber{0},
	                                        WorkNumber=@WorkNumber{0},
                                            IsShow=@IsShow{0},
                                            IsLeaf=@IsLeaf{0} 
                                        where PlanIndexID=@PlanIndexID{0}
                                         and PointID=@PointID{0}
                                         and PlanPointsID=@PlanPointsID{0};
                                       ", index);

                             var isleaf = !lessonsModel.PlanPointsList.Any(m => m.ParentID == point.PlanPointsID);
                             var isshow = lessonsModel.PlanPointsList.Any(m => m.ParentID == point.PlanPointsID && m.IsShow);
                             MySqlParameter[] sqlUpdateParameters =
                        {
        new MySqlParameter{ParameterName = string.Format("@EgNumber{0}",index),DbType = DbType.Int32,Value = point.EgNumber},
        new MySqlParameter{ParameterName = string.Format("@WorkNumber{0}",index),DbType = DbType.Int32,Value =point.WorkNumber},
        new MySqlParameter{ParameterName = string.Format("@IsShow{0}",index),MySqlDbType = MySqlDbType.Bit,Value =isshow},
        new MySqlParameter{ParameterName = string.Format("@IsLeaf{0}",index),MySqlDbType = MySqlDbType.Bit,Value =isleaf},
        new MySqlParameter{ParameterName = string.Format("@PlanIndexID{0}",index),DbType=DbType.Int64,Value=lessonsModel.PlanIndexID},
        new MySqlParameter{ParameterName = string.Format("@PointID{0}",index),MySqlDbType=MySqlDbType.VarChar,Size=20, Value =point.PointID},
        new MySqlParameter{ParameterName = string.Format("@PlanPointsID{0}",index),MySqlDbType=MySqlDbType.Int64, Value =point.PlanPointsID}
                        };
                             paramList.Add(sqlUpdateParameters);
                             sqlList.Add(sqlUpdate.ToString());
                         }
                         else if (point.CurrentLever == 3) //考法
                         {
                             StringBuilder sqlInsert = new StringBuilder(string.Empty);
                             #region  插入考法列表 ei_plan_points


                             sqlInsert.AppendFormat(@"
                                                 insert into ei_plan_points_draft 
                                                     (
                                                        PlanPointsID, 
                                                        PlanID,       
                                                        PlanIndexID, 
                                                        ParentID,     
                                                        IsShow,       
                                                        IsEffect,     
                                                        IsRoot,       
                                                        IsLeaf,       
                                                        CurrentLever, 
                                                        IsHas ,       
                                                        EgNumber,     
                                                        WorkNumber,   
                                                        PointID ,     
                                                        PointName ,   
                                                        PointIndex,   
                                                        CreateTime,
                                                        OldPlanPointsID  
 
                                                     ) values( 
                        	                             @PlanPointsID{0},
                        	                             @PlanID{0},
                        	                             @PlanIndexID{0},
                        	                             @ParentID{0},
                        	                             @IsShow{0},
                        	                             @IsEffect{0},
                        	                             @IsRoot{0},
                        	                             @IsLeaf{0},
                        	                             @CurrentLever{0},
                        	                             @IsHas{0},
                        	                             @EgNumber{0},
                        	                             @WorkNumber{0},
                        	                             @PointID{0},
                        	                             @PointName{0},
                        	                             @PointIndex{0},
                        	                             @CreateTime{0},
                                                         @OldPlanPointsID{0}); ", index);
                             MySqlParameter[] sqlInsertParameters =
                        {
        new MySqlParameter{ParameterName = string.Format("@PlanPointsID{0}",index),Direction=ParameterDirection.Input, MySqlDbType = MySqlDbType.Int64,Value = 0},
        new MySqlParameter{ParameterName = string.Format("@PlanID{0}",index),MySqlDbType = MySqlDbType.Int64,Value =point.PlanID},
        new MySqlParameter{ParameterName = string.Format("@PlanIndexID{0}",index),MySqlDbType=MySqlDbType.Int64,Value=lessonsModel.PlanIndexID},
        new MySqlParameter{ParameterName = string.Format("@ParentID{0}",index),MySqlDbType=MySqlDbType.Int64, Value =point.ParentID},
        new MySqlParameter{ParameterName = string.Format("@IsShow{0}",index),MySqlDbType = MySqlDbType.Bit,Value = point.IsShow},
        new MySqlParameter{ParameterName = string.Format("@IsEffect{0}",index),MySqlDbType =MySqlDbType.Bit,Value =point.IsEffect},
        new MySqlParameter{ParameterName = string.Format("@IsRoot{0}",index),MySqlDbType=MySqlDbType.Bit,Value=point.IsRoot},
        new MySqlParameter{ParameterName = string.Format("@IsLeaf{0}",index),MySqlDbType=MySqlDbType.Bit,Value =point.IsLeaf},
        new MySqlParameter{ParameterName = string.Format("@CurrentLever{0}",index),MySqlDbType = MySqlDbType.Byte,Value = point.CurrentLever},
        new MySqlParameter{ParameterName = string.Format("@IsHas{0}",index),MySqlDbType = MySqlDbType.Bit,Value =point.IsHas},
        new MySqlParameter{ParameterName = string.Format("@EgNumber{0}",index),MySqlDbType=MySqlDbType.Int32,Value=point.EgNumber},
        new MySqlParameter{ParameterName = string.Format("@WorkNumber{0}",index),MySqlDbType=MySqlDbType.Int32, Value =point.WorkNumber},
        new MySqlParameter{ParameterName = string.Format("@PointID{0}",index),MySqlDbType = MySqlDbType.VarChar,Size=20, Value = point.PointID},
        new MySqlParameter{ParameterName = string.Format("@PointName{0}",index),MySqlDbType =MySqlDbType.VarChar,Size=50, Value =point.PointName},
        new MySqlParameter{ParameterName = string.Format("@PointIndex{0}",index),MySqlDbType=MySqlDbType.Int32,Value=point.PointIndex},
        new MySqlParameter{ParameterName = string.Format("@CreateTime{0}",index),MySqlDbType=MySqlDbType.Datetime, Value =DateTime.Now},
        new MySqlParameter{ParameterName = string.Format("@OldPlanPointsID{0}",index),Direction=ParameterDirection.Input, MySqlDbType = MySqlDbType.Int64,Value = 0}
                        };
                             paramList.Add(sqlInsertParameters);
                             sqlList.Add(sqlInsert.ToString());
                             #endregion
                         }

                         #endregion
                         #region  插入试题 ei_plan_details

                         point.PlanQuestionItemsList.ForEach(item =>
                         {
                             index++;
                             StringBuilder sql = new StringBuilder(string.Empty);

                             if (point.CurrentLever == 2)
                             {
                                 #region insert

                                 sql.AppendFormat(@"insert into ei_plan_details 
                               (
                                   -- DetailID ,
                                   PlanID,
                                   PlanPointsID,
                                   PointType,
                                   ItemID  ,
                                   IsEffect,
                                   ItemIndex,
                                   CreateTime
                               ) VALUES 
                               (
                                    -- @DetailID,
                                     @PlanID{0},    
                                     @PlanPointsID{0},
                                     @PointType{0},   
                                     @ItemID{0},
                                      1,      
                                     @ItemIndex{0},   
                                     @CreateTime{0}
                               );", index);

                                 #endregion
                             }
                             else if (point.CurrentLever == 3)
                             {
                                 #region select
                                 sql.AppendFormat(@"insert into ei_plan_details
                                               (
                                                   PlanID,
                                                   PlanPointsID,
                                                   PointType,
                                                   ItemID  ,
                                                   IsEffect,
                                                   ItemIndex,
                                                   CreateTime
                                                ) 
                                            select 
                                            @PlanID{0} as PlanID,
                                            a.DraftID as PlanPointsID,
                                            @PointType{0} as PointType,   
                                            @ItemID{0} as ItemID,
                                             1 as IsEffect,      
                                            @ItemIndex{0} as ItemIndex,   
                                            @CreateTime{0} as CreateTime
                                            from ei_plan_points_draft a where a.PointID=@PointID{0} 
                                            and a.ParentID=@ParentID{0} and CurrentLever=3;", index);
                                 #endregion

                             }
                             #region param
                             MySqlParameter[] sqlParameters =
                                 {
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@PlanID{0}", index),
                                         DbType = DbType.Int64,
                                         Value = point.PlanID
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@PlanPointsID{0}", index),
                                         DbType = DbType.Int64,
                                         Value = point.PlanPointsID
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@PointType{0}", index),
                                         DbType = DbType.Byte,
                                         Value = item.PointType
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@ItemID{0}", index),
                                         DbType = DbType.Int32,
                                         Value = item.ItemID
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@ItemIndex{0}", index),
                                         DbType = DbType.Int32,
                                         Value = item.ItemIndex
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@CreateTime{0}", index),
                                         DbType = DbType.DateTime,
                                         Value = item.CreateTime
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@PointID{0}", index),
                                         MySqlDbType = MySqlDbType.Int64,
                                         Value = point.PointID
                                     },
                                     new MySqlParameter
                                     {
                                         ParameterName = string.Format("@ParentID{0}", index),
                                         MySqlDbType = MySqlDbType.Int64,
                                         Value = point.ParentID
                                     }
                                 };
                             #endregion
                             paramList.Add(sqlParameters);
                             sqlList.Add(sql.ToString());
                         });
                         #endregion
                     }
                     );

            #region 从草稿箱copy到正式表 并删除草稿
            index++;
            StringBuilder sqlCopy = new StringBuilder(string.Empty);
            sqlCopy.AppendFormat(
                            @"DELETE  from  ei_plan_points where PlanIndexID=@PlanIndexID{0} and CurrentLever=3;",
                            index);
            sqlCopy.AppendFormat(@"
                    INSERT INTO ei_plan_points
                                (
                                    PlanPointsID,
                                    PlanID, 
                                    PlanIndexID,
                                    ParentID, 
                                    IsShow, 
                                    IsEffect, 
                                    IsRoot, 
                                    IsLeaf,
                                    CurrentLever,
                                    IsHas,
                                    EgNumber,
                                    WorkNumber,
                                    PointID,
                                    PointName, 
                                    PointIndex, 
                                    CreateTime
                                )
                                    SELECT 
                                    a.DraftID as PlanPointsID,
                                    a.PlanID, 
                                    a.PlanIndexID,
                                    a.ParentID, 
                                    a.IsShow, 
                                    a.IsEffect, 
                                    a.IsRoot, 
                                    a.IsLeaf,
                                    a.CurrentLever,
                                    a.IsHas,
                                    a.EgNumber, 
                                    a.WorkNumber, 
                                    a.PointID, 
                                    a.PointName,
                                    a.PointIndex, 
                                    a.CreateTime 
                                    from ei_plan_points_draft a WHERE a.PlanID=@PlanID{0} and a.PlanIndexID=@PlanIndexID{0} and a.CurrentLever=3;", index);
            MySqlParameter[] sqlCopyParameters =
                        {
               new MySqlParameter{ParameterName = string.Format("@PlanID{0}",index),MySqlDbType = MySqlDbType.Int64,Value =lessonsModel.PlanID},
               new MySqlParameter{ParameterName = string.Format("@PlanIndexID{0}",index),MySqlDbType = MySqlDbType.Int64,Value =lessonsModel.PlanIndexID},
                              };
            sqlCopy.AppendFormat(@"DELETE a FROM ei_plan_points_draft a WHERE a.PlanID=@PlanID{0} and  a.CurrentLever=3;", index);
            sqlList.Add(sqlCopy.ToString());
            paramList.Add(sqlCopyParameters);
            #endregion

            #region 更新教案表  ei_plan_index
            index++;
            StringBuilder strLesson = new StringBuilder();
            #region backup
            //            strLesson.AppendFormat(
            //                            @"update ei_plan_index
            //                            set 
            //                                        -- PlanIndexID=@PlanIndexID{0},
            //                                        -- PlanID     =@PlanID{0},
            //                                        -- NumberName =@NumberName{0},
            //                                        TitleName  =@TitleName{0},
            //                                        -- IndexStatus=0,
            //                                        -- INumber    =@INumber{0},
            //                                        -- ReadNumber =@ReadNumber{0},
            //                                        -- PrintNumber=@PrintNumber{0},
            //                                        -- IsEffect   =@IsEffect{0},
            //                                        -- IsTitle    =@IsTitle{0},
            //                                        -- IsFirst    =@IsFirst{0},
            //                                        -- IsTarget   =@IsTarget{0},
            //                                        -- IsDiff     =@IsDiff{0},
            //                                        -- IsTeach    =@IsTeach{0},
            //                                        -- IsSummary  =@IsSummary{0},
            //                                        FirstMark  =@FirstMark{0},
            //                                        TargetMark =@TargetMark{0},
            //                                        DiffMark   =@DiffMark{0},
            //                                        SummaryMark=@SummaryMark{0},
            //                                        -- PrintTID   =@PrintTID{0},
            //                                        -- PrintTime  =@PrintTime{0},
            //                                        -- CreateTime =@CreateTime 
            //
            //                             where PlanIndexID=@PlanIndexID{0}", index);
            #endregion
            strLesson.AppendFormat(
                          @"update ei_plan_index
                            set 
                                       
                                        -- TitleName  =@TitleName{0},
                                        FirstMark  =@FirstMark{0},
                                        TargetMark =@TargetMark{0},
                                        DiffMark   =@DiffMark{0},
                                        SummaryMark=@SummaryMark{0},
                                        CourseLever =@CourseLever{0},
                                        DiffLever   =@DiffLever{0},
                                        PlanLever=@PlanLever{0},
                                        ItemNumber=@ItemNumber{0},
                                        IsInit=@IsInit{0},
                                        IsTeach =@IsTeach{0} 
                                        where PlanIndexID=@PlanIndexID{0};", index);
            strLesson.AppendFormat(
                          @"update ei_plan_index_draft
                                        set 
                                       
                                        -- TitleName  =@TitleName{0},
                                        FirstMark  =@FirstMark{0},
                                        TargetMark =@TargetMark{0},
                                        DiffMark   =@DiffMark{0},
                                        SummaryMark=@SummaryMark{0},
                                        CourseLever =@CourseLever{0},
                                        DiffLever   =@DiffLever{0},
                                        PlanLever=@PlanLever{0},
                                        ItemNumber=@ItemNumber{0},
                                        IsInit=@IsInit{0} ,
                                        IsTeach =@IsTeach{0} 
                                        where PlanIndexID=@PlanIndexID{0};", index);
            MySqlParameter[] strLessonParameters =
                        {
   //new MySqlParameter{ParameterName = string.Format("@TitleName{0}",index),MySqlDbType = MySqlDbType.VarChar,Size=50, Value = lessonsModel.TitleName},
   new MySqlParameter{ParameterName = string.Format("@FirstMark{0}",index),MySqlDbType = MySqlDbType.Text,Value =lessonsModel.FirstMark},
   new MySqlParameter{ParameterName = string.Format("@TargetMark{0}",index),MySqlDbType = MySqlDbType.Text,Value = lessonsModel.TargetMark},
   new MySqlParameter{ParameterName = string.Format("@DiffMark{0}",index),MySqlDbType = MySqlDbType.Text,Value =lessonsModel.DiffMark},
   new MySqlParameter{ParameterName = string.Format("@SummaryMark{0}",index),MySqlDbType = MySqlDbType.Text,Value =lessonsModel.SummaryMark},
   new MySqlParameter{ParameterName = string.Format("@PlanIndexID{0}",index),MySqlDbType = MySqlDbType.Int64,Value =lessonsModel.PlanIndexID},
   new MySqlParameter{ParameterName = string.Format("@CourseLever{0}",index),MySqlDbType = MySqlDbType.Byte,Value =lessonsModel.CourseLever},
   new MySqlParameter{ParameterName = string.Format("@DiffLever{0}",index),MySqlDbType = MySqlDbType.Byte,Value =lessonsModel.DiffLever},
   new MySqlParameter{ParameterName = string.Format("@PlanLever{0}",index),MySqlDbType = MySqlDbType.Byte,Value =lessonsModel.PlanLever},
   new MySqlParameter{ParameterName = string.Format("@ItemNumber{0}",index),MySqlDbType = MySqlDbType.Int32,Value =lessonsModel.ItemNumber},
   new MySqlParameter{ParameterName = string.Format("@IsInit{0}",index),MySqlDbType = MySqlDbType.Bit,Value =true},
   new MySqlParameter{ParameterName = string.Format("@IsTeach{0}",index),MySqlDbType = MySqlDbType.Bit,Value =true}
                        };
            sqlList.Add(strLesson.ToString());
            paramList.Add(strLessonParameters);
            #endregion
            result = MySQLHelper.ExecuteSqlTran(sqlList, paramList) > 0;
            return result;
        }

        /// <summary>
        /// 获取教案详情
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        public PrepareLessonsModel GetPrepareLessonFromDb(TeachCenterQueryModel queryModel)
        {
            StringBuilder sql = new StringBuilder();
            #region 教学计划

            sql.AppendFormat(@"select  
                             a.PlanID
                            ,a.PlanVersion
                            ,a.PlanName
                            ,a.PlanNumber
                            ,a.TeachSituation
                            ,a.StageID
                            ,a.GradeID
                            ,a.SubjectID
                            ,a.MaterialID
                            ,a.MaterialName
                            ,a.Remarks
                            ,a.CreateTime 
                            ,case 
                            when a.StageID=1 then c.IsXOpen 
                            when a.StageID=2 then c.IsCOpen
                            when a.StageID=3 then c.IsGOpen
                            end as IsHaveKfSubject
                            from ei_plan a inner join ei_plan_index b on a.PlanID=b.PlanID 
                            inner join ei_subject c on a.SubjectID=c.SubjectCode 
                            where b.PlanIndexID=@PlanIndexID;");

            #endregion

            #region 教案

            sql.AppendFormat(@"select
                             PlanIndexID
                            ,PlanID     
                            ,NumberName 
                            ,TitleName  
                            ,IndexStatus
                            ,INumber    
                            ,ReadNumber 
                            ,PrintNumber
                            ,IsEffect   
                            ,IsTitle    
                            ,IsFirst    
                            ,IsTarget   
                            ,IsDiff     
                            ,IsTeach    
                            ,IsSummary  
                            ,FirstMark  
                            ,TargetMark 
                            ,DiffMark   
                            ,SummaryMark
                            ,PrintTID   
                            ,PrintTime  
                            ,CreateTime
                            ,DiffLever
                            ,PlanLever
                            ,ItemNumber
                            ,CourseLever 
                             from ei_plan_index a where a.PlanIndexID=@PlanIndexID; ");

            #endregion

            #region 知识点 考法 列表

            sql.AppendFormat(@"select 
                            PlanPointsID 
                            ,PlanID       
                            ,PlanIndexID  
                            ,ParentID     
                            ,IsShow       
                            ,IsEffect     
                            ,IsRoot       
                            ,IsLeaf       
                            ,CurrentLever 
                            ,IsHas        
                            ,EgNumber     
                            ,WorkNumber   
                            ,PointID      
                            ,PointName    
                            ,PointIndex   
                            ,CreateTime 
                             from  ei_plan_points a where a.PlanIndexID=@PlanIndexID and a.CurrentLever<>1 and a.IsEffect=1
                               ORDER by a.PointIndex asc;
                            ");

            #endregion

            #region 试题列表
            //            sql.AppendFormat(@"select 
            //                              a.DetailID ,
            //                              a.PlanPointsID,
            //                              a.PointType,
            //                              a.ItemID  ,
            //                              a.ItemIndex,
            //                              a.CreateTime
            //                             from  ei_plan_details a 
            //                            inner join ei_plan_points b on a.PlanPointsID =b.PlanPointsID
            //                             where a.PlanIndexID=@PlanIndexID;
            //                            ");
            #endregion
            MySqlParameter sqlParameter = new MySqlParameter() { ParameterName = "@PlanIndexID", DbType = DbType.Int64, Value = queryModel.PlanIndex };
            var lessonModel = new PrepareLessonsModel();
            var eiplan = new ei_plan();
            MySQLHelper.ExecuteStatementList<PrepareLessonsModel>(sql.ToString(), a =>
            {
                #region 教学计划
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        eiplan.PlanID = a.IsDBNull(0) ? 0 : a.GetInt64(0);
                        eiplan.PlanVersion = a.IsDBNull(1) ? 0 : a.GetInt32(1);
                        eiplan.PlanName = a.IsDBNull(2) ? "" : a.GetString(2);
                        eiplan.PlanNumber = a.IsDBNull(3) ? (short)0 : a.GetInt16(3);
                        eiplan.TeachSituation = a.IsDBNull(4) ? (byte)0 : a.GetByte(4);
                        eiplan.StageID = a.IsDBNull(5) ? 0 : a.GetInt32(5);
                        eiplan.GradeID = a.IsDBNull(6) ? 0 : a.GetInt32(6);
                        eiplan.SubjectID = a.IsDBNull(7) ? 0 : a.GetInt32(7);
                        eiplan.MaterialID = a.IsDBNull(8) ? "" : a.GetString(8);
                        eiplan.MaterialName = a.IsDBNull(9) ? "" : a.GetString(9);
                        eiplan.Remarks = a.IsDBNull(10) ? "" : a.GetString(10);
                        eiplan.CreateTime = a.IsDBNull(11) ? DateTime.Now : a.GetDateTime(11);
                        eiplan.IsHaveKfSubject = a.IsDBNull(12) ? false : a.GetBoolean(12);
                    }
                    lessonModel.Plan = eiplan;
                }
                #endregion
                #region 教案
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            lessonModel.PlanIndexID = a.IsDBNull(0) ? 0 : a.GetInt64(0);
                            lessonModel.PlanID = a.IsDBNull(1) ? 0 : a.GetInt64(1);
                            lessonModel.NumberName = a.IsDBNull(2) ? string.Empty : a.GetString(2);
                            lessonModel.TitleName = a.IsDBNull(3) ? string.Empty : a.GetString(3);
                            lessonModel.IndexStatus = a.IsDBNull(4) ? (byte)0 : a.GetByte(4);
                            lessonModel.INumber = a.IsDBNull(5) ? (short)0 : a.GetInt16(5);
                            lessonModel.ReadNumber = a.IsDBNull(6) ? 0 : a.GetInt32(6);
                            lessonModel.PrintNumber = a.IsDBNull(7) ? 0 : a.GetInt32(7);
                            lessonModel.IsEffect = !a.IsDBNull(8) && a.GetBoolean(8);
                            lessonModel.IsTitle = !a.IsDBNull(9) && a.GetBoolean(9);
                            lessonModel.IsFirst = !a.IsDBNull(10) && a.GetBoolean(10);
                            lessonModel.IsTarget = !a.IsDBNull(11) && a.GetBoolean(11);
                            lessonModel.IsDiff = !a.IsDBNull(12) && a.GetBoolean(12);
                            lessonModel.IsTeach = !a.IsDBNull(13) && a.GetBoolean(13);
                            lessonModel.IsSummary = !a.IsDBNull(14) && a.GetBoolean(14);
                            lessonModel.FirstMark = a.IsDBNull(15) ? string.Empty : a.GetString(15);
                            lessonModel.TargetMark = a.IsDBNull(16) ? string.Empty : a.GetString(16);
                            lessonModel.DiffMark = a.IsDBNull(17) ? string.Empty : a.GetString(17);
                            lessonModel.SummaryMark = a.IsDBNull(18) ? string.Empty : a.GetString(18);
                            lessonModel.PrintTID = a.IsDBNull(19) ? string.Empty : a.GetString(19);
                            lessonModel.PrintTime = a.IsDBNull(20) ? string.Empty : a.GetString(20);
                            lessonModel.CreateTime = a.IsDBNull(21) ? DateTime.Now : a.GetDateTime(21);
                            lessonModel.DiffLever = a.IsDBNull(22) ? (byte)0 : a.GetByte(22);
                            lessonModel.PlanLever = a.IsDBNull(23) ? (byte)0 : a.GetByte(23);
                            lessonModel.ItemNumber = a.IsDBNull(24) ? 0 : a.GetInt32(24);
                            lessonModel.CourseLever = a.IsDBNull(25) ? (byte)0 : a.GetByte(25);
                        }
                    }
                }
                #endregion
                #region 知识点列表
                if (a.NextResult())
                {
                    var pointModels = new List<PlanPointModel>();
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            var pointModel = new PlanPointModel
                            {
                                PlanPointsID = a.IsDBNull(0) ? 0 : a.GetInt64(0),
                                PlanID = a.IsDBNull(1) ? 0 : a.GetInt64(1),
                                PlanIndexID = a.IsDBNull(2) ? 0 : a.GetInt64(2),
                                ParentID = a.IsDBNull(3) ? 0 : a.GetInt64(3),
                                IsShow = !a.IsDBNull(4) && a.GetBoolean(4),
                                IsEffect = !a.IsDBNull(5) && a.GetBoolean(5),
                                IsRoot = !a.IsDBNull(6) && a.GetBoolean(6),
                                IsLeaf = !a.IsDBNull(7) && a.GetBoolean(7),
                                CurrentLever = a.IsDBNull(8) ? (byte)0 : a.GetByte(8),
                                IsHas = !a.IsDBNull(9) && a.GetBoolean(9),
                                EgNumber = a.IsDBNull(10) ? 0 : a.GetInt32(10),
                                WorkNumber = a.IsDBNull(11) ? 0 : a.GetInt32(11),
                                PointID = a.IsDBNull(12) ? string.Empty : a.GetString(12),
                                PointName = a.IsDBNull(13) ? string.Empty : a.GetString(13),
                                PointIndex = a.IsDBNull(14) ? 0 : a.GetInt32(14),
                                CreateTime = a.IsDBNull(15) ? DateTime.Now : a.GetDateTime(15)
                            };

                            pointModels.Add(pointModel);
                        }
                    }
                    lessonModel.PlanPointsList = pointModels;
                }

                #endregion
                #region 试题列表
                //if (a.NextResult())
                //{
                //    if (a.HasRows)
                //    {
                //        while (a.Read())
                //        {
                //        }
                //    }
                //}
                #endregion

                return lessonModel;
            }, new List<MySqlParameter> { sqlParameter });

            return lessonModel;


        }


        /// <summary>
        /// 获取试题列表
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        public List<PlanQuestionItemsModel> GetPlanQuestionItemsFromDb(TeachCenterQueryModel queryModel)
        {
            StringBuilder sql = new StringBuilder();

            #region 试题列表
            sql.AppendFormat(@"select 
                              a.DetailID ,
                              a.PlanID,
                              a.PlanPointsID,
                              a.PointType,
                              a.ItemID  ,
                              a.ItemIndex,
                              a.IsEffect,
                              a.CreateTime,
                              c.SubjectID,
                              b.IsShow 
                             from  ei_plan_details a 
                            inner join ei_plan_points b on a.PlanPointsID =b.PlanPointsID 
                            inner join ei_plan c on a.PlanID=c.PlanID
                             where b.PlanIndexID=@PlanIndexID and a.IsEffect=1 ORDER BY a.ItemIndex;
                            ");
            #endregion
            MySqlParameter sqlParameter = new MySqlParameter() { ParameterName = "@PlanIndexID", DbType = DbType.Int64, Value = queryModel.PlanIndex };

            var list = MySQLHelper.ExecuteStatement(sql.ToString(), a => new PlanQuestionItemsModel()
            {
                DetailID = a.GetInt64(0),
                PlanID = a.GetInt64(1),
                PlanPointsID = a.GetInt64(2),
                PointType = a.GetByte(3),
                ItemID = a.GetInt32(4),
                ItemIndex = a.GetInt32(5),
                IsEffect = a.GetBoolean(6),
                CreateTime = a.GetDateTime(7),
                SubjectID = a.GetInt32(8),
                IsShow = a.GetBoolean(9)
            }, new List<MySqlParameter> { sqlParameter });

            return list;


        }
        #region 更新lesson

        /// <summary>
        /// 更新 指定字段 教案表
        /// </summary>
        /// <param name="lessonModel"></param>
        /// <param name="cloumns">
        /// 1 fristmark 2 targetmark 3 diffmark 4 summarymark 
        /// 5 isfirst 6 istarget 7 isdiff 8 istach 9 issummary
        /// </param>
        /// <returns></returns>
        public bool UpdateLessonData(PrepareLessonsModel lessonModel, params int[] cloumns)
        {
            //StringBuilder stringBuilder = new StringBuilder();
            //List<MySqlParameter> sqlParameters = new List<MySqlParameter>();
            //#region 拼接sql
            //stringBuilder.Append(@"update ei_plan_index set ");
            //foreach (int cloumn in cloumns)
            //{
            //    switch (cloumn)
            //    {
            //        case 1:
            //            stringBuilder.Append("FirstMark=@FirstMark,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@FirstMark",
            //                MySqlDbType = MySqlDbType.Text,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.FirstMark
            //            });

            //            break;
            //        case 2:
            //            stringBuilder.Append("TargetMark=@TargetMark,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@TargetMark",
            //                MySqlDbType = MySqlDbType.Text,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.TargetMark
            //            });


            //            break;
            //        case 3:
            //            stringBuilder.Append("DiffMark=@DiffMark,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@DiffMark",
            //                MySqlDbType = MySqlDbType.Text,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.DiffMark
            //            });
            //            break;
            //        case 4:
            //            stringBuilder.Append("SummaryMark=@SummaryMark,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@SummaryMark",
            //                MySqlDbType = MySqlDbType.Text,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.SummaryMark
            //            });
            //            break;
            //        case 5:
            //            stringBuilder.Append("IsFirst=@IsFirst,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@IsFirst",
            //                MySqlDbType = MySqlDbType.Bit,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.IsFirst
            //            });
            //            break;
            //        case 6:
            //            stringBuilder.Append("IsTarget=@IsTarget,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@IsTarget",
            //                MySqlDbType = MySqlDbType.Bit,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.IsTarget
            //            });
            //            break;
            //        case 7:
            //            stringBuilder.Append("IsDiff=@IsDiff,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@IsDiff",
            //                MySqlDbType = MySqlDbType.Bit,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.IsDiff
            //            });
            //            break;
            //        case 8:
            //            stringBuilder.Append("IsTeach=@IsTeach,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@IsTeach",
            //                MySqlDbType = MySqlDbType.Bit,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.IsTeach
            //            });


            //            break;
            //        case 9:
            //            stringBuilder.Append("IsSummary=@IsSummary,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@IsSummary",
            //                MySqlDbType = MySqlDbType.Bit,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.IsSummary
            //            });
            //            break;
            //        case 10:
            //            stringBuilder.Append("TitleName=@TitleName,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@TitleName",
            //                MySqlDbType = MySqlDbType.VarChar,
            //                Size = 50,
            //                Direction = ParameterDirection.Input,
            //                Value = lessonModel.TitleName
            //            });
            //            break;

            //    }
            //}
            //var sql = string.Empty;
            //sql = stringBuilder.ToString().TrimEnd(',') + " where PlanIndexID=@PlanIndexID ;";
            //sqlParameters.Add(new MySqlParameter()
            //{
            //    ParameterName = "@PlanIndexID",
            //    MySqlDbType = MySqlDbType.Int64,
            //    Direction = ParameterDirection.Input,
            //    Value = lessonModel.PlanIndexID
            //});

            //#endregion
            List<string> sqlList = new List<string>();
            List<MySqlParameter[]> sqlParameterList = new List<MySqlParameter[]>();
            var sqlTuple = CreateLessonSql(lessonModel, 0, false, cloumns);
            sqlList.Add(sqlTuple.Item1);
            sqlParameterList.Add(sqlTuple.Item2);
            //var sqlTuple1 = CreateLessonSql(lessonModel, 1, true, cloumns);
            // sqlList.Add(sqlTuple1.Item1);
            //sqlParameterList.Add(sqlTuple1.Item2);
            return MySQLHelper.ExecuteSqlTran(sqlList, sqlParameterList) > 0;

        }

        private Tuple<string, MySqlParameter[]> CreateLessonSql(PrepareLessonsModel lessonModel, int index, bool isdraft, params int[] cloumns)
        {
            StringBuilder stringBuilder = new StringBuilder();
            List<MySqlParameter> sqlParameters = new List<MySqlParameter>();
            #region 拼接sql
            if (isdraft)
            {
                stringBuilder.Append(@"update ei_plan_index_draft set ");

            }
            else
            {
                stringBuilder.Append(@"update ei_plan_index set ");
            }
            foreach (int cloumn in cloumns)
            {
                switch (cloumn)
                {
                    case 1:
                        stringBuilder.AppendFormat("FirstMark=@FirstMark{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@FirstMark{0}", index),
                            MySqlDbType = MySqlDbType.Text,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.FirstMark
                        });

                        break;
                    case 2:
                        stringBuilder.AppendFormat("TargetMark=@TargetMark{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@TargetMark{0}", index),
                            MySqlDbType = MySqlDbType.Text,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.TargetMark
                        });


                        break;
                    case 3:
                        stringBuilder.AppendFormat("DiffMark=@DiffMark{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@DiffMark{0}", index),
                            MySqlDbType = MySqlDbType.Text,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.DiffMark
                        });
                        break;
                    case 4:
                        stringBuilder.AppendFormat("SummaryMark=@SummaryMark{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@SummaryMark{0}", index),
                            MySqlDbType = MySqlDbType.Text,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.SummaryMark
                        });
                        break;
                    case 5:
                        stringBuilder.AppendFormat("IsFirst=@IsFirst{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@IsFirst{0}", index),
                            MySqlDbType = MySqlDbType.Bit,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.IsFirst
                        });
                        break;
                    case 6:
                        stringBuilder.AppendFormat("IsTarget=@IsTarget{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@IsTarget{0}", index),
                            MySqlDbType = MySqlDbType.Bit,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.IsTarget
                        });
                        break;
                    case 7:
                        stringBuilder.AppendFormat("IsDiff=@IsDiff{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@IsDiff{0}", index),
                            MySqlDbType = MySqlDbType.Bit,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.IsDiff
                        });
                        break;
                    case 8:
                        stringBuilder.AppendFormat("IsTeach=@IsTeach{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@IsTeach{0}", index),
                            MySqlDbType = MySqlDbType.Bit,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.IsTeach
                        });


                        break;
                    case 9:
                        stringBuilder.AppendFormat("IsSummary=@IsSummary{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@IsSummary{0}", index),
                            MySqlDbType = MySqlDbType.Bit,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.IsSummary
                        });
                        break;
                    case 10:
                        stringBuilder.AppendFormat("TitleName=@TitleName{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@TitleName{0}", index),
                            MySqlDbType = MySqlDbType.VarChar,
                            Size = 50,
                            Direction = ParameterDirection.Input,
                            Value = lessonModel.TitleName
                        });
                        break;

                }
            }
            var sql = string.Empty;
            sql = stringBuilder.ToString().TrimEnd(',') + string.Format(" where PlanIndexID=@PlanIndexID{0} ;", index);
            sqlParameters.Add(new MySqlParameter()
            {
                ParameterName = string.Format("@PlanIndexID{0}", index),
                MySqlDbType = MySqlDbType.Int64,
                Direction = ParameterDirection.Input,
                Value = lessonModel.PlanIndexID
            });

            #endregion
            return new Tuple<string, MySqlParameter[]>(sql, sqlParameters.ToArray());
        }
        #endregion

        #region 更新知识点
        /// <summary>
        /// 更新 指定字段 知识点表
        /// </summary>
        /// <param name="pointModel"></param>
        /// <param name="cloumns">
        /// 1 IsShow
        /// </param>
        /// <returns></returns>
        public bool UpdateLessonPoint(PlanPointModel pointModel, int[] cloumns)
        {
            //StringBuilder stringBuilder = new StringBuilder();
            //List<MySqlParameter> sqlParameters = new List<MySqlParameter>();
            //#region 拼接sql
            //stringBuilder.Append(@"update ei_plan_points set ");
            //foreach (int cloumn in cloumns)
            //{
            //    switch (cloumn)
            //    {
            //        case 1:
            //            stringBuilder.Append("IsShow=@IsShow,");
            //            sqlParameters.Add(new MySqlParameter()
            //            {
            //                ParameterName = "@IsShow",
            //                MySqlDbType = MySqlDbType.Bit,
            //                Direction = ParameterDirection.Input,
            //                Value = pointModel.IsShow
            //            });
            //            break;
            //    }
            //}
            //var sql = string.Empty;
            //sql = stringBuilder.ToString().TrimEnd(',') + " where PlanPointsID=@PlanPointsID ;";
            //sqlParameters.Add(new MySqlParameter()
            //{
            //    ParameterName = "@PlanPointsID",
            //    MySqlDbType = MySqlDbType.Int64,
            //    Direction = ParameterDirection.Input,
            //    Value = pointModel.PlanPointsID
            //});

            //#endregion

            //return MySQLHelper.ExecuteSql(sql, sqlParameters.ToArray()) > 0;


            List<string> sqlList = new List<string>();
            List<MySqlParameter[]> sqlParameterList = new List<MySqlParameter[]>();
            var sqlTuple = CreateLessonPointSql(pointModel, 0, false, cloumns);
            sqlList.Add(sqlTuple.Item1);
            sqlParameterList.Add(sqlTuple.Item2);
            //var sqlTuple1 = CreateLessonPointSql(pointModel, 1, true, cloumns);
            //sqlList.Add(sqlTuple1.Item1);
            //sqlParameterList.Add(sqlTuple1.Item2);
            return MySQLHelper.ExecuteSqlTran(sqlList, sqlParameterList) > 0;

        }
        /// <summary>
        /// 更新 指定字段 知识点表
        /// </summary>
        /// <param name="pointModel"></param>
        /// <param name="cloumns">
        /// 1 IsShow
        /// </param>
        /// <returns></returns>
        public bool UpdateLessonPoint(List<PlanPointModel> pointModels, int[] cloumns)
        {

            List<string> sqlList = new List<string>();
            List<MySqlParameter[]> sqlParameterList = new List<MySqlParameter[]>();
            var index = 0;
            foreach (var itemModel in pointModels)
            {
                var sqlTuple = CreateLessonPointSql(itemModel, index, false, cloumns);
                sqlList.Add(sqlTuple.Item1);
                sqlParameterList.Add(sqlTuple.Item2);
                //var sqlTuple1 = CreateLessonPointSql(itemModel, ++index, true, cloumns);
                //sqlList.Add(sqlTuple1.Item1);
                //sqlParameterList.Add(sqlTuple1.Item2);
                index++;
            }

            return MySQLHelper.ExecuteSqlTran(sqlList, sqlParameterList) > 0;
        }


        private Tuple<string, MySqlParameter[]> CreateLessonPointSql(PlanPointModel pointModel, int index, bool isdraft, params int[] cloumns)
        {
            StringBuilder stringBuilder = new StringBuilder();
            List<MySqlParameter> sqlParameters = new List<MySqlParameter>();
            #region 拼接sql
            if (isdraft)
            {

                stringBuilder.Append(@"update ei_plan_points_draft set ");
            }
            else
            {
                stringBuilder.Append(@"update ei_plan_points set ");
            }

            foreach (int cloumn in cloumns)
            {
                switch (cloumn)
                {
                    case 1:
                        stringBuilder.AppendFormat("IsShow=@IsShow{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@IsShow{0}", index),
                            MySqlDbType = MySqlDbType.Bit,
                            Direction = ParameterDirection.Input,
                            Value = pointModel.IsShow
                        });
                        break;
                }
            }
            var sql = string.Empty;
            sql = stringBuilder.ToString().TrimEnd(',') + string.Format(" where PlanPointsID=@PlanPointsID{0} ;", index);
            sqlParameters.Add(new MySqlParameter()
            {
                ParameterName = string.Format("@PlanPointsID{0}", index),
                MySqlDbType = MySqlDbType.Int64,
                Direction = ParameterDirection.Input,
                Value = pointModel.PlanPointsID
            });
            #endregion
            return new Tuple<string, MySqlParameter[]>(sql, sqlParameters.ToArray());
        }
        #endregion

        #region 更新试题表
        /// <summary>
        /// 更新 指定字段 试题表
        /// </summary>
        /// <param name="itemModel"></param>
        /// <param name="cloumns">
        /// 1 ItemIndex
        /// </param>
        /// <returns></returns>
        public bool UpdateLessonPointQuestion(PlanQuestionItemsModel itemModel, params int[] cloumns)
        {
            var sqlTuple = CreateLessonPointQuestionSql(itemModel, 0, cloumns);

            return MySQLHelper.ExecuteSql(sqlTuple.Item1, sqlTuple.Item2) > 0;
        }

        /// <summary>
        /// 更新 指定字段 试题表集合
        /// </summary>
        /// <param name="itemsModel"></param>
        /// <param name="cloumns">
        /// 1 ItemIndex
        /// </param>
        /// <returns></returns>
        public bool UpdateLessonPointQuestion(List<PlanQuestionItemsModel> itemsModel, params int[] cloumns)
        {
            List<string> sqlList = new List<string>();
            List<MySqlParameter[]> sqlParameterList = new List<MySqlParameter[]>();
            var index = 0;
            foreach (var itemModel in itemsModel)
            {
                var sqlTuple = CreateLessonPointQuestionSql(itemModel, index, cloumns);
                sqlList.Add(sqlTuple.Item1);
                sqlParameterList.Add(sqlTuple.Item2);
                index++;
            }

            return MySQLHelper.ExecuteSqlTran(sqlList, sqlParameterList) > 0;
        }

        private Tuple<string, MySqlParameter[]> CreateLessonPointQuestionSql(PlanQuestionItemsModel itemModel, int index, params int[] cloumns)
        {
            StringBuilder stringBuilder = new StringBuilder();
            List<MySqlParameter> sqlParameters = new List<MySqlParameter>();
            #region 拼接sql
            stringBuilder.Append(@"update ei_plan_details set ");
            foreach (int cloumn in cloumns)
            {
                switch (cloumn)
                {
                    case 1:
                        stringBuilder.AppendFormat("ItemIndex=@ItemIndex{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@ItemIndex{0}", index),
                            MySqlDbType = MySqlDbType.Int32,
                            Direction = ParameterDirection.Input,
                            Value = itemModel.ItemIndex
                        });
                        break;
                    case 2:
                        stringBuilder.AppendFormat("ItemID=@ItemID{0},", index);
                        sqlParameters.Add(new MySqlParameter()
                        {
                            ParameterName = string.Format("@ItemID{0}", index),
                            MySqlDbType = MySqlDbType.Int32,
                            Direction = ParameterDirection.Input,
                            Value = itemModel.ItemID
                        });
                        break;
                }
            }
            var sql = stringBuilder.ToString().TrimEnd(',') + string.Format(" where DetailID=@DetailID{0} ;", index);
            sqlParameters.Add(new MySqlParameter()
            {
                ParameterName = string.Format("@DetailID{0}", index),
                MySqlDbType = MySqlDbType.Int64,
                Direction = ParameterDirection.Input,
                Value = itemModel.DetailID
            });
            #endregion
            return new Tuple<string, MySqlParameter[]>(sql, sqlParameters.ToArray());
        }

        #endregion
        /// <summary>
        /// 该科目是否支持算法
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="stage"></param>
        public bool IsHaveKfSubject(int subject, int stage)
        {

            string sql = "select IsXOpen,IsCOpen,IsGOpen from ei_subject where SubjectCode=@SubjectCode";

            MySqlParameter sqlParameter = new MySqlParameter()
            {
                ParameterName = ("@SubjectCode"),
                MySqlDbType = MySqlDbType.Int32,
                Direction = ParameterDirection.Input,
                Value = subject
            };

            var ds = MySQLHelper.Query(sql, sqlParameter);
            var isxopen = Convert.ToBoolean(ds.Tables[0].Rows[0]["IsXOpen"]);
            var iscopen = Convert.ToBoolean(ds.Tables[0].Rows[0]["IsCOpen"]);
            var isgopen = Convert.ToBoolean(ds.Tables[0].Rows[0]["IsGOpen"]);
            switch (stage)
            {
                case 1:
                    return isxopen;
                    break;
                case 2:
                    return iscopen;
                    break;
                case 3:
                    return isgopen;
                    break;
            }

            return false;
        }


        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="detialIdList"></param>
        /// <returns></returns>
        public bool DeleteQuestionItem(List<string> detialIdList)
        {
            var sqlList = new List<string>();
            var sqlParameterList = new List<MySqlParameter[]>();
            for (int i = 0; i < detialIdList.Count; i++)
            {
                var detialId = detialIdList[i];
                string sql = string.Format("delete FROM  ei_plan_details where detailID=@detailID{0}", i);
                MySqlParameter sqlParameter = new MySqlParameter()
                {
                    ParameterName = string.Format("@detailID{0}", i),
                    MySqlDbType = MySqlDbType.Int64,
                    Direction = ParameterDirection.Input,
                    Value = detialId
                };
                sqlList.Add(sql);
                sqlParameterList.Add(new[] { sqlParameter });
            }
            return MySQLHelper.ExecuteSqlTran(sqlList, sqlParameterList) > 0;


        }
    }
}
