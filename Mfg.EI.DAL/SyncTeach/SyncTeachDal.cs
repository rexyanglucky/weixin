using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.DAL
{
    public class SyncTeachDal
    {

        public SyncTeachModel GetTeach(SyncTeachModel dto)
        {
            SyncTeachModel list = new SyncTeachModel();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT a.AcaStru,a.ArtSciences,b.MaterialID,a.IsTeach,a.OrgID,c.Mversion FROM EI_ManagerInfo a 
LEFT JOIN EI_ManRelSta b ON a.AccountNumber=b.TID
LEFT join ei_material c on b.MaterialID=c.id
WHERE a.AccountNumber=@AccountNumber AND b.StageID=@StageID AND b.SubjectID=@SubjectID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@AccountNumber", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.UID} ,
              new MySqlParameter("@StageID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.StageID},
              new MySqlParameter("@SubjectID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.SubjectID}
            };
            list = MySQLHelper.ExecuteStatement<SyncTeachModel>(strSql.ToString(), (a) =>
            {
                return new SyncTeachModel()
                {
                    UID = dto.UID,
                    AcaStru = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    ArtSciences = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    MaterialID = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    IsTeach = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    OrgID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    Mversion = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                    StageID = dto.StageID,
                    SubjectID = dto.SubjectID
                };
            }, parameters).FirstOrDefault();
            return list;
        }

        public string SaveJob(SyncTeachInitModel initModel)
        {
            initModel.dto.DelFlag = 1;
            StringBuilder strSql = new StringBuilder();
            //添加主信息
            //strSql.Append(@"INSERT INTO EI_Job(ID,NAME,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,StageID) VALUES(");
            //strSql.AppendFormat(@"'{0}','{1}',{2},{3},'{4}',{5},'{6}','{7}',{8},{9});",
            //    initModel.dto.ID, initModel.dto.Name, initModel.dto.GradeID, initModel.dto.SubjectID, initModel.dto.EndTime, initModel.dto.State,
            //    initModel.dto.TID, initModel.dto.CreateTime, initModel.dto.DelFlag, initModel.dto.StageID);
            ////添加作业
            //strSql.Append(@"INSERT INTO EI_JRelI(ID,JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score,DiffNum,PID) VALUES ");
            //var list = initModel.StrB;
            //for (int i = 0; i < list.Count; i++)
            //{
            //    if (i == 0) strSql.AppendFormat(@"('{0}','{1}','{2}',{3},{4},{5},'{6}',{7},{8},{9},'{10}')",
            //        Guid.NewGuid(), list[i].JID, i + 1, list[i].ItemID, list[i].ItemType, list[i].KnowledgeID, list[i].KnowledgeName, list[i].ItemSourceType, list[i].Score, list[i].DiffNum, list[i].PID);
            //    else strSql.AppendFormat(@",('{0}','{1}','{2}',{3},{4},{5},'{6}',{7},{8},{9},'{10}')",
            //        Guid.NewGuid(), list[i].JID, i + 1, list[i].ItemID, list[i].ItemType, list[i].KnowledgeID, list[i].KnowledgeName, list[i].ItemSourceType, list[i].Score, list[i].DiffNum, list[i].PID);
            //}
            //strSql.Append(@";");

            strSql.Append(@"INSERT INTO ei_jobbook(ID,`Name`,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare) VALUES(");
            strSql.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}',0,0,1,0);",
                initModel.dto.ID, initModel.dto.Name, initModel.dto.TID, initModel.dto.StageID, initModel.dto.GradeID, initModel.dto.SubjectID, initModel.dto.CreateTime, initModel.dto.CreateTime);
            //添加作业
            strSql.Append(@"INSERT INTO ei_jbookreli(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID) VALUES ");
            var list = initModel.StrB;
            for (int i = 0; i < list.Count; i++)
            {
                if (i == 0)
                    strSql.AppendFormat(@"('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}')",
            Guid.NewGuid(), list[i].JID, list[i].KnowledgeID, list[i].KnowledgeName, list[i].ItemID, list[i].ItemType, list[i].ItemSourceType, i + 1, list[i].Score, list[i].DiffNum, list[i].PID);
                else
                    strSql.AppendFormat(@",('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}')",
                   Guid.NewGuid(), list[i].JID, list[i].KnowledgeID, list[i].KnowledgeName, list[i].ItemID, list[i].ItemType, list[i].ItemSourceType, i + 1, list[i].Score, list[i].DiffNum, list[i].PID);
            }
            strSql.Append(@";");

            //            strSql.AppendFormat(@"INSERT INTO ei_jobbook(ID,`Name`,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare)
            //SELECT ID,`Name`,TID,StageID,GradeID,SubjectID,now(),NOW(),0,0,1,0 from ei_job
            //WHERE ID='{0}';
            //INSERT INTO ei_jbookreli(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)
            //SELECT  UUID(),'{0}',KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID from ei_jreli
            //WHERE JID='{0}';", initModel.dto.ID);
            //            strSql.AppendFormat(@"delete from EI_Job where id='{0}'", initModel.dto.ID);
            if (MySQLHelper.ExecuteSql(strSql.ToString()) > 0)
                return initModel.dto.ID;
            else
                return (1).ToString();
        }


        public string SavePoint(KnowledgePoint dto)
        {

            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@PointID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dto.PointID},
              new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.OrgID}
            };

            sql.Append(@"SELECT EditTargetCount,EditDescriptionCount,WorkID from  ei_knowledgepoint WHERE PointID=@PointID and SubjectID=@SubjectID and OrgID=@OrgID;");

            var isExist = false;//是否存在数据

            MySQLHelper.ExecuteStatement<Int32>(sql.ToString(), (a) =>
            {

                dto.EditTargetCount = a.IsDBNull(0) ? (Int32)0 : a.GetInt32(0);
                dto.EditDescriptionCount = a.IsDBNull(1) ? (Int32)0 : a.GetInt32(1);
                dto.WorkID = a.IsDBNull(0) ? (Int64)0 : a.GetInt64(2);
                isExist = true;
                return 0;
            }, parameters);

            parameters.AddRange(new List<MySqlParameter>()
            {
              new MySqlParameter("@KnowledgeId", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.KnowledgeId},


              new MySqlParameter("@PointName",MySqlDbType.VarChar,200){ Direction=ParameterDirection.InputOutput,Value=dto.PointName},
              new MySqlParameter("@TID",MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.TID},
              new MySqlParameter("@CreateTime",MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput,Value=dto.CreateTime},
              new MySqlParameter("@IsUpDown",MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput,Value=dto.IsUpDown},

              new MySqlParameter("@StageID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.StageID},
              new MySqlParameter("@GradeID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.GradeID},

              new MySqlParameter("@Acastru",MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput,Value=dto.Acastru},
              new MySqlParameter("@Artsciences",MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput,Value=dto.Artsciences},

              new MySqlParameter("@Edition",MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput,Value=dto.Edition},

              new MySqlParameter("@LearningTarget",MySqlDbType.Text,-1){ Direction=ParameterDirection.InputOutput,Value=dto.LearningTarget},
              new MySqlParameter("@LearningDescription",MySqlDbType.Text,-1){ Direction=ParameterDirection.InputOutput,Value=dto.LearningDescription},

              new MySqlParameter("@EditTargetCount",MySqlDbType.Int16,11){ Direction=ParameterDirection.InputOutput,Value=dto.EditTargetCount+1},
              new MySqlParameter("@EditDescriptionCount",MySqlDbType.Int16,11){ Direction=ParameterDirection.InputOutput,Value=dto.EditDescriptionCount+1},

              new MySqlParameter("@WorkID",MySqlDbType.Int64,50){ Direction=ParameterDirection.InputOutput,Value=dto.WorkID},
            });

            sql.Clear();//清空上次脚本

            if (dto.ActionStaus == 1)//学习目标
            {
                if (isExist)//修改
                {
                    sql.Append(@"update ei_knowledgepoint set LastTID=@TID,LastEditTime=@CreateTime,LearningTarget=@LearningTarget,EditTargetCount=EditTargetCount+1 where WorkID=@WorkID;");
                    sql.Append(@"INSERT INTO ei_knowledgepoint_history (KnowledgeId,PointName, PointID,SubjectID,OrgID,TID, CreateTime, LearningTarget, ActionStaus,WorkID) VALUES ");
                    sql.Append(@"(@KnowledgeId,@PointName,@PointID,@SubjectID,@OrgID,@TID,@CreateTime,@LearningTarget,1,@WorkID);");
                }
                else//添加
                {
                    sql.Append(@"INSERT INTO ei_knowledgepoint (PointID,SubjectID,KnowledgeId, OrgID, PointName, TID, LastTID, LastEditTime, CreateTime, IsEdit, IsEnable, IsOpen, IsUpDown, StageID, GradeID, Acastru, Artsciences, Edition, LearningTarget, EditTargetCount, EditDescriptionCount,EditExampleCount,EditWorkCount) VALUES ");
                    sql.Append(@"(@PointID,@SubjectID,@KnowledgeId,@OrgID,@PointName,@TID,@TID,@CreateTime,@CreateTime,1,1,0,@IsUpDown,@StageID,@GradeID,@Acastru,@Artsciences,@Edition,@LearningTarget,@EditTargetCount,0,0,0);");
                    sql.Append(@"INSERT INTO ei_knowledgepoint_history (KnowledgeId,PointName, PointID,SubjectID,OrgID,TID, CreateTime, LearningTarget, ActionStaus,WorkID) VALUES ");
                    sql.Append(@"(@KnowledgeId,@PointName,@PointID,@SubjectID,@OrgID,@TID,@CreateTime,@LearningTarget,1,@@identity);");
                }

            }
            else if (dto.ActionStaus == 2)//知识讲解
            {
                if (isExist)//修改
                {
                    sql.Append(@"update ei_knowledgepoint set LastTID=@TID,LastEditTime=@CreateTime,LearningDescription=@LearningDescription,EditDescriptionCount=EditDescriptionCount+1 where WorkID=@WorkID;");
                    sql.Append(@"INSERT INTO ei_knowledgepoint_history (KnowledgeId,PointName, PointID,SubjectID,OrgID, TID, CreateTime, LearningDescription, ActionStaus,WorkID) VALUES ");
                    sql.Append(@"(@KnowledgeId,@PointName,@PointID,@SubjectID,@OrgID,@TID,@CreateTime,@LearningDescription,2,@WorkID);");
                }
                else//添加
                {
                    sql.Append(@"INSERT INTO ei_knowledgepoint (PointID,SubjectID,KnowledgeId, OrgID, PointName, TID, LastTID, LastEditTime, CreateTime, IsEdit, IsEnable, IsOpen, IsUpDown, StageID, GradeID, Acastru, Artsciences, Edition, LearningDescription, EditTargetCount, EditDescriptionCount,EditExampleCount,EditWorkCount) VALUES ");
                    sql.Append(@"(@PointID,@SubjectID,@KnowledgeId,@OrgID,@PointName,@TID,@TID,@CreateTime,@CreateTime,1,1,0,@IsUpDown,@StageID,@GradeID,@Acastru,@Artsciences,@Edition,@LearningDescription,0,@EditDescriptionCount,0,0);");
                    sql.Append(@"INSERT INTO ei_knowledgepoint_history (KnowledgeId,PointName, PointID,SubjectID,OrgID, TID, CreateTime, LearningDescription, ActionStaus,WorkID) VALUES ");
                    sql.Append(@"(@KnowledgeId,@PointName,@PointID,@SubjectID,@OrgID,@TID,@CreateTime,@LearningDescription,2,@@identity);");
                }

            }

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameters).ToString();

        }

        public KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@PointID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dto.PointID},
              new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
              new MySqlParameter("@KnowledgeId", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.KnowledgeId},
              new MySqlParameter("@OrgID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.OrgID}
            };

            sql.Append(@"SELECT LearningTarget,LearningDescription,EditTargetCount,EditDescriptionCount,EditExampleCount,EditWorkCount,IsEditExample,IsEditWork from ei_knowledgepoint where OrgID=@OrgID and PointID=@PointID and SubjectID=@SubjectID and IsEnable=1 ;");

            sql.Append(@"SELECT b.ItemID,b.ActionStaus,b.ItemIndex from ei_knowledgepoint a INNER JOIN  ei_knowledgework_item b on a.WorkID=b.WorkID
WHERE a.OrgID=@OrgID and a.PointID=@PointID and a.SubjectID=@SubjectID order by b.ItemType,b.ItemIndex;");

            MySQLHelper.ExecuteStatementList<KnowledgeCustomerPointValue>(sql.ToString(), (a) =>
            {
                dto.PointValue = new KnowledgeCustomerPointValue();
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.PointValue.LearningTarget = a.IsDBNull(0) ? string.Empty : a.GetString(0);
                        dto.PointValue.LearningDescription = a.IsDBNull(1) ? string.Empty : a.GetString(1);
                        dto.PointValue.EditTargetCount = a.GetInt32(2);
                        dto.PointValue.EditDescriptionCount = a.GetInt32(3);
                        dto.PointValue.EditExampleCount = a.GetInt32(4);
                        dto.PointValue.EditWorkCount = a.GetInt32(5);
                        dto.PointValue.IsEditExample = a.IsDBNull(6) ? false : a.GetBoolean(6);
                        dto.PointValue.IsEditWork = a.IsDBNull(7) ? false : a.GetBoolean(7);
                    }
                }

                if (a.NextResult())
                {
                    dto.PointValue.EGValue = new List<KnowledgePointList>();
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            KnowledgePointList knowPL = new KnowledgePointList();
                            knowPL.ItemID = a.GetInt32(0);
                            knowPL.ActionStaus = a.GetByte(1);
                            knowPL.ItemIndex = a.GetInt16(2);
                            dto.PointValue.EGValue.Add(knowPL);
                        }
                    }
                }


                return dto.PointValue;

            }, parameters);

            dto.PointValue.EGWorkValue = dto.PointValue.EGValue.Where(a => a.ActionStaus == 10).ToList();
            dto.PointValue.EGValue.RemoveAll(a => a.ActionStaus == 10);

            dto.PointValue.EGValueStr = (dto.PointValue.EGValue.Count == 0 ? string.Empty : string.Join(",", dto.PointValue.EGValue.Select(a => a.ItemID)));
            dto.PointValue.EVGWorkValueStr = (dto.PointValue.EGWorkValue.Count == 0 ? string.Empty : string.Join(",", dto.PointValue.EGWorkValue.Select(a => a.ItemID)));

            return dto;
        }

        public string InitExample(KnowledgePointItem dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@PointID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dto.PointID},
              new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.OrgID}
            };

            sql.Append(@"SELECT WorkID,EditExampleCount,EditWorkCount,IsEditExample,IsEditWork from  ei_knowledgepoint WHERE PointID=@PointID and SubjectID=@SubjectID and OrgID=@OrgID;");

            var isExist = false;//是否存在数据

            var isEmptyExample = false;//对于示例，是否为NULL
            var isEmptyWork = false;//对于课后作业，是否为NULL

            MySQLHelper.ExecuteStatement<Int16>(sql.ToString(), (a) =>
            {
                dto.WorkID = a.GetInt64(0);
                dto.EditExampleCount = a.IsDBNull(1) ? (int)0 : a.GetInt32(1);
                dto.EditWorkCount = a.IsDBNull(2) ? (int)0 : a.GetInt32(2);
                dto.IsEditExample = a.IsDBNull(3) ? false : a.GetBoolean(3);
                dto.IsEditWork = a.IsDBNull(4) ? false : a.GetBoolean(4);
                isExist = true;
                isEmptyExample = a.IsDBNull(3);
                isEmptyWork = a.IsDBNull(4);
                return 0;

            }, parameters);

            parameters.AddRange(new List<MySqlParameter>()
            {
              new MySqlParameter("@KnowledgeId", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.KnowledgeId},
              new MySqlParameter("@PointName",MySqlDbType.VarChar,200){ Direction=ParameterDirection.InputOutput,Value=dto.PointName},
              new MySqlParameter("@TID",MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.TID},
              new MySqlParameter("@CreateTime",MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput,Value=dto.CreateTime},
              new MySqlParameter("@IsUpDown",MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput,Value=dto.IsUpDown},

              new MySqlParameter("@StageID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.StageID},
              new MySqlParameter("@GradeID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.GradeID},

              new MySqlParameter("@Acastru",MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput,Value=dto.Acastru},
              new MySqlParameter("@Artsciences",MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput,Value=dto.Artsciences},

              new MySqlParameter("@Edition",MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput,Value=dto.Edition},

              new MySqlParameter("@WorkID",MySqlDbType.Int64,50){ Direction=ParameterDirection.InputOutput,Value=dto.WorkID},

            });

            sql.Clear();

            if (dto.ActionStaus == 9) //示例
            {
                if (isExist)
                {
                    sql.Append(@"update ei_knowledgepoint set LastTID=@TID,LastEditTime=@CreateTime,IsEditExample=1 where WorkID=@WorkID;");

                    if (isEmptyExample)
                    {
                        if (dto.ListID != null && dto.ListID.Trim() != string.Empty)
                        {

                            sql.Append(@"INSERT INTO ei_knowledgework_item(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) VALUES ");

                            var i = 1;
                            foreach (var item in dto.ListID.Split(',').Distinct())
                            {
                                if (i == 1)
                                    sql.AppendFormat(@"({2},{0},9,{1},{3})", item.Split('-')[0], i, dto.WorkID, item.Split('-')[1]);
                                else
                                    sql.AppendFormat(@",({2},{0},9,{1},{3})", item.Split('-')[0], i, dto.WorkID, item.Split('-')[1]);
                                i++;
                            }

                            sql.AppendFormat(@";INSERT INTO ei_knowledgework_note(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) select WorkID,ItemID,ActionStaus,ItemIndex,ItemType from ei_knowledgework_item where WorkID={0} and ActionStaus=9;", dto.WorkID);
                        }
                    }

                }
                else
                {
                    sql.Append(@"INSERT INTO ei_knowledgepoint (PointID,SubjectID,KnowledgeId, OrgID, PointName, TID, LastTID, LastEditTime, CreateTime, IsEdit, IsEnable, IsOpen, IsUpDown, StageID, GradeID, Acastru, Artsciences, Edition, EditTargetCount, EditDescriptionCount,EditExampleCount,EditWorkCount,IsEditExample) VALUES ");
                    sql.Append(@"(@PointID,@SubjectID,@KnowledgeId,@OrgID,@PointName,@TID,@TID,@CreateTime,@CreateTime,1,1,0,@IsUpDown,@StageID,@GradeID,@Acastru,@Artsciences,@Edition,0,0,0,0,1);");


                    if (dto.ListID != null && dto.ListID.Trim() != string.Empty)
                    {

                        sql.Append(@"INSERT INTO ei_knowledgework_item(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) VALUES ");

                        var i = 1;
                        foreach (var item in dto.ListID.Split(',').Distinct())
                        {
                            if (i == 1)
                                sql.AppendFormat(@"(@@identity,{0},9,{1},{2})", item.Split('-')[0], i, item.Split('-')[1]);
                            else
                                sql.AppendFormat(@",(@@identity,{0},9,{1},{2})", item.Split('-')[0], i, item.Split('-')[1]);
                            i++;
                        }

                        sql.Append(@";INSERT INTO ei_knowledgework_note(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) select WorkID,ItemID,ActionStaus,ItemIndex,ItemType from ei_knowledgework_item where WorkID=@@identity and ActionStaus=9;");
                    }
                }
            }

            else if (dto.ActionStaus == 10) //课后作业
            {
                if (isExist)
                {
                    sql.Append(@"update ei_knowledgepoint set LastTID=@TID,LastEditTime=@CreateTime,IsEditWork=1 where WorkID=@WorkID;");

                    if (isEmptyWork)
                    {
                        if (dto.ListID != null && dto.ListID.Trim() != string.Empty)
                        {

                            sql.Append(@"INSERT INTO ei_knowledgework_item(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) VALUES ");

                            var i = 1;
                            foreach (var item in dto.ListID.Split(','))
                            {
                                if (i == 1)
                                    sql.AppendFormat(@"({2},{0},10,{1},{3})", item.Split('-')[0], i, dto.WorkID, item.Split('-')[1]);
                                else
                                    sql.AppendFormat(@",({2},{0},10,{1},{3})", item.Split('-')[0], i, dto.WorkID, item.Split('-')[1]);
                                i++;
                            }

                            sql.AppendFormat(@";INSERT INTO ei_knowledgework_note(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) select WorkID,ItemID,ActionStaus,ItemIndex,ItemType from ei_knowledgework_item where WorkID={0} and ActionStaus=10;", dto.WorkID);
                        }
                    }
                }
                else
                {
                    sql.Append(@"INSERT INTO ei_knowledgepoint (PointID,SubjectID,KnowledgeId, OrgID, PointName, TID, LastTID, LastEditTime, CreateTime, IsEdit, IsEnable, IsOpen, IsUpDown, StageID, GradeID, Acastru, Artsciences, Edition, EditTargetCount, EditDescriptionCount,EditExampleCount,EditWorkCount,IsEditWork) VALUES ");
                    sql.Append(@"(@PointID,@SubjectID,@KnowledgeId,@OrgID,@PointName,@TID,@TID,@CreateTime,@CreateTime,1,1,0,@IsUpDown,@StageID,@GradeID,@Acastru,@Artsciences,@Edition,0,0,0,0,1);");

                    if (dto.ListID != null && dto.ListID.Trim() != string.Empty)
                    {

                        sql.Append(@"INSERT INTO ei_knowledgework_item(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) VALUES ");

                        var i = 1;
                        foreach (var item in dto.ListID.Split(','))
                        {
                            if (i == 1)
                                sql.AppendFormat(@"(@@identity,{0},10,{1},{2})", item.Split('-')[0], i, item.Split('-')[1]);
                            else
                                sql.AppendFormat(@",(@@identity,{0},10,{1},{2})", item.Split('-')[0], i, item.Split('-')[1]);
                            i++;
                        }

                        sql.Append(@";INSERT INTO ei_knowledgework_note(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) select WorkID,ItemID,ActionStaus,ItemIndex,ItemType from ei_knowledgework_item where WorkID=@@identity and ActionStaus=10;");
                    }
                }
            }

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameters).ToString();

        }

        public List<KnowledgePointList> InitDraftData(KnowledgePointItem dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@PointID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dto.PointID},
              new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
              new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.OrgID},
              new MySqlParameter("@ActionStaus", MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput, Value=dto.ActionStaus}
            };

            sql.Append(@"SELECT WorkID from ei_knowledgepoint WHERE PointID=@PointID and SubjectID=@SubjectID and OrgID=@OrgID;");

            MySQLHelper.ExecuteStatement<Int16>(sql.ToString(), (a) =>
            {
                dto.WorkID = a.IsDBNull(0) ? (Int64)0 : a.GetInt64(0);
                return 0;

            }, parameters);

            sql.Clear();

            sql.AppendFormat(@"SELECT itemid,itemindex from ei_knowledgework_note where workid={0} and actionstaus=@ActionStaus order by ItemIndex;", dto.WorkID);

            return MySQLHelper.ExecuteStatement<KnowledgePointList>(sql.ToString(), (a) =>
               {

                   KnowledgePointList p = new KnowledgePointList();

                   p.ItemID = a.GetInt32(0);
                   p.ItemIndex = a.GetInt16(1);
                   p.ActionStaus = dto.ActionStaus;

                   return p;

               }, parameters);

        }

        public string CheckDataIndex(List<KnowledgePointList> p)
        {
            var sql = new StringBuilder();

            //List<MySqlParameter> parameters = new List<MySqlParameter>()
            //{
            //  new MySqlParameter("@WorkID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dto.WorkID},
            //  new MySqlParameter("@SubjectID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.SubjectID},
            //  new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.OrgID},
            //  new MySqlParameter("@ActionStaus", MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput, Value=dto.ActionStaus}
            //};

            if (p.Count == 0)
                return string.Empty;

            sql.Append(@"update ei_knowledgework_note a inner join (");

            int i = 0;
            foreach (var item in p)
            {
                if (i == 0)
                {
                    sql.AppendFormat(@"select {0} as WorkID,{1} as ItemID,{2} as ActionStaus,{3} as ItemIndex ", item.WorkID, item.ItemID, item.ActionStaus, item.ItemIndex);
                }
                else
                {
                    sql.AppendFormat(@" union select {0} as WorkID,{1} as ItemID,{2} as ActionStaus,{3} as ItemIndex ", item.WorkID, item.ItemID, item.ActionStaus, item.ItemIndex);
                }
                i++;
            }

            sql.Append(@") as  b on a.WorkID=b.WorkID and a.ItemID=b.ItemID and a.ActionStaus=b.ActionStaus set a.ItemIndex=b.ItemIndex");

            return MySQLHelper.ExecuteStatement(sql.ToString(), null).ToString();

        }

        public string DelDataIndex(List<KnowledgePointList> p)
        {
            var sql = new StringBuilder();

            if (p.Count == 0)
                return string.Empty;



            sql.Append(@"delete a from ei_knowledgework_note a inner join (");

            int i = 0;
            foreach (var item in p)
            {
                if (i == 0)
                {
                    sql.AppendFormat(@"select {0} as WorkID,{1} as ItemID,{2} as ActionStaus ", item.WorkID, item.ItemID, item.ActionStaus);
                }
                else
                {
                    sql.AppendFormat(@" union select {0} as WorkID,{1} as ItemID,{2} as ActionStaus ", item.WorkID, item.ItemID, item.ActionStaus);
                }
                i++;
            }

            sql.Append(@") as  b on a.WorkID=b.WorkID and a.ItemID=b.ItemID and a.ActionStaus=b.ActionStaus");

            return MySQLHelper.ExecuteStatement(sql.ToString(), null).ToString();

        }

        public List<KnowledgePointList> InitLocalData(KnowledgePointItem dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@WorkID", MySqlDbType.Int64,50){ Direction=ParameterDirection.InputOutput, Value=dto.WorkID},
              new MySqlParameter("@ActionStaus", MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput, Value=dto.ActionStaus}
            };

            sql.Append(@"SELECT itemid,itemindex from ei_knowledgework_item where workid=@WorkID and actionstaus=@ActionStaus order by ItemIndex;");

            sql.Append(@"delete from ei_knowledgework_note where workid=@WorkID and actionstaus=@ActionStaus;");

            sql.Append(@"insert into ei_knowledgework_note(WorkID,ItemID,ActionStaus,ItemIndex,ItemType,CreateTime) SELECT WorkID,ItemID,ActionStaus,ItemIndex,ItemType,CreateTime from ei_knowledgework_item where workid=@WorkID and actionstaus=@ActionStaus; ");

            return MySQLHelper.ExecuteStatement<KnowledgePointList>(sql.ToString(), (a) =>
            {

                KnowledgePointList p = new KnowledgePointList();

                p.ItemID = a.GetInt32(0);
                p.ItemIndex = a.GetInt16(1);
                p.ActionStaus = dto.ActionStaus;

                return p;

            }, parameters);
        }

        public string InitSaveData(KnowledgePointItem dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@WorkID", MySqlDbType.Int64,50){ Direction=ParameterDirection.InputOutput, Value=dto.WorkID},
              new MySqlParameter("@ActionStaus", MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput, Value=dto.ActionStaus},
              new MySqlParameter("@TID",MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.TID},
              new MySqlParameter("@CreateTime",MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput,Value=dto.CreateTime},
            };

            sql.Append(@"delete from ei_knowledgework_item where workid=@WorkID and actionstaus=@ActionStaus;");

            sql.Append(@"insert into ei_knowledgework_item(WorkID,ItemID,ActionStaus,ItemIndex,ItemType,CreateTime) SELECT WorkID,ItemID,ActionStaus,ItemIndex,ItemType,CreateTime from ei_knowledgework_note where workid=@WorkID and actionstaus=@ActionStaus; ");

            if (dto.ActionStaus == 9)
            {
                sql.Append(@"update ei_knowledgepoint set LastTID=@TID,LastEditTime=@CreateTime,IsEditExample=0,EditExampleCount=EditExampleCount+1 where WorkID=@WorkID;");

                sql.Append(@"INSERT INTO ei_knowledgepoint_history (KnowledgeId,PointName, PointID,SubjectID,OrgID,TID, CreateTime, ActionStaus,WorkID,ExampleList) ");

                sql.Append(@"select KnowledgeId,PointName, PointID,SubjectID,OrgID,TID, @CreateTime, @ActionStaus,WorkID,(SELECT GROUP_CONCAT(CONCAT(ItemID,'-',ItemType)) from ei_knowledgework_item where workid=@WorkID and actionstaus=@ActionStaus ) as ExampleList from ei_knowledgepoint where WorkID=@WorkID;");
            }
            else if (dto.ActionStaus == 10)
            {
                sql.Append(@"update ei_knowledgepoint set LastTID=@TID,LastEditTime=@CreateTime,IsEditWork=0,EditWorkCount=EditWorkCount+1 where WorkID=@WorkID;");

                sql.Append(@"INSERT INTO ei_knowledgepoint_history (KnowledgeId,PointName, PointID,SubjectID,OrgID,TID, CreateTime, ActionStaus,WorkID,WorkList) ");

                sql.Append(@"select KnowledgeId,PointName, PointID,SubjectID,OrgID,TID, @CreateTime, @ActionStaus,WorkID,(SELECT GROUP_CONCAT(CONCAT(ItemID,'-',ItemType)) from ei_knowledgework_item where workid=@WorkID and actionstaus=@ActionStaus ) as WorkList from ei_knowledgepoint where WorkID=@WorkID;");

            }

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameters).ToString();
        }

        public List<KnowledgePointList> InitShow(KnowledgePointList dto)
        {

            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@WorkID", MySqlDbType.Int64,50){ Direction=ParameterDirection.InputOutput, Value=dto.WorkID},
              new MySqlParameter("@ActionStaus", MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput, Value=dto.ActionStaus},
              new MySqlParameter("@TID",MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.T}
            };

            sql.Append(@"SELECT ItemID,ItemIndex,ItemType from ei_knowledgework_note WHERE WorkID=@WorkID AND ActionStaus=@ActionStaus;");
            sql.Append(@"SELECT AcaStru From ei_managerinfo WHERE AccountNumber=@TID;");

            List<KnowledgePointList> list = new List<KnowledgePointList>();
            MySQLHelper.ExecuteStatementList<Int64>(sql.ToString(), (a) =>
              {
                  if (a.HasRows)
                  {
                      while (a.Read())
                      {
                          list.Add(new KnowledgePointList()
                          {
                              WorkID = dto.WorkID,
                              ActionStaus = dto.ActionStaus,
                              ItemID = a.GetInt32(0),
                              ItemIndex = a.GetInt16(1),
                              ItemType = a.GetInt16(2)
                          });
                      }
                  }
                  if (a.NextResult())
                  {
                      if (a.HasRows)
                      {
                          while (a.Read())
                          {
                              dto.T = a.GetInt16(0).ToString();
                          }
                      }
                  }

                  return 0;

              }, parameters);
            return list;
        }

        public string SaveShow(KnowledgePointList dto)
        {
            var sql = new StringBuilder();

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@WorkID", MySqlDbType.Int64,50){ Direction=ParameterDirection.InputOutput, Value=dto.WorkID},
              new MySqlParameter("@ActionStaus", MySqlDbType.Byte,1){ Direction=ParameterDirection.InputOutput, Value=dto.ActionStaus},
              new MySqlParameter("@ItemID",MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=dto.ItemID},
              new MySqlParameter("@ItemIndex",MySqlDbType.Int16,11){ Direction=ParameterDirection.InputOutput,Value=dto.ItemIndex},
              new MySqlParameter("@ItemType",MySqlDbType.Int16,4){ Direction=ParameterDirection.InputOutput,Value=dto.ItemType}
            };

            if (dto.IsAddOrDel)
            {
                sql.Append(@"INSERT into ei_knowledgework_note(WorkID,ItemID,ActionStaus,ItemIndex,ItemType) VALUES(@WorkID,@ItemID,@ActionStaus,@ItemIndex,@ItemType);");
            }
            else
            {
                sql.Append(@"delete from ei_knowledgework_note where WorkID=@WorkID and ItemID=@ItemID and ActionStaus=@ActionStaus;");
            }

            return MySQLHelper.ExecuteStatement(sql.ToString(), parameters).ToString();

        }
    }
}
