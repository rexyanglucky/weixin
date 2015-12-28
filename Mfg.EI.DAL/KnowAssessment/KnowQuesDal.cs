/*
 * author:谢利民;
 * function:知识测评答题表【EI_TAnswer】操作的功能
 * adddate:2015-05-22
 * updatedate:2015-05-22
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
using Mfg.EI.ViewModel;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 知识测评试题表【EI_KnowQues】新增试题操作
    /// </summary>
    public class KnowQuesDal
    {
        /// <summary>
        /// 随机生成10道题
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<KnowQuesModel> GetModelList(Dictionary<int, int> dic)
        {
            try
            {
                //通过sql语句取随机15条
                StringBuilder strBuilder = new StringBuilder();
                strBuilder.Append(@" SELECT ID,TypeID,TypeName,AnswerList,Answer FROM");
                strBuilder.Append("(SELECT ID,TypeID,TypeName,AnswerList,Answer FROM ");
                strBuilder.Append("(SELECT ID,TypeID,TypeName,AnswerList,Answer FROM EI_KnowQues WHERE TypeID=1 ORDER BY RAND() LIMIT 5) V ");
                strBuilder.Append(" UNION ALL");
                strBuilder.Append(" SELECT ID,TypeID,TypeName,AnswerList,Answer FROM ");
                strBuilder.Append(" (SELECT ID,TypeID,TypeName,AnswerList,Answer FROM EI_KnowQues WHERE TypeID=2 ORDER BY RAND() LIMIT 5)V ");
                strBuilder.Append(" UNION ALL");
                strBuilder.Append(" SELECT ID,TypeID,TypeName,AnswerList,Answer FROM ");
                strBuilder.Append("(SELECT ID,TypeID,TypeName,AnswerList,Answer FROM EI_KnowQues WHERE TypeID=3 ORDER BY RAND() LIMIT 5)V");
                strBuilder.Append(")T  ORDER BY T.ID");

                DataSet ds = MySQLHelper.Query(strBuilder.ToString());
                if (ds.Tables[0].Rows.Count > 0)
                {
                    return ModelConvertHelper<KnowQuesModel>.ConvertToModelList(ds.Tables[0]);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("随机试题出错！", ex);
                return null;
            }

        }


        /// <summary>
        /// 根据id集合取新增试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public List<KnowQuesModel> GetKnowList(string idlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Select ID,TypeID,TypeName,Body,AnswerList,Answer,ListSorce From EI_KnowQues where 1=2");
            if (idlist.Length > 0)
            {
                var strarr = idlist.Split(',');
                for (var i = 0; i < strarr.Length; i++)
                {
                    strSql.Append(" Union ALL");
                    strSql.Append(" Select ID,TypeID,TypeName,Body,AnswerList,Answer,ListSorce From EI_KnowQues Where ID=" + strarr[i] + "");
                }
            }
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<KnowQuesModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }

        }


        public List<TempStudentInfoModel> GetInit(TempStudentInfoModel para)
        {
            para.CurrentPage = para.CurrentPage < 1 ? 1 : para.CurrentPage;
            para.Text = (para.Text == "undefined" ? "" : para.Text);
            para.Text = para.Text ?? string.Empty;

            List<TempStudentInfoModel> list = new List<TempStudentInfoModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT COUNT(a.IsFile) FROM EI_TempStudentInfo a inner join EI_TestAnalyze b on a.ID=b.SID  WHERE a.TID=@TID AND a.DelFlag=0 and a.IsEffect=1 and (a.`Name` LIKE @Text or a.Adddress LIKE @Text)");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TID},
              new MySqlParameter("@PageSize", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.PageSize},
              new MySqlParameter("@CurrentPage", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=(para.CurrentPage-1)*para.PageSize},
              new MySqlParameter("@Text", MySqlDbType.VarChar,400){ Direction=ParameterDirection.InputOutput, Value="%"+ para.Text+"%"}
            };


            #region 导出未归档
            if (para.IsExport)//导出未归档
            {
                if (!string.IsNullOrEmpty(para.StarTime))
                {
                    strSql.Append(" AND date(b.CreateTime)>=@starTime ");
                    parameters.Add(new MySqlParameter("@starTime", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = para.StarTime });
                }
                if (!string.IsNullOrEmpty(para.EndTime))
                {
                    strSql.Append(" AND date(b.CreateTime)<=@endTime ");
                    parameters.Add(new MySqlParameter("@endTime", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = para.EndTime });
                }

                strSql.Append(" AND a.IsFile=0 ");

            }
            #endregion





            para.MaxCount = MySQLHelper.ExecuteStatement<Int32>(strSql.ToString(), (a) =>
             {
                 return a.GetInt32(0);
             }, parameters).FirstOrDefault();
            //分页
            strSql.Clear();

            strSql.Append(@"SELECT a.ID,a.MFGID,a.Name,b.subjectid,b.StageID,a.phone,a.trainaim,a.createtime,a.remark,a.isfile,
CASE WHEN a.MeasureVersion=0 THEN
  (SELECT SUM(ClassHour) FROM EI_TARelKno x WHERE
   x.TAID=b.ID AND x.IsUse=1
   ) else 0 END as ClassHOUR,b.ID as TAID,a.School,c.Phone,a.MeasureVersion,
CASE WHEN a.MeasureVersion=0 THEN ''
ELSE(
SELECT i.ExamName from ei_measure_exam i WHERE i.TempID=a.ID AND i.MeasureStatus=2 LIMIT 1
) END as ExamName,CASE WHEN a.MeasureVersion=0 THEN 0
else (SELECT  MeasureID from ei_measure_exam WHERE TempID=a.ID LIMIT 1) end as MeasureID,b.MeasureVersion,a.Adddress,a.Age,a.Gender
  FROM EI_TempStudentInfo a 
  INNER JOIN EI_TestAnalyze b on a.ID=b.SID
  LEFT JOIN EI_StudentInfo c on a.MFGID=c.MfgID
  WHERE a.DelFlag=0 AND a.IsEffect=1 and (a.`Name` LIKE @Text or a.Adddress LIKE @Text)  ");


            if (para.TID != 0)
            {
                strSql.Append(@" AND a.tid=@TID ");
            }




            #region 教学规划1 学前测评用到
            if (para.StageIDStr != "0" && !string.IsNullOrEmpty(para.StageIDStr))
            {
                strSql.AppendFormat(" AND b.StageID={0}", para.StageIDStr);
            }
            if (para.SubjectID != 0)
            {
                strSql.AppendFormat(" AND b.subjectid={0}", para.SubjectID);
            }
            if (para.MFGID != 0)
            {
                strSql.AppendFormat(" AND a.MFGID={0}", para.MFGID);
                strSql.Append(" AND a.IsFile=1 And a.MeasureVersion=0");

            }

            #endregion


            if (para.IsExport)
            {
                if (!string.IsNullOrEmpty(para.StarTime))
                {
                    strSql.Append(" AND date(b.CreateTime)>=@starTime ");

                }
                if (!string.IsNullOrEmpty(para.EndTime))
                {
                    strSql.Append(" AND date(b.CreateTime)<=@endTime ");
                }

                strSql.Append(" AND a.IsFile=0 ");
                strSql.Append(" ORDER BY a.createtime DESC ");//a.Name,
                strSql.Append(" LIMIT @CurrentPage,@PageSize;");
            }
            else
            {
                strSql.Append(" ORDER BY a.createtime DESC LIMIT @CurrentPage,@PageSize;");

            }










            var _index = (para.CurrentPage - 1) * para.PageSize;
            list = MySQLHelper.ExecuteStatement<TempStudentInfoModel>(strSql.ToString(), (a) =>
            {
                _index = _index + 1;
                return new TempStudentInfoModel()
                {
                    Index = _index,
                    MaxCount = para.MaxCount,
                    ID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                    MFGID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    TID = para.TID,
                    Name = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    SubjectID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    StageID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    Phone = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                    TrainAim = a.IsDBNull(6) ? 0 : a.GetInt32(6),
                    CreateTime = a.IsDBNull(7) ? DateTime.MinValue : a.GetDateTime(7),
                    remark = a.IsDBNull(8) ? string.Empty : a.GetString(8),
                    IsFile = a.IsDBNull(9) ? false : a.GetBoolean(9),
                    ClassHOUR = a.IsDBNull(10) ? 0 : a.GetInt32(10),
                    TAID = a.IsDBNull(11) ? string.Empty : a.GetString(11),
                    School = a.IsDBNull(12) ? string.Empty : a.GetString(12),
                    PhoneG = a.IsDBNull(13) ? string.Empty : a.GetString(13),
                    MeasureVersion = a.IsDBNull(14) ? (byte)(0) : a.GetByte(14),
                    ExamName = a.IsDBNull(15) ? string.Empty : a.GetString(15),
                    MeasureID = a.IsDBNull(16) ? (long)(0) : a.GetInt64(16),
                    MeasureVersionOld = a.IsDBNull(17) ? (byte)(0) : a.GetByte(17),
                    Adddress = a.IsDBNull(18) ? "" : a.GetString(18),
                    StrAge = a.IsDBNull(18) ? "" : a.GetInt32(19).ToString() + "岁",
                    StrGender = a.IsDBNull(19) ? "" : a.GetInt32(19) == 0 ? "男" : "女"
                };
            }, parameters);
            //
            return list;
        }

        public bool UpdateTempUser(MfgUserInfoModel dtoSelf, Int32 TID)
        {
            MySqlParameter[] parameters = new MySqlParameter[]
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=TID},
                new MySqlParameter("@EditTime", MySqlDbType.DateTime){ Direction=ParameterDirection.InputOutput, Value=DateTime.Now},
                //new MySqlParameter("@ID", MySqlDbType.Text){ Direction=ParameterDirection.InputOutput, Value=dtoSelf.Index},
                new MySqlParameter("@MfgID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dtoSelf.PId},
                new MySqlParameter("@Name", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=dtoSelf.PAlias},
                new MySqlParameter("@Phone", MySqlDbType.VarChar,20){ Direction=ParameterDirection.InputOutput, Value=dtoSelf.PPhone}
            };

            var t = "";

            var iDList = dtoSelf.Index.Split(',');

            for (int i = 0; i < iDList.Length; i++)
            {
                if (i == 0)
                    t = (@"'" + iDList[i] + @"'");
                else
                {
                    t += (",'" + iDList[i] + @"'");
                }
            }


            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat(@"UPDATE EI_TempStudentInfo set EditTime=@EditTime,IsFile=1,IsEffect=1,MFGID=@MfgID WHERE TID=@TID AND ID in ({0});", t);
            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format(@"测评归档【{0}】", dtoSelf.PAlias), TID.ToString()));
            int k = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (k > 0)
                return true;
            else
                return false;
        }

        /// <summary>
        /// 根据测评ID和知识点ID
        /// </summary>
        /// <returns></returns>
        public List<TARelAnswerModel> GettarelanserList(string taid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select A.TAID AS TAID,A.KID AS KID,A.ItemID AS ItemID, B.Accuracy AS Accuracy,B.Answer AS Answer,B.ItemSource AS ItemSource ");
            strSql.Append(" from EI_TARelItem A LEFT JOIN EI_TAnswer B on  A.TAID=B.TAID AND A.ItemID=B.ItemID");
            strSql.Append(" WHERE A.TAID=@TAID ");

            MySqlParameter[] parameters = {
                    new MySqlParameter("@TAID", MySqlDbType.VarChar,40)
                                         };
            parameters[0].Value = taid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<TARelAnswerModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 根据教师ID，阶段ID,科目ID获取教材版本
        /// </summary>
        /// <returns></returns>
        public List<ReportMaterialModel> GetManRelStaList(string tid, int stageid, int subjectid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  A.TID AS TID,A.StageID AS StageID,  A.SubjectID AS SubjectID,A.MaterialID AS MaterialID,B.Mversion AS Mversion from EI_ManRelSta A INNER JOIN EI_Material B  ");
            strSql.Append(" ON  A.MaterialID=B.ID WHERE A.TID=@TID AND A.StageID=@StageID AND A.SubjectID=@SubjectID");

            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.Int32,40),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,40),
                     new MySqlParameter("@SubjectID", MySqlDbType.Int32,40)
                                         };
            parameters[0].Value = tid;
            parameters[1].Value = stageid;
            parameters[2].Value = subjectid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<ReportMaterialModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取新增试题集合
        /// </summary>
        /// <returns></returns>
        public List<KnowQuesModel> GetQuesModelList()
        {
            StringBuilder strBuilder = new StringBuilder();

            strBuilder.Append("Select ID,TypeID,TypeName,Body,AnswerList,Answer From EI_KnowQues ");

            DataSet ds = MySQLHelper.Query(strBuilder.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<KnowQuesModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        ///  获取基本知识测评基本模型
        /// </summary>
        /// <param name="MFGID"></param>
        /// <returns></returns>
        public List<BaseAnalyzeModel> GetBaseAnalyzeModelList(BaseAnalyzeModel para)
        {
            para.CurrentPage = para.CurrentPage < 1 ? 1 : para.CurrentPage;
            List<BaseAnalyzeModel> list = new List<BaseAnalyzeModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("  select COUNT(B.ID)  from EI_TempStudentInfo A ");
            strSql.Append(" LEFT JOIN EI_TestAnalyze B ON A.ID=B.SID ");
            strSql.Append(" WHERE MFGID=@MFGID AND A.IsFile=1 ORDER BY B.CreateTime DESC");

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@MFGID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.MFGID},
              new MySqlParameter("@PageSize", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.PageSize},
              new MySqlParameter("@CurrentPage", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=(para.CurrentPage-1)*para.PageSize}
            };
            para.MaxCount = MySQLHelper.ExecuteStatement<Int32>(strSql.ToString(), (a) =>
            {
                return a.GetInt32(0);
            }, parameters).FirstOrDefault();
            //分页
            strSql.Clear();

            strSql.Append(@"select A.MFGID AS MFGID, B.ID AS TAID,B.SID AS SID,B.StageID AS StageID,B.SubjectID AS SubjectID,B.CreateTime AS CreateTime from EI_TempStudentInfo A ");
            strSql.Append(" LEFT JOIN EI_TestAnalyze B ON A.ID=B.SID ");
            strSql.Append(" WHERE MFGID=@MFGID AND A.IsFile=1 ORDER BY B.CreateTime DESC LIMIT @CurrentPage,@PageSize");
            //
            var _index = (para.CurrentPage - 1) * para.PageSize;

            list = MySQLHelper.ExecuteStatement<BaseAnalyzeModel>(strSql.ToString(), (a) =>
            {
                _index = _index + 1;
                return new BaseAnalyzeModel()
                {
                    Index = _index,
                    MaxCount = para.MaxCount,
                    MFGID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                    TAID = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    SID = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    StageID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    SubjectID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    CreateTime = a.IsDBNull(5) ? DateTime.MinValue : a.GetDateTime(5)

                };
            }, parameters);
            return list;
        }
        #region 学生档案 V2 yang

        /// <summary>
        ///  获取基本知识测评基本模型
        /// </summary>
        /// <param name="MFGID"></param>
        /// <returns></returns>
        public List<BaseAnalyzeModel> GetAllFileReport(BaseAnalyzeModel para)
        {
            para.CurrentPage = para.CurrentPage < 1 ? 1 : para.CurrentPage;
            List<BaseAnalyzeModel> list = new List<BaseAnalyzeModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("  select COUNT(B.ID)  from EI_TempStudentInfo A ");
            strSql.Append(" LEFT JOIN EI_TestAnalyze B ON A.ID=B.SID ");
            strSql.Append(" WHERE MFGID=@MFGID AND A.IsFile=1 ORDER BY B.CreateTime DESC");

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@MFGID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.MFGID},
              new MySqlParameter("@PageSize", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.PageSize},
              new MySqlParameter("@CurrentPage", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=(para.CurrentPage-1)*para.PageSize}
            };
            para.MaxCount = MySQLHelper.ExecuteStatement<Int32>(strSql.ToString(), (a) =>
            {
                return a.GetInt32(0);
            }, parameters).FirstOrDefault();
            //分页
            strSql.Clear();

            strSql.Append(@"select A.MFGID AS MFGID, B.ID AS TAID,B.SID AS SID,B.StageID AS StageID,B.SubjectID AS SubjectID,B.CreateTime AS CreateTime from EI_TempStudentInfo A ");
            strSql.Append(" LEFT JOIN EI_TestAnalyze B ON A.ID=B.SID ");
            strSql.Append(" WHERE MFGID=@MFGID AND A.IsFile=1 ORDER BY B.CreateTime DESC LIMIT @CurrentPage,@PageSize");
            //
            var _index = (para.CurrentPage - 1) * para.PageSize;

            list = MySQLHelper.ExecuteStatement<BaseAnalyzeModel>(strSql.ToString(), (a) =>
            {
                _index = _index + 1;
                return new BaseAnalyzeModel()
                {
                    Index = _index,
                    MaxCount = para.MaxCount,
                    MFGID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                    TAID = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    SID = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    StageID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    SubjectID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    CreateTime = a.IsDBNull(5) ? DateTime.MinValue : a.GetDateTime(5)

                };
            }, parameters);
            return list;
        }
        #endregion
        public void SaveKnowAssEffect(string TID, string TAID)
        {
            MySqlParameter[] parameters = new MySqlParameter[]
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=Convert.ToInt32( TID)},
                new MySqlParameter("@TAID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=TAID}
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"UPDATE EI_TempStudentInfo a inner join EI_TestAnalyze b on a.ID=b.SID set a.IsEffect=1 WHERE a.TID=@TID AND b.ID=@TAID;");
            MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
        }

        public bool DeleteTempUser(string TempID, int p)
        {
            MySqlParameter[] parameters = new MySqlParameter[]
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=p},
                new MySqlParameter("@TempID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=TempID}
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"UPDATE EI_TempStudentInfo set EditTime=now(),DelFlag=1,LastUpdateUser=@TID WHERE ID=@TempID;");
            var i = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (i > 1)
                return true;
            else
                return false;
        }

        public void SelectItem(TempTARelModel dto)
        {
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@ExamID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.TAID}
            };
            StringBuilder strb = new StringBuilder();
            dto.ListA = new List<TARelItemModel>();
            dto.ListB = new List<TARelKnoModel>();
            strb.Append(@"select KID,KnowledgeName,ClassHour,DefaultHour,IsUse from EI_TestExamKnow where ExamID=@ExamID;");
            strb.Append(@"SELECT KID,ItemID,DiffNum,SequenceID,ItemSource,PointID,PointName FROM EI_TestExamItem WHERE ExamID=@ExamID and ItemSource=0;");
            MySQLHelper.ExecuteStatementList<TempTARelModel>(strb.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        TARelKnoModel dtoB = new TARelKnoModel()
                        {
                            TAID = dto.TAID,
                            KID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                            ClassHour = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                            DefaultHour = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                            KnowledgeName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                            IsUse = a.IsDBNull(4) ? false : a.GetBoolean(4)
                        };
                        dto.ListB.Add(dtoB);
                    }
                }
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            TARelItemModel dtoA = new TARelItemModel()
                            {
                                TAID = dto.TAID,
                                KID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                                ItemID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                                DiffNum = a.IsDBNull(2) ? 0 : a.GetInt32(2),
                                SequenceID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                                ItemSource = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                                PointID = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                                PointName = a.IsDBNull(6) ? string.Empty : a.GetString(6)
                            };
                            dto.ListA.Add(dtoA);
                        }
                    }
                }
                return dto;
            }, parameters);
            for (int i = 0; i < dto.ListB.Count; i++)
            {
                if (dto.ListA.Count > 0)
                {
                    dto.ListA.Where(a => a.TAID == dto.ListB[i].TAID && a.KID == dto.ListB[i].KID).ToList().ForEach(b =>
                    {
                        b.GroupID = i + 1;
                        b.KnowledgeName = dto.ListB[i].KnowledgeName;
                    });
                }
                dto.ListB[i].GroupID = i + 1;
            }
        }


        public void GetTestExam(TestExamPageModel dto)
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
            str.Append(@"select count(1) from EI_TestExam as a where a.IsEnable=1 and (a.GradeID=@GradeID or @GradeID=0) and (a.SubjectID=@SubjectID or @SubjectID=0) and a.TID in (
select AccountNumber from EI_ManagerInfo as b where b.OrgID=(select OrgID from EI_ManagerInfo c where c.AccountNumber=@TID));");
            str.Append(@"select a.ExamID,a.ExamName,b.Name,a.CreateTime,a.GradeID,a.SubjectID,a.StageID,a.LastUpdateTime from EI_TestExam a inner join EI_ManagerInfo b on a.TID=b.AccountNumber
where a.IsEnable=1 and (a.GradeID=@GradeID or @GradeID=0) and (a.SubjectID=@SubjectID or @SubjectID=0) and b.OrgID=(select x.OrgID from EI_ManagerInfo x where x.AccountNumber=@TID)
order by a.LastUpdateTime desc limit @CurrentPage,@PageSize;");
            var _index = (dto.PageIndex - 1) * dto.PageSize;
            MySQLHelper.ExecuteStatementList<TestExamModel>(str.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.MaxCount = a.GetInt32(0);
                    }
                }
                dto.list = new List<TestExamModel>();
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            _index = _index + 1;//生成序号
                            TestExamModel _dto = new TestExamModel();
                            _dto.Index = _index;
                            _dto.ExamID = a.GetInt32(0);
                            _dto.ExamName = a.GetString(1);
                            _dto.TeacherName = a.GetString(2);
                            _dto.CreateTime = a.GetDateTime(3);
                            _dto.GradeID = a.GetByte(4);
                            _dto.SubjectID = a.GetByte(5);
                            _dto.StageID = a.GetByte(6);
                            _dto.LastUpdateTime = a.GetDateTime(7);
                            dto.list.Add(_dto);
                        }
                    }
                }
                return null;//没有其它意义
            }, parameters);
        }

        public string DeleteTestExam(TestExamModel dto)
        {
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@TID", MySqlDbType.VarChar,45){ Direction=ParameterDirection.InputOutput, Value=dto.TID},
             new MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.ExamID},
            };
            StringBuilder str = new StringBuilder();
            str.Append(@"update EI_TestExam set IsEnable=0 ,IsDelete=1, LastTID=@TID,LastUpdateTime=now() where ExamID=@ExamID;");
            return MySQLHelper.ExecuteStatement(str.ToString(), parameters).ToString();
        }

        public List<TestExamItemModel> GePreView(TestExamModel dto)
        {
            List<TestExamItemModel> list = new List<TestExamItemModel>();
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.ExamID},
            };
            StringBuilder str = new StringBuilder();
            //str.Append(@"select a.ExamItemID,a.ItemID,a.SequenceID,b.SubjectID,b.GradeID,b.StageID,b.ExamName from EI_TestExamItem a inner join EI_TestExam as b on a.ExamID=b.ExamID where b.ExamID=@ExamID and a.ItemSource=0;");
            str.Append(@"select a.ExamItemID,a.ItemID,a.SequenceID,b.SubjectID,b.GradeID,b.StageID,b.ExamName,c.KnowledgeName from EI_TestExamItem a 
inner join EI_TestExam as b on a.ExamID=b.ExamID 
INNER JOIN ei_testexamknow c on a.ExamID=c.ExamID and a.KID=c.KID where b.ExamID=@ExamID and a.ItemSource=0;");
            list = MySQLHelper.ExecuteStatement<TestExamItemModel>(str.ToString(), (a) =>
            {
                TestExamItemModel _p = new TestExamItemModel();
                _p.ExamItemID = a.GetInt32(0);
                _p.ItemID = a.GetInt32(1);
                _p.SequenceID = a.GetInt32(2);
                _p.SubjectID = a.GetInt32(3);
                _p.GradeID = a.GetInt32(4);
                _p.StageID = a.GetInt32(5);
                _p.ExamName = a.GetString(6);
                _p.KnowledgeName = a.GetString(7);
                return _p;
            }, parameters);
            if (list == null || list.Count == 0)
            {
                list = MySQLHelper.ExecuteStatement<TestExamItemModel>(@"select SubjectID,GradeID,StageID,ExamName from EI_TestExam where ExamID=@ExamID;", (a) =>
                {
                    TestExamItemModel _p = new TestExamItemModel();
                    _p.ExamItemID = -1;
                    //_p.ItemID = a.GetInt32(1);
                    //_p.SequenceID = a.GetInt32(2);
                    _p.SubjectID = a.GetInt32(0);
                    _p.GradeID = a.GetInt32(1);
                    _p.StageID = a.GetInt32(2);
                    _p.ExamName = a.GetString(3);
                    return _p;
                }, parameters);
            }


            return list;
        }

        public void GetSingleInfo(TestSingleBaseModel dto)
        {
            List<TestExamItemModel> list = new List<TestExamItemModel>();
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.TID},
            };
            dto.list = MySQLHelper.ExecuteStatement<ManRelStaModel>(@"select StageID,SubjectID from EI_ManRelSta where TID=@TID ORDER BY StageID,SubjectID;", (a) =>
            {
                return new ManRelStaModel()
                {
                    StageID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1)
                };
            }, parameters);
        }

        public List<TagModel> GetTagKeepInit(TagKeepInitModel dto)
        {
            List<TagModel> list = new List<TagModel>();
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.TID},
             new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.SubjectID},
             new MySqlParameter("@ItemID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.ItemID},
            };
            MySQLHelper.ExecuteStatementList<List<TagModel>>(@"select DISTINCT b.TagID from EI_TagKeep as a inner join EI_TagKeepMapping as b on a.KeepID=b.KeepID where a.TID=@TID and a.SubjectID=@SubjectID and a.ItemID=@ItemID ;SELECT ID,Tag,TagType From EI_Tag WHERE (TagType=0 OR (TagType=1 AND TID=@TID)) ORDER BY OrderNumber;",
                (a) =>
                {
                    List<Int32> _j = new List<int>();//试题收藏的集合
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            _j.Add(a.IsDBNull(0) ? 0 : a.GetInt32(0));
                        }
                    }
                    if (a.NextResult())
                    {
                        while (a.Read())
                        {
                            TagModel _m = new TagModel();
                            _m.TagID = a.IsDBNull(0) ? 0 : a.GetInt32(0);
                            _m.TagName = a.IsDBNull(1) ? string.Empty : a.GetString(1);
                            _m.TagType = a.IsDBNull(2) ? 0 : a.GetInt32(2);
                            _m.IsKeep = _j.Where(t => t == _m.TagID).Count() == 1 ? true : false;
                            list.Add(_m);
                        }
                    }
                    return list;

                }, parameters);
            return list;
        }

        public int GetTagKeepInit(TagKeepInitModel para, TagKeepMappingModel dto)
        {
            Int32 i = 0, j = 0;
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID},
             new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.SubjectID},
             new MySqlParameter("@ItemID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.ItemID},
             new MySqlParameter("@KeepID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=0}
            };
            var str = new StringBuilder();
            str.Append(@"select KeepID from EI_TagKeep where TID=@TID and SubjectID=@SubjectID AND ItemID=@ItemID limit 1;");
            MySQLHelper.ExecuteStatementList<Int32>(str.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        parameters[3].Value = j = a.GetInt32(0);
                    }
                }
                return j;
            }, parameters);
            str.Clear();
            if (dto.Tag == null || dto.Tag.Count == 0)
            {
                if (j != 0)//存在收藏、更新收藏状态
                {
                    para.ResponseString = (0).ToString();//取消收藏
                    str.AppendFormat(@"update EI_TagKeep set KeepState=0,EditTime=now() where KeepID=@KeepID;delete from EI_TagKeepMapping where KeepID=@KeepID;");
                }
                else
                    return 0;
            }
            else
            {
                var _right = dto.Tag.Where(a => a.IsKeep);
                var _wrong = dto.Tag.Where(a => !a.IsKeep);
                if (j != 0)//存在收藏、更新标签
                {
                    para.ResponseString = (1).ToString();//收藏
                    str.AppendFormat(@"update EI_TagKeep set KeepState=1,EditTime=now() where KeepID=@KeepID;");
                    if (_wrong.Count() > 0)
                        str.AppendFormat(@"delete from EI_TagKeepMapping where KeepID=@KeepID and TagID in ({0});", string.Join<Int32>(@",", _wrong.Select(b => b.TagID)));
                    if (_right.Count() > 0)
                    {
                        str.AppendFormat(@"insert into EI_TagKeepMapping(KeepID,TagID) values ");
                        var k = true;
                        foreach (var item in _right)
                        {
                            if (k)
                                str.AppendFormat(@"(@KeepID,{0})", item.TagID);
                            else
                                str.AppendFormat(@",(@KeepID,{0})", item.TagID);
                            k = false;
                        }
                        str.Append(@";");
                    }
                }
                else//不存在收藏、添加
                {
                    para.ResponseString = (1).ToString();//收藏
                    str.Append(@"insert into EI_TagKeep(TID,GradeID,StageID,SubjectID,ItemID,ItemType,KnowledgeID,KnowledgeName,AddTime,EditTime,KeepState,DiffNum,DelFlag,SequenceID,TagSource) ");
                    str.AppendFormat(@"values (@TID,{0},{1},{2},{3},{4},{5},'{6}',now(),now(),1,{7},0,0,{8});", dto.GradeID, dto.StageID, dto.SubjectID, dto.ItemID, dto.ItemType, dto.KnowledgeID, dto.KnowledgeName, dto.DiffNum, dto.TagSource);
                    str.AppendFormat(@"insert into EI_TagKeepMapping(KeepID,TagID) values ");
                    var k = true;
                    foreach (var item in _right)
                    {
                        if (k)
                            str.AppendFormat(@"(@@identity,{0})", item.TagID);
                        else
                            str.AppendFormat(@",(@@identity,{0})", item.TagID);
                        k = false;
                    }
                    str.Append(@";");
                }
            }
            i = MySQLHelper.ExecuteStatement(str.ToString(), parameters);
            return i;
        }

        /// <summary>
        /// 获取感知题列表
        /// </summary>
        /// <returns></returns>
        public List<KnowQuesModel> GetKnowDataList(int id)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"select ID,TypeID,TypeName,Body,AnswerList,Answer,ListSorce,CreateTime from ei_knowques where (0=@ID or id=@ID)");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID", MySqlDbType.Int32,40)         };
            parameters[0].Value = id;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<KnowQuesModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 获取已经存在的教材版本信息
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        public List<KnowReportModel> GetTestAnaylzeInfo(string taid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat(@"select ExamID,MaterialID,Mversion From ei_testanalyze Where ID='{0}'", taid);

            DataSet ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<KnowReportModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }



        /// <summary>
        /// 保存学科测评结果报告
        /// </summary>
        /// <returns></returns>
        public bool SaveSubReport(string taid, string sid, List<SecmainQuesModel> seamainList)
        {
            var ResultLevel = string.Empty;
            StringBuilder strSql = new StringBuilder();
            StringBuilder inserSql = new StringBuilder();
            #region 知识点
            strSql.AppendFormat(@"select V1.KID,V1.KnowledgeName,V.rightcount,V.PointID,V.PointName,V.total,V.rightleve
 from 
(select  
SUM(E.Accuracy) as rightcount,
PointID,
PointName,
KID,
COUNT(1) AS total,
SUM(E.Accuracy)/count(1) as rightleve
 from 
 ei_tarelitem D
INNER  JOIN ei_tanswer E  ON D.TAID=E.TAID AND D.ItemID=E.ItemID
 where D.TAID='{0}'
group by d.PointID ,d.KID)V 
LEFT JOIN
(SELECT kid,KnowledgeName FROM  ei_tarelkno WHERE TAID='{0}')V1
ON V.KID=V1.KID", taid);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            var datalist = new List<CalaKnowModel>();
            if (ds.Tables[0].Rows.Count > 0)
            {

                datalist = ModelConvertHelper<CalaKnowModel>.ConvertToModelList(ds.Tables[0]);
                var strpoint = datalist.Select(x => x.KID).ToArray();



                var rightcount = Convert.ToInt32(datalist.Sum(x => Convert.ToDecimal(x.rightcount)));
                var totoal = datalist.Sum(x => Convert.ToDecimal(x.total));
                var calresult = Math.Ceiling((rightcount / totoal) * 100);
                if (calresult >= 90 && calresult <= 100)
                {
                    ResultLevel = "A";
                }
                else if (calresult >= 80 && calresult < 90)
                {
                    ResultLevel = "B";
                }
                else if (calresult >= 70 && calresult < 80)
                {
                    ResultLevel = "C";
                }
                else if (calresult >= 60 && calresult < 70)
                {
                    ResultLevel = "D";
                }
                else if (calresult < 60)
                {
                    ResultLevel = "E";
                }
                strSql.Clear();
                //  string[] partarry = new string[] { "重点", "难点", "重难点" };
                foreach (var item in datalist)
                {

                    // Random random = new Random();
                    var firstData = seamainList.Where(x => x.f_id == Convert.ToInt32(item.PointID)).First();
                    var EstimateValue = firstData.f_percent;
                    var PointLevel = firstData.f_freq;

                    inserSql.Append(@"insert into ei_knowsubrepot(TAID,SID,KID,KnowledgeName,ResultLevel,PointID,PointName,PTotalCount,PRightCount,Degree,EstimateValue,PointLevel)values");
                    inserSql.AppendFormat("('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}');",
                        taid,
                        sid,
                        item.KID,
                        item.KnowledgeName,
                        ResultLevel,
                        item.PointID,
                        item.PointName,
                        item.total,
                        item.rightcount,
                        firstData.f_keyordiff == null ? string.Empty : firstData.f_keyordiff,//重要程度
                        EstimateValue,//预估分值
                        PointLevel //等级
                        );


                }

            }
            #endregion
            #region 难度
            strSql.AppendFormat(@" select  A.TAID as TAID,
sum(B.Accuracy) as rightCount,
count(1) as counttotal,
SUM(B.AnswerTime) as sumtime,

CASE WHEN A.DiffNum>=1 and a.DiffNum<=40 then '偏易'
 when a.DiffNum>40 and a.DiffNum<=80 then '中等'
 when a.DiffNum>80 and a.DiffNum<=100 then '偏难'
else '' end  as diffname
from ei_tarelitem A INNER JOIN ei_tanswer B ON A.TAID=B.TAID
and A.ItemID=B.ItemID
WHERE A.TAID='{0}' AND A.DiffNum>0
GROUP BY diffname", taid);

            ds = MySQLHelper.Query(strSql.ToString());
            var daffilist = new List<CalaDiffModel>();
            if (ds.Tables[0].Rows.Count > 0)
            {
                daffilist = ModelConvertHelper<CalaDiffModel>.ConvertToModelList(ds.Tables[0]);
                var RightCount = daffilist.Sum(x => Convert.ToDecimal(x.rightCount));
                var totalCount = daffilist.Sum(x => Convert.ToDecimal(x.counttotal));
                foreach (var item in daffilist)
                {

                    var totoal = datalist.Sum(x => Convert.ToDecimal(x.total));
                    var calresult = Math.Ceiling(RightCount / totalCount);
                    var difficty = "0";
                    var expectRate = 0;
                    switch (item.diffname)
                    {
                        case "偏易":
                            difficty = "1";
                            expectRate = 90;
                            break;
                        case "中等":
                            difficty = "2";
                            expectRate = 80;
                            break;
                        case "偏难":
                            difficty = "3";
                            expectRate = 70;
                            break;
                    }
                    inserSql.Append(@"insert into ei_knowsubrepot_difficuy(TAID,SID,Difficty,DiffictyName,TotalCount,RightCount,AnswerTime,RightRate,ExpectRate)values");
                    inserSql.AppendFormat("('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}');",
                        taid,
                        sid,
                       difficty,
                        item.diffname,
                       item.counttotal,
                        item.rightCount,
                        item.sumtime,
                       calresult,
                       expectRate
                        );
                }

            }
            #endregion

            #region 科目配置课时
            strSql.Clear();
            strSql.AppendFormat(@"select sum(ClassHour) as totalhour from ei_tarelkno where TAID='{0}'", taid);
            ds = MySQLHelper.Query(strSql.ToString());

            if (ds.Tables[0].Rows.Count > 0)
            {
                inserSql.AppendFormat(@"Update ei_testanalyze set TotalHour='{0}',MeasureVersion=2 where ID='{1}' AND SID='{2}';",
                    ds.Tables[0].Rows[0]["totalhour"].ToString(),
                    taid,
                    sid
                    );
            }
            #endregion

            return MySQLHelper.ExecuteSql(inserSql.ToString()) > 0;


        }


        public List<TempMeasureModel> GetMeasure(TempMeasureModelPara p)
        {
            List<TempMeasureModel> list = new List<TempMeasureModel>();
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT a.ID,b.StageID,b.SubjectID,a.MeasureVersion, case WHEN a.MeasureVersion=0 THEN '' ELSE (
SELECT i.ExamName from ei_measure_exam i WHERE i.TempID=a.ID
) END as ExamName,b.MeasureVersion from ei_tempstudentinfo a 
INNER JOIN ei_testanalyze b on a.ID=b.SID
INNER JOIN ei_managerinfo c on a.TID=c.AccountNumber
WHERE a.`Name`=@TName AND a.Phone=@Phone AND a.IsFile=0 and a.IsEffect=1 and a.DelFlag=0
and c.OrgID=@OrgID AND a.TID=@TID order by a.CreateTime desc;");

            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=p.TID},
             new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=p.OrgID},
             new MySqlParameter("@Phone", MySqlDbType.VarChar,20){ Direction=ParameterDirection.InputOutput, Value=p.Phone},
             new MySqlParameter("@TName", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=p.TName}
            };

            MySQLHelper.ExecuteStatementList<List<TempMeasureModel>>(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        list.Add(new TempMeasureModel()
                        {
                            TempID = a.GetString(0),
                            StageID = a.GetInt32(1),
                            SubjectID = a.GetInt32(2),
                            MeasureVersion = a.GetByte(3),
                            ExamName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                            MeasureVersionOld = a.GetByte(5)
                        });
                    }
                }

                return null;

            }, parameters);

            return list;

        }
        /// <summary>
        /// 根据mfgid 获取测评档案列表
        /// </summary>
        /// <param name="mfgid"></param>
        /// <returns></returns>
        public List<TempMeasureModel> GetFileMeasureID(string mfgid)
        {
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT a.ID,b.StageID,b.SubjectID,b.MeasureVersion, case WHEN b.MeasureVersion=0 THEN '' ELSE (
                        SELECT i.ExamName from ei_measure_exam i WHERE i.TempID=a.ID
                        ) END as ExamName,
                        case when b.MeasureVersion=0 then ''  
                        when (b.MeasureVersion=2 and a.MeasureVersion=1) then (SELECT im.MeasureID from ei_measure_exam im WHERE im.TempID=a.ID)
                        when (b.MeasureVersion=2 and a.MeasureVersion=0) then ('subjectid')
                          END AS MeasureID
                         from ei_tempstudentinfo a 
                        INNER JOIN ei_testanalyze b on a.ID=b.SID
                        INNER JOIN ei_managerinfo c on a.TID=c.AccountNumber

                        ");
            sql.Append(@"select t.ID,t.StageID,t.MeasureVersion,a.MeasureVersion as 
`OldVersion` from ei_tempstudentinfo t left join ei_testanalyze  a on t.ID=a.SID   where MFGID =@MFGID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@MFGID", MySqlDbType.Int32,11){ Direction=ParameterDirection.Input, Value=mfgid}
                         };
            var list = new List<TempMeasureModel> { };
            MySQLHelper.ExecuteStatementList<List<TempMeasureModel>>(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        list.Add(new TempMeasureModel()
                        {
                            TempID = a.GetString(0),
                            StageID = a.GetInt32(1),
                            MeasureVersion = a.GetByte(2),
                            OldVersion = a.GetByte(3)
                        });
                    }
                }

                return null;

            }, parameters);

            return list;


        }

        /// <summary>
        /// 根据mfgid 获取测评档案列表
        /// </summary>
        /// <param name="mfgid"></param>
        /// <returns></returns>
        public List<TempMeasureModel> GetFileMeasureID(TempMeasureModelPara p)
        {
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT a.ID,b.StageID,b.SubjectID,b.MeasureVersion as OldVersion, case WHEN b.MeasureVersion=0 THEN '' ELSE (
                        SELECT i.ExamName from ei_measure_exam i WHERE i.TempID=a.ID
                        ) END as ExamName,
                        case when b.MeasureVersion=0 then ''  
                        when (b.MeasureVersion=2 and a.MeasureVersion=1) then (SELECT im.MeasureID from ei_measure_exam im WHERE im.TempID=a.ID)
                        when (b.MeasureVersion=2 and a.MeasureVersion=0) then (select max(ik.TAID) from ei_knowsubrepot ik where ik.sid=a.ID)
                          END AS MeasureID,a.MeasureVersion
                         from ei_tempstudentinfo a 
                        INNER JOIN ei_testanalyze b on a.ID=b.SID
                        where a.IsFile=1 and a.IsEffect=1 and a.DelFlag=0 and a.MFGID=@MFGID ORDER BY a.CreateTime desc;
                        ");
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@MFGID", MySqlDbType.Int32,11){ Direction=ParameterDirection.Input, Value=p.MfgId}
                         };
            var list = new List<TempMeasureModel> { };
            MySQLHelper.ExecuteStatementList<List<TempMeasureModel>>(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        list.Add(new TempMeasureModel()
                        {

                            TempID = a.GetString(0),
                            StageID = a.GetInt32(1),
                            SubjectID = a.GetInt32(2),
                            OldVersion = a.GetByte(3),
                            ExamName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                            MeasureID = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                            MeasureVersion = a.GetByte(6),

                        });
                    }
                }

                return null;

            }, parameters);

            return list;


        }


        public List<TempMeasureStudentModel> GetAllMeasure(string measurID)
        {
            StringBuilder sql = new StringBuilder();
            #region sql
            sql.Append(@"SELECT
	                            *
                            FROM
	                            (
		                            SELECT
			                            xk.MeasureID,
			                            xk.measureType,
			                            CONCAT(xk.stage,xk.`subject`)	 AS ExamName,
			                            xk.ID,
			                            xk.`Name`,
			                            xk.Gender,
			                            xk.Age,
			                            xk.Phone,
			                            xk.School,
			                            xk.Adddress,
			                            xk.CreateTime

		                            FROM
			                            (
				                            SELECT
					                            km.ID AS `MeasureID`,
					                            0 AS `measureType`,
					                            km.SubjectID,
					                            CASE km.SubjectID
				                            WHEN 1 THEN
					                            '语文'
				                            WHEN 2 THEN
					                            '数学'
				                            WHEN 3 THEN
					                            '英语'
				                            WHEN 4 THEN
					                            '物理'
				                            WHEN 5 THEN
					                            '化学'
				                            WHEN 6 THEN
					                            '地理'
				                            WHEN 7 THEN
					                            '历史'
				                            WHEN 8 THEN
					                            '政治'
				                            WHEN 9 THEN
					                            '生物'
				                            END AS `subject`,
				                            km.StageID,
				                            CASE km.StageID
			                            WHEN 1 THEN
				                            '小学'
			                            WHEN 2 THEN
				                            '初中'
			                            WHEN 3 THEN
				                            '高中'
			                            END AS `stage`,
			                            ts.`Name`,
			                            ts.ID,
			                            ts.Gender,
			                            ts.Age,
			                            ts.Phone,
			                            ts.School,
			                            ts.Adddress,
			                            ts.CreateTime,
																	ts.DelFlag
		                            FROM
			                            ei_testanalyze km
		                            INNER JOIN (
			                            SELECT
				                            x.ID,
				                            x.MeasureVersion,
				                            x.`Name`,
				                            x.Gender,
				                            x.Age,
				                            x.Phone,
				                            x.School,
				                            x.Adddress,
				                            x.iseffect,
				                            x.CreateTime,
																		x.DelFlag
			                            FROM
				                            ei_tempstudentinfo x
			                            INNER JOIN (
				                            SELECT
					                            a.TID,
					                            a.`Name`,
					                            a.Phone
				                            FROM
					                            ei_tempstudentinfo a
				                            INNER JOIN ei_measure_exam c ON a.id = c.TempID
				                            WHERE
					                            c.MeasureID = @measurID
			                            ) y ON x.TID = y.TID
			                            AND x.`Name` = y.`Name`
			                            AND x.Phone = y.Phone
		                            ) ts ON km.SID = ts.ID
		                            WHERE
			                            km.MeasureVersion = 2
		                            AND ts.MeasureVersion = 0
		                            AND ts.iseffect = 1
			                            ) xk where xk.DelFlag=0
		                            UNION ALL
			                            SELECT
				                            km.MeasureID,
				                            1 AS `measureType`,
				                            km.ExamName,
				                            ts.ID,
				                            ts.`Name`,
				                            ts.Gender,
				                            ts.Age,
				                            ts.Phone,
				                            ts.School,
				                            ts.Adddress,
				                            ts.CreateTime
			                            FROM
				                            ei_measure_exam km
			                            INNER JOIN (
				                            SELECT
					                            x.ID,
					                            x.`Name`,
					                            x.Gender,
					                            x.Age,
					                            x.Phone,
					                            x.School,
					                            x.Adddress,
					                            x.IsEffect,
					                            x.CreateTime,
																			x.DelFlag
				                            FROM
					                            ei_tempstudentinfo x
				                            INNER JOIN (
					                            SELECT
						                            a.TID,
						                            a.`Name`,
						                            a.Phone
					                            FROM
						                            ei_tempstudentinfo a
					                            INNER JOIN ei_measure_exam c ON a.id = c.TempID
					                            WHERE
						                            c.MeasureID =@measurID
				                            ) y ON x.TID = y.TID
				                            AND x.`Name` = y.`Name`
				                            AND x.Phone = y.Phone
			                            ) ts ON km.TempID = ts.ID
			                            WHERE
				                            ts.IsEffect = 1 and ts.DelFlag=0
	                            ) f
                            ORDER BY
	                            f.CreateTime DESC;");
            #endregion
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@measurID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.Input, Value=measurID}
                         };
            var list = new List<TempMeasureStudentModel> { };
            MySQLHelper.ExecuteStatementList<List<TempMeasureStudentModel>>(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        list.Add(new TempMeasureStudentModel()
                        {

                            //TempID = a.GetString(0),
                            //StageID = a.GetInt32(1),
                            //SubjectID = a.GetInt32(2),
                            //OldVersion = a.GetByte(3),
                            //ExamName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                            MeasureID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                            MeasureVersion = a.IsDBNull(1) ? (byte)0 : (byte)a.GetInt32(1),
                            ExamName = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                            SId = a.IsDBNull(3) ? string.Empty : a.GetString(3),
                            SName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                            Gender = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                            Age = a.IsDBNull(6) ? string.Empty : a.GetString(6),
                            Phone = a.IsDBNull(7) ? string.Empty : a.GetString(7),
                            School = a.IsDBNull(8) ? string.Empty : a.GetString(8),
                            Address = a.IsDBNull(9) ? string.Empty : a.GetString(9),
                            CreateTime = a.IsDBNull(10) ? DateTime.Now : a.GetDateTime(10)


                        });
                    }
                }

                return null;

            }, parameters);

            return list;
        }


        public List<TempMeasureStudentModel> GetAllMeasureSub(string measurID)
        {
            StringBuilder sql = new StringBuilder();
            #region sql
            sql.Append(@"select * from (
                                SELECT
	                                xk.MeasureID,
	                                xk.measureType,
	                                CONCAT(xk.stage, xk.`subject`) AS ExamName,
	                                xk.ID,
	                                xk.`Name`,
	                                xk.Gender,
	                                xk.Age,
	                                xk.Phone,
	                                xk.School,
	                                xk.Adddress,
                                xk.CreateTime
    
                                FROM
	                                (
		                                SELECT
			                                km.ID AS `MeasureID`,
			                                0 AS `measureType`,
			                                km.SubjectID,
			                                CASE km.SubjectID
		                                WHEN 1 THEN
			                                '语文'
		                                WHEN 2 THEN
			                                '数学'
		                                WHEN 3 THEN
			                                '英语'
		                                WHEN 4 THEN
			                                '物理'
		                                WHEN 5 THEN
			                                '化学'
		                                WHEN 6 THEN
			                                '地理'
		                                WHEN 7 THEN
			                                '历史'
		                                WHEN 8 THEN
			                                '政治'
		                                WHEN 9 THEN
			                                '生物'
		                                END AS `subject`,
		                                km.StageID,
		                                CASE km.StageID
	                                WHEN 1 THEN
		                                '小学'
	                                WHEN 2 THEN
		                                '初中'
	                                WHEN 3 THEN
		                                '高中'
	                                END AS `stage`,
	                                ts.`Name`,
	                                ts.ID,
	                                ts.Gender,
	                                ts.Age,
	                                ts.Phone,
	                                ts.School,
	                                ts.Adddress,
	                                ts.CreateTime,
                                    ts.DelFlag
                                FROM
	                                ei_testanalyze km
                                INNER JOIN (
	                                SELECT
		                                x.ID,
		                                x.MeasureVersion,
		                                x.`Name`,
		                                x.Gender,
		                                x.Age,
		                                x.Phone,
		                                x.School,
		                                x.Adddress,
		                                x.iseffect,
		                                x.CreateTime,
                                        x.DelFlag
	                                FROM
		                                ei_tempstudentinfo x
	                                INNER JOIN (
		                                SELECT
			                                a.TID,
			                                a.`Name`,
			                                a.Phone
		                                FROM
			                                ei_tempstudentinfo a
		                                WHERE
			                                a.id = @measurID
	                                ) y ON x.TID = y.TID
	                                AND x.`Name` = y.`Name`
	                                AND x.Phone = y.Phone
                                ) ts ON km.SID = ts.ID
                                WHERE
	                                km.MeasureVersion > 0
                                AND ts.MeasureVersion = 0
                                AND ts.iseffect = 1 and ts.DelFlag=0
	                                ) xk 
                                UNION ALL
	                                SELECT
		                                km.MeasureID,
		                                1 AS `measureType`,
		                                km.ExamName,
		                                ts.ID,
		                                ts.`Name`,
		                                ts.Gender,
		                                ts.Age,
		                                ts.Phone,
		                                ts.School,
		                                ts.Adddress,
		                                ts.CreateTime
	                                FROM
		                                ei_measure_exam km
	                                INNER JOIN (
		                                SELECT
			                                x.ID,
			                                x.`Name`,
			                                x.Gender,
			                                x.Age,
			                                x.Phone,
			                                x.School,
			                                x.Adddress,
			                                x.IsEffect,
			                                x.CreateTime,
                                            x.DelFlag
		                                FROM
			                                ei_tempstudentinfo x
		                                INNER JOIN (
			                                SELECT
				                                a.TID,
				                                a.`Name`,
				                                a.Phone
			                                FROM
				                                ei_tempstudentinfo a
			                               WHERE
				                                a.ID = @measurID
		                                ) y ON x.TID = y.TID
		                                AND x.`Name` = y.`Name`
		                                AND x.Phone = y.Phone
	                                ) ts ON km.TempID = ts.ID 
	                                WHERE
		                                ts.IsEffect = 1 and ts.DelFlag=0) f order by f.CreateTime desc;

                                ");
            #endregion
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@measurID", MySqlDbType.VarChar,50){ Direction=ParameterDirection.Input, Value=measurID}
                         };
            var list = new List<TempMeasureStudentModel> { };
            MySQLHelper.ExecuteStatementList<List<TempMeasureStudentModel>>(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        list.Add(new TempMeasureStudentModel()
                        {

                            //TempID = a.GetString(0),
                            //StageID = a.GetInt32(1),
                            //SubjectID = a.GetInt32(2),
                            //OldVersion = a.GetByte(3),
                            //ExamName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                            MeasureID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                            MeasureVersion = a.IsDBNull(1) ? (byte)0 : (byte)a.GetInt32(1),
                            ExamName = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                            SId = a.IsDBNull(3) ? string.Empty : a.GetString(3),
                            SName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                            Gender = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                            Age = a.IsDBNull(6) ? string.Empty : a.GetString(6),
                            Phone = a.IsDBNull(7) ? string.Empty : a.GetString(7),
                            School = a.IsDBNull(8) ? string.Empty : a.GetString(8),
                            Address = a.IsDBNull(9) ? string.Empty : a.GetString(9),
                            CreateTime = a.IsDBNull(10) ? DateTime.Now : a.GetDateTime(10)

                        });
                    }
                }

                return null;

            }, parameters);

            return list;
        }

        public AnswerTestModel WorkInit(string TAID)
        {
            AnswerTestModel r = new AnswerTestModel();
            StringBuilder sql = new StringBuilder();
            sql.Append(@"SELECT a.IsEffect from ei_tempstudentinfo a INNER JOIN ei_testanalyze b on a.ID=b.SID
WHERE b.ID=@TAID;set @Num:=0;
SELECT a.KID,a.ItemID,a.DiffNum,@Num:=@Num+1 as SequenceID,a.PointID from ei_tarelitem a 
WHERE a.ItemSource=0 AND a.TAID=@TAID ORDER BY a.SequenceID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>() {
             new MySqlParameter("@TAID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.Input, Value=TAID}
                         };
            MySQLHelper.ExecuteStatementList(sql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    //是否答题
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            r.IsEffect = a.GetBoolean(0);
                        }
                    }

                    //答题列表
                    if (a.NextResult())
                    {
                        List<AnswerAssessmentModel> list = new List<AnswerAssessmentModel>();
                        while (a.Read())
                        {
                            AnswerAssessmentModel dto = new AnswerAssessmentModel();
                            dto.KID = a.GetString(0);
                            dto.ItemID = a.GetInt32(1);
                            dto.DiffNum = a.GetInt32(2);
                            if (dto.DiffNum <= 20)
                                dto.DiffNum = 1;
                            else if (dto.DiffNum <= 40)
                                dto.DiffNum = 2;
                            else if (dto.DiffNum <= 60)
                                dto.DiffNum = 3;
                            else if (dto.DiffNum <= 80)
                                dto.DiffNum = 4;
                            else dto.DiffNum = 5;
                            dto.SequenceID = a.GetInt32(3);
                            dto.PointID = Convert.ToInt32(a.IsDBNull(4) ? (0).ToString() : a.GetString(4));
                            list.Add(dto);
                        }
                        r.list = list;
                    }
                }
            }, parameters);
            return r;
        }

        public bool SaveKnowItem(KnowAssessmentSubModel dto)
        {
            StringBuilder sql = new StringBuilder();//答题表
            StringBuilder sqlPot = new StringBuilder();//知识掌握度分析
            StringBuilder sqlDiff = new StringBuilder();//试卷难度分析
            StringBuilder sqlSub = new StringBuilder();//更新属性

            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                    new MySqlParameter("@TAID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.Input, Value=dto.TAID},
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.Input, Value=dto.SID}
            };

            #region 答题表
            sql.Append(@"INSERT INTO ei_tanswer(SID,TAID,ItemID,Accuracy,Answer,AnswerTime,ItemSource,CreateTime,DelFlag) VALUES ");
            sqlSub.Append(@"UPDATE ei_tarelkno a INNER JOIN (");//更新属性
            var i = 0;
            foreach (var item in dto.AnswerSub)
            {
                if (i == 0)
                {
                    sql.AppendFormat(@"(@SID,@TAID,{0},{1},'{2}',{3},0,'{4}',0)", item.ItemID, item.Accuracy, item.Answer, item.AnswerTime, item.CreateTime);
                    sqlSub.AppendFormat(@"SELECT '{0}' as TAID,'{1}' as KID", dto.TAID, item.KID);
                }
                else
                {
                    sql.AppendFormat(@",(@SID,@TAID,{0},{1},'{2}',{3},0,'{4}',0)", item.ItemID, item.Accuracy, item.Answer, item.AnswerTime, item.CreateTime);
                    sqlSub.AppendFormat(@" UNION SELECT '{0}' as TAID,'{1}' as KID", dto.TAID, item.KID);
                }
                i++;
            }
            sql.Append(@";");//答题表 
            #endregion

            #region 知识掌握分析
            i = 0;
            var pot = dto.AnswerSub.GroupBy(a => new { a.KID, a.PointID, a.f_keyordiff, a.f_percent, a.f_freq })
                .Select(b => new
                {
                    KID = b.Key.KID,
                    PointID = b.Key.PointID,
                    KeyOrDiff = b.Key.f_keyordiff,
                    Percent = b.Key.f_percent,
                    Freq = b.Key.f_freq,
                    Count = b.Count(),//合计多少条数据
                    Sum = b.Sum(c => c.Accuracy)//答对多少题
                });

            var calresult = Math.Ceiling(dto.AnswerSub.Sum(x => x.Accuracy) * 100.0 / dto.AnswerSub.Count);//正确率
            var ResultLevel = "";
            if (calresult >= 90 && calresult <= 100)
            {
                ResultLevel = "A";
            }
            else if (calresult >= 80 && calresult < 90)
            {
                ResultLevel = "B";
            }
            else if (calresult >= 70 && calresult < 80)
            {
                ResultLevel = "C";
            }
            else if (calresult >= 60 && calresult < 70)
            {
                ResultLevel = "D";
            }
            else if (calresult < 60)
            {
                ResultLevel = "E";
            }

            sqlPot.Append(@"INSERT INTO ei_knowsubrepot(TAID,SID,KID,KnowledgeName,ResultLevel,PointID,PointName,PTotalCount,PRightCount,Degree,EstimateValue,PointLevel) VALUES ");
            foreach (var item in pot)
            {
                if (i == 0)
                {
                    sqlPot.AppendFormat(@"(@TAID,@SID,'{0}','','{7}',{1},'',{2},{3},'{4}',{5},'{6}')", item.KID, item.PointID, item.Count, item.Sum, item.KeyOrDiff, item.Percent, item.Freq, ResultLevel);
                }
                else
                {
                    sqlPot.AppendFormat(@",(@TAID,@SID,'{0}','','{7}',{1},'',{2},{3},'{4}',{5},'{6}')", item.KID, item.PointID, item.Count, item.Sum, item.KeyOrDiff, item.Percent, item.Freq, ResultLevel);
                }
                i++;
            }

            sqlPot.Append(@";");//知识掌握度分析 
            #endregion

            #region 试卷难度分析

            var f_d = 0;

            i = 0;
            var Diff = dto.AnswerSub.GroupBy(a => new { a.f_difficulty, a.f_difficultyDesc }).
              Select(b => new
              {
                  Difficty = b.Key.f_difficulty,
                  DiffictyName = b.Key.f_difficultyDesc,
                  TotalCount = b.Count(),//一共多少试题
                  RightCount = b.Sum(c => c.Accuracy),//答对试题数量
                  AnswerTime = b.Sum(c => c.AnswerTime),//答题时间
                  RightRate = Math.Ceiling(b.Sum(c => c.Accuracy) * 1.0 / b.Count()),//答对试题占比例
                  ExpectRate = DataConverter.GetExpectRate(b.Key.f_difficulty),//预期正确率率
              });
            sqlDiff.Append(@"INSERT INTO ei_knowsubrepot_difficuy(SID,TAID,Difficty,DiffictyName,TotalCount,RightCount,AnswerTime,RightRate,ExpectRate,IsUpdate,CreateTime) VALUES ");
            foreach (var item in Diff)
            {
                if (i == 0)
                    sqlDiff.AppendFormat(@"(@SID,@TAID,{0},'{1}',{2},{3},{4},{5},{6},0,'{7}')", item.Difficty, item.DiffictyName, item.TotalCount, item.RightCount, item.AnswerTime, item.RightRate, item.ExpectRate, DateTime.Now);
                else
                    sqlDiff.AppendFormat(@",(@SID,@TAID,{0},'{1}',{2},{3},{4},{5},{6},0,'{7}')", item.Difficty, item.DiffictyName, item.TotalCount, item.RightCount, item.AnswerTime, item.RightRate, item.ExpectRate, DateTime.Now);
                i++;
            }

            sqlDiff.Append(@";");//试卷难度分析 
            #endregion

            #region 更新属性
            sqlSub.Append(@") as b on a.TAID=b.TAID AND a.KID=b.KID set a.IsUse=1;");//更新属性

            sqlSub.Append(@"UPDATE ei_testanalyze a 
INNER JOIN (SELECT b.TAID, SUM(b.ClassHour) as ClassHour from ei_tarelkno b WHERE b.TAID=@TAID GROUP BY b.TAID) c
on a.ID=c.TAID set a.TotalHour=c.ClassHour,a.MeasureVersion=2
WHERE a.SID=@SID and a.ID=@TAID;");//更新属性           

            sqlSub.Append(@"UPDATE ei_knowsubrepot a 
INNER JOIN (
SELECT DISTINCT n.KID,n.KnowledgeName,m.PointID,m.PointName from ei_tarelkno n
INNER JOIN ei_tarelitem m on m.TAID=n.TAID AND m.KID=n.KID
WHERE n.IsUse=1 AND n.TAID=@TAID
) as b on a.KID=b.KID AND a.PointID=b.PointID
set a.KnowledgeName=b.KnowledgeName, a.PointName=b.PointName
WHERE a.TAID=@TAID;");//更新属性

            sqlSub.AppendFormat(@"update ei_tempstudentinfo set IsEffect=1,EditTime=now(),ResultLevel='{0}' WHERE ID=@SID;", ResultLevel);//更新属性 
            #endregion

            var t = sql.ToString() + sqlPot.ToString() + sqlDiff.ToString() + sqlSub.ToString();

            var r = false;
            MySQLHelper.ExecuteStatementList(t, (a) => { r = true; }, parameters);
            return r;
        }
    }

}



