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
    public class ManRelStaDal
    {
        /// <summary>
        /// 得到一个对象实体
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
            strSql.Append(" where TID=@TID AND MaterialID!='0' ");
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<EI_ManRelSta> GetManRelStaList(string tid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select StageID,SubjectID,MaterialID");
            strSql.Append(" from EI_ManRelSta ");
            strSql.Append(" where TID=@TID  ");

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

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_ManRelSta model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_ManRelSta(");
            strSql.Append("TID,StageID,SubjectID)");
            strSql.Append(" values (");
            strSql.Append("@TID,@StageID,@SubjectID)");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.Int32,11),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11),
                       new MySqlParameter("@SubjectID", MySqlDbType.Int32,11)};
            parameters[0].Value = model.TID;
            parameters[1].Value = model.StageID;
            parameters[2].Value = model.SubjectID;

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
        public bool Update(EI_ManRelSta model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ManRelSta set ");
            strSql.Append("SubjectID=@SubjectID,");
            strSql.Append("StageID=@StageID");
            strSql.Append(" where TID=@TID ");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,11),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11),
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),

                                          };
            parameters[0].Value = model.TID;
            parameters[1].Value = model.StageID;
            parameters[2].Value = model.SubjectID;
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
        /// 判断是否存在该记录
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public bool IsExits(int tid)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_ManRelSta");
            strSql.Append(" where TID=@TID");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.Int32,40)
            };
            parameters[0].Value = tid;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        public bool Delete(int tid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_ManRelSta ");
            strSql.Append(" where TID=@TID");
            MySqlParameter[] parameters = {
                                              new MySqlParameter("@TID", MySqlDbType.Int32,40)
            };
            parameters[0].Value = tid;
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
        /// 更新老师信息
        /// </summary>
        /// <param name="eI_Base">选课属性</param>
        /// <returns></returns>
        public List<ManRelStaModel> GetTeacherCenterList(EI_Base<EI_ManRelSta> eI_Base)
        {
            List<ManRelStaModel> list = new List<ManRelStaModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT a.TID,c.`Name`,b.`Value` AS StageIDName,a.StageID,a.SubjectID,a.MaterialID,c.AcaStru,c.ArtSciences,c.IsTeach ");
            strSql.Append(@" FROM EI_ManRelSta AS a ");
            strSql.Append(@" INNER JOIN EI_Dict AS b ON a.StageID = b.`Code` ");
            strSql.Append(@" INNER JOIN EI_ManagerInfo AS c on a.TID=c.AccountNumber");
            strSql.Append(@" WHERE a.TID = @TID AND  b.Type='Stage'");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.TID.Value}
            };
            list = MySQLHelper.ExecuteStatement<ManRelStaModel>(strSql.ToString(), (a) =>
            {
                return new ManRelStaModel()
                {
                    TID = a.GetInt32(0),
                    Name = a.GetString(1),
                    StageIDName = a.GetString(2),
                    StageID = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                    SubjectID = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    MaterialID = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                    AcaStru = a.IsDBNull(6) ? 1 : a.GetInt32(6),
                    ArtSciences = a.IsDBNull(7) ? 0 : a.GetInt32(7),
                    TempID = (a.IsDBNull(4) ? 0 : a.GetInt32(4)) == 2 ? 0 : (a.IsDBNull(4) ? 0 : a.GetInt32(4)),
                    IsTeach = a.IsDBNull(8) ? 0 : a.GetInt32(8)
                };
            }, parameters);

            if (list == null || list.Count == 0)
            {
                list = MySQLHelper.ExecuteStatement<ManRelStaModel>(@"select AccountNumber,`Name`,AcaStru,ArtSciences,IsTeach from EI_ManagerInfo where AccountNumber=@TID;", (a) =>
                {
                    return new ManRelStaModel()
                    {
                        TID = a.GetInt32(0),
                        Name = a.GetString(1),
                        AcaStru = a.IsDBNull(2) ? 1 : a.GetInt32(2),
                        ArtSciences = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                        IsTeach = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                        StageID = -1
                    };
                }, parameters);
            }
            return list;
        }

        /// <summary>
        /// 保存教师信息
        /// </summary>
        public string SaveTeacherCenter(int TID, List<ManRelStaModel> list, TeacherManagerModel para)
        {
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=TID},
                new MySqlParameter("@AcaStru", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.AcaStru},
                new MySqlParameter("@ArtSciences", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.ArtSciences},
                //new MySqlParameter("@IsTeach", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.IsTeach}
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" DELETE a FROM EI_ManRelSta a LEFT JOIN (");
            for (int i = 0; i < list.Count; i++)
            {
                if (i > 0)
                    strSql.Append(" UNION ");
                strSql.AppendFormat(@" SELECT {0} as TID,{1} as StageID,{2} as SubjectID,0 as MaterialID ", TID, list[i].StageID, list[i].SubjectID);
            }
            strSql.Append(@") as b on a.TID=b.TID AND a.StageID=b.StageID AND a.SubjectID=b.SubjectID  WHERE a.TID=@TID and b.TID IS NULL;");


            strSql.Append(@"INSERT INTO EI_ManRelSta ( TID,StageID,SubjectID,MaterialID)");
            strSql.Append(@" SELECT DISTINCT b.TID,b.StageID,b.SubjectID,b.MaterialID FROM EI_ManRelSta a RIGHT JOIN ( ");
            for (int i = 0; i < list.Count; i++)
            {
                if (i > 0)
                    strSql.Append(" UNION ");
                strSql.AppendFormat(@" SELECT {0} as TID,{1} as StageID,{2} as SubjectID,'0' as MaterialID ", TID, list[i].StageID, list[i].SubjectID);
            }
            strSql.Append(@") as b on a.TID=b.TID AND a.StageID=b.StageID AND a.SubjectID=b.SubjectID WHERE b.TID=@TID and a.TID IS  NULL;");
            if (para.IsCheckAcastru)
            {
                strSql.AppendFormat(@"UPDATE EI_ManRelSta set MaterialID=0 WHERE TID=@TID AND StageID IN (1,2);");
                strSql.AppendFormat(@"UPDATE EI_ManagerInfo SET AcaStru=@AcaStru WHERE AccountNumber=@TID;");
            }
            if (para.IsCheckArtsciences)
            {
                strSql.AppendFormat(@"UPDATE EI_ManRelSta set MaterialID=0 WHERE TID=@TID AND StageID=3;");
                strSql.AppendFormat(@"UPDATE EI_ManagerInfo SET ArtSciences=@ArtSciences WHERE AccountNumber=@TID;");
            }
            //if ((!para.IsCheckAcastru) && (!para.IsCheckArtsciences))
            //{
            //    strSql.AppendFormat(@"UPDATE EI_ManagerInfo SET IsTeach=@IsTeach WHERE AccountNumber=@TID;");
            //}
            //
            var _name = string.Empty;
            switch (list.First().SubjectID.Value)
            {
                case 1: _name = "语文"; break;
                case 2: _name = "数学"; break;
                case 3: _name = "英语"; break;
                case 4: _name = "物理"; break;
                case 5: _name = "化学"; break;
                case 6: _name = "地理"; break;
                case 7: _name = "历史"; break;
                case 8: _name = "政治"; break;
                case 9: _name = "生物"; break;
                default:
                    break;
            }
            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format(@"修改科目"), TID.ToString()));
            return MySQLHelper.ExecuteStatement(strSql.ToString(), parameters).ToString();
        }

        /// <summary>
        /// 更新老师选课
        /// </summary>
        /// <param name="eI_Base">选课</param>
        /// <returns></returns>
        public List<ManRelStaModel> GetTeacherSelect(EI_Base<EI_ManRelSta> eI_Base)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT a.StageID,a.SubjectID,a.MaterialID,b.Mversion,c.AcaStru FROM EI_ManRelSta a inner join EI_ManagerInfo c on a.TID=c.AccountNumber ");
            strSql.Append(@" LEFT JOIN EI_Material b ON a.MaterialID=b.ID");
            strSql.Append(@" WHERE a.TID=@TID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.TID.Value}
            };
            return MySQLHelper.ExecuteStatement<ManRelStaModel>(strSql.ToString(), (a) =>
            {
                ManRelStaModel dto = new ManRelStaModel()
                {
                    TID = eI_Base.dto.TID,
                    StageID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    SubjectID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    MaterialID = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    MaterialIDName = a.IsDBNull(3) ? "空" : a.GetString(3),
                    AcaStru = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    TempID = (a.IsDBNull(1) ? 0 : a.GetInt32(1)) == 2 ? 0 : (a.IsDBNull(1) ? 0 : a.GetInt32(1))
                };
                if (dto.StageID == 3)//高中
                    dto.AcaStru = 0;
                return dto;
            }, parameters).OrderBy(a => a.StageID).ThenBy(b => b.TempID).ToList();
        }

        /// <summary>
        /// 更新老师选课
        /// </summary>
        /// <param name="eI_Base">选课</param>
        /// <returns></returns>
        public string SaveTeacherSelect(int TID, List<ManRelStaModel> list)
        {
            MySqlParameter[] parameters = new MySqlParameter[]
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=TID}
            };
            StringBuilder strSql = new StringBuilder();

            if (list.Count > 0)
            {
                strSql.Append(@" UPDATE  EI_ManRelSta a INNER JOIN (");

                for (int i = 0; i < list.Count; i++)
                {
                    if (i > 0)
                        strSql.Append(" UNION ");
                    strSql.AppendFormat(@" SELECT {0} as TID,{1} as StageID,{2} as SubjectID,'{3}' as MaterialID ", TID, list[i].StageID, list[i].SubjectID, list[i].MaterialID);
                }

                strSql.Append(@") as b on a.TID=b.TID AND a.StageID=b.StageID AND a.SubjectID=b.SubjectID SET a.MaterialID=b.MaterialID WHERE a.TID=@TID;");
                //删除表EI_Material中数据(为了防止名称修改)

                strSql.Append("DELETE a FROM EI_Material a INNER JOIN (");
                for (int i = 0; i < list.Count; i++)
                {
                    if (i > 0)
                        strSql.Append(" UNION ");
                    strSql.AppendFormat(@"SELECT '{0}' as ID", list[i].MaterialID);
                }
                strSql.Append(@") as b on a.ID=b.ID;");

                var _list = list.Where(k => k.MaterialID != "0" && k.MaterialIDName != "空").Select(a => new { MaterialID = a.MaterialID, MaterialIDName = a.MaterialIDName }).Distinct().ToList();
                if (_list.Count > 0)
                {
                    //添加表中数据
                    strSql.Append(@"INSERT INTO EI_Material(ID,Mversion,CreateTime,DelFlag) VALUES ");
                }
                for (int i = 0; i < _list.Count; i++)
                {
                    if (i == 0) strSql.AppendFormat(@"('{0}','{1}','{2}',{3})", _list[i].MaterialID, _list[i].MaterialIDName, DateTime.Now, 0);
                    else
                        strSql.AppendFormat(@",('{0}','{1}','{2}',{3})", _list[i].MaterialID, _list[i].MaterialIDName, DateTime.Now, 0);
                }
                strSql.Append(@";");
                if (list.Where(a => a.MaterialIDName.Trim() != "空").Count() > 0)
                {
                    strSql.Append(new TeachDiaryDal().SaveDiary(string.Format(@"修改教材【{0}】", list.Where(a => a.MaterialIDName.Trim() != "空").First().MaterialIDName), TID.ToString()));
                }
                return MySQLHelper.ExecuteSql(strSql.ToString(), parameters).ToString();
            }
            return "1";
        }

        /// <summary>
        /// 选择课程
        /// </summary>
        /// <returns></returns>
        public List<EI_Material> GetMaterial()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT ID,Mversion,DelFlag FROM EI_Material;");
            return MySQLHelper.ExecuteStatement<EI_Material>(strSql.ToString(), (a) =>
            {
                return new EI_Material()
                {
                    ID = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                    Mversion = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    DelFlag = a.IsDBNull(2) ? 0 : a.GetInt32(2)
                };
            }, null);
        }

        public List<TeacherBaseModel> TeacherBaseIndex(EI_Base<EI_ManagerInfo> eI_Base)
        {
            StringBuilder strSql = new StringBuilder();
            List<TeacherBaseModel> list = new List<TeacherBaseModel>();
            strSql.Append(@"
SELECT a.`Name`,CASE WHEN a.Gender=0 THEN '男' WHEN a.Gender=1 THEN '女' ELSE '未知' END as GenderName,
a.Phone,a.Postion,
CASE WHEN a.UType=0 THEN '超级管理员' WHEN a.UType=1 THEN '普通管理员' WHEN a.UType=2 THEN '教师' WHEN a.UType=3 THEN '咨询师' ELSE '' END as UTypeName,a.IsTeach,a.UType,a.CreateTime
FROM EI_ManagerInfo as a
WHERE a.AccountNumber=@TID and a.OrgID=@OrgID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.AccountNumber},
                new MySqlParameter("@OrgID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.OrgID}
            };
            list = MySQLHelper.ExecuteStatement<TeacherBaseModel>(strSql.ToString(), (a) =>
            {
                return new TeacherBaseModel()
                {
                    AccountNumber = eI_Base.dto.AccountNumber,
                    Name = a.IsDBNull(0) ? string.Empty : a.GetString(0),
                    GenderName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    Phone = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    Postion = a.IsDBNull(3) ? string.Empty : a.GetString(3),
                    UTypeName = a.IsDBNull(4) ? string.Empty : a.GetString(4),
                    IsTeach = a.IsDBNull(5) ? 0 : a.GetInt32(5),
                    UType = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                    CreateTime = a.IsDBNull(7) ? DateTime.MinValue : a.GetDateTime(7)
                };
            }, parameters).ToList();
            strSql.Clear();

            strSql.Append(@"SELECT DISTINCT b.`Name` FROM EI_GRelM a INNER JOIN EI_GroupInfo b on a.GID=b.ID
WHERE a.TID=@TID and  b.OrgID=@OrgID and b.DelFlag=0;");
            if (list.Count > 0)
            {
                list.First().GroupStr = MySQLHelper.ExecuteStatement<string>(strSql.ToString(), (a) =>
                {
                    return a.IsDBNull(0) ? string.Empty : a.GetString(0);
                }, parameters).ToList();
            }

            strSql.Clear();
            strSql.Append("SELECT S.MfgID AS MfgID,S.NAME AS NAME FROM EI_StudentInfo S LEFT JOIN EI_MRelS M ON S.MfgID=M.SID  ");
            strSql.Append(" Where M.TID=@TID AND OrgID=@OrgID and s.DelFlag=0; ");
            if (list.Count > 0)
            {
                list.First().StrudengStr = MySQLHelper.ExecuteStatement<string>(strSql.ToString(), (a) =>
                {
                    return a.IsDBNull(1) ? string.Empty : a.GetString(1);
                }, parameters).ToList();


            }
            return list;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="eI_Base"></param>
        /// <returns></returns>
        public string SavePW(EI_Base<TeacherBaseModel> eI_Base)
        {
            MySqlParameter[] parameters = new MySqlParameter[]
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.AccountNumber},
                new MySqlParameter("@Pwd", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.Pwd},
                new MySqlParameter("@Pwd2", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.newPW}
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" UPDATE EI_ManagerInfo set Pwd=@Pwd2 WHERE AccountNumber=@TID AND Pwd=@Pwd;");

            var i = MySQLHelper.ExecuteSql(strSql.ToString(), parameters).ToString();
            if (i == "1")
            {
                strSql.Clear();
                strSql.Append(new TeachDiaryDal().SaveDiary("修改密码", eI_Base.dto.AccountNumber.ToString()));
                MySQLHelper.ExecuteSql(strSql.ToString(), parameters).ToString();
            }
            return i;
        }

        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <param name="tname"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool RestePwd(int accountNumber, string tname, string userId)
        {

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@TID", MySqlDbType.Int32)
                };
            parameters[0].Value = accountNumber;
            var strSql = new StringBuilder();
            strSql.Append(@" UPDATE EI_ManagerInfo set Pwd='000000' WHERE AccountNumber=@TID;");
            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format("重置老师密码【{0}】", tname), userId));
            var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            return false;
        }

        public KnowledgeModel GetTeach(KnowledgeModel dto)
        {
            KnowledgeModel list = new KnowledgeModel();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT a.AcaStru,a.ArtSciences FROM EI_ManagerInfo a WHERE a.AccountNumber=@AccountNumber;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
              new MySqlParameter("@AccountNumber", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=dto.UID}
            };
            list = MySQLHelper.ExecuteStatement<KnowledgeModel>(strSql.ToString(), (a) =>
            {
                return new KnowledgeModel()
                {
                    UID = dto.UID,
                    AcaStru = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    ArtSciences = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                };
            }, parameters).FirstOrDefault();
            return list;
        }


        public ReponseData SaveBook(TempStudentInfoModel para)
        {
            ReponseData dto = new ReponseData() { Code = Guid.NewGuid().ToString(), ID = Guid.NewGuid().ToString() };
            List<MySqlParameter> parameters = new List<MySqlParameter>
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID},
                new MySqlParameter("@Name", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=para.Name},
                new MySqlParameter("@Phone", MySqlDbType.VarChar,20){ Direction=ParameterDirection.InputOutput, Value=para.Phone},
                new MySqlParameter("@TrainAim", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TrainAim},
                new MySqlParameter("@CreateTime", MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput, Value=DateTime.Now},
                new MySqlParameter("@DelFlag", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=0},
                new MySqlParameter("@Remark", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=string.Empty},
                //new MySqlParameter("@StageID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.StageID},
                //new MySqlParameter("@SubjectID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.SubjectID},
                new  MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.Code},
                new  MySqlParameter("@ReturnID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.ID},
                //new  MySqlParameter("@GradeID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.GradeID},
                new  MySqlParameter("@Gender", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.Gender},
                new  MySqlParameter("@Age", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.Age},
                new  MySqlParameter("@School", MySqlDbType.VarChar,51){ Direction=ParameterDirection.InputOutput,Value=para.School},
                new  MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.ExamID},
                new  MySqlParameter("@Adddress", MySqlDbType.VarChar,255){ Direction=ParameterDirection.InputOutput,Value=para.Adddress},
                new MySqlParameter("@MeasureVersion",MySqlDbType.Byte,1){Direction=ParameterDirection.InputOutput,Value=para.MeasureVersion}
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"insert into EI_TempStudentInfo(ID,TID,Name, Phone, TrainAim, CreateTime, DelFlag, Remark,GradeID,StageID,Gender,Age,School,Adddress,IsEffect,MeasureVersion) 
            select @ReturnID,@TID,@Name,@Phone,@TrainAim,@CreateTime,@DelFlag,@Remark,GradeID,StageID,@Gender,@Age,@School,@Adddress,0,@MeasureVersion from EI_TestExam where ExamID=@ExamID;
            INSERT INTO EI_TestAnalyze(ID, SID, StageID, SubjectID, CreateTime, DelFlag, Remark,ScheduledTime,GradeID,ExamID,MaterialID,Mversion,MeasureVersion) 
            select @ID,@ReturnID,StageID,SubjectID,@CreateTime,0,'',ScheduledTime,GradeID,@ExamID,MaterialID,Mversion,3  from EI_TestExam where ExamID=@ExamID;

            INSERT INTO EI_TARelKno(TAID, KID, KnowledgeName, ClassHour,DefaultHour, DiffNum)
            select @ID,KID,KnowledgeName,ClassHour,DefaultHour,DiffNum from EI_TestExamKnow where ExamID=@ExamID;
            insert into EI_TARelItem(TAID,KID,ItemID,DiffNum,SequenceID,ItemSource,PointID,PointName) 
            select @ID,KID,ItemID,DiffNum,SequenceID,ItemSource,PointID,PointName from EI_TestExamItem where ExamID=@ExamID;");
            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format(@"安排知识测评【{0}】", para.Name), para.TID.ToString()));
            dto.Result = MySQLHelper.ExecuteStatement(strSql.ToString(), parameters).ToString();
            return dto;
            //dto.ID = parameters[10].Value.ToString();
        }

        /// <summary>
        /// 保存学生测评信息
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        public ReponseData SaveStuInfo(TempStudentInfoModel para)
        {
            ReponseData dto = new ReponseData() { Code = Guid.NewGuid().ToString(), ID = Guid.NewGuid().ToString() };


            #region 测评时间
            string scheduledTimeSql = "SELECT ceiling(5 * (SELECT count(1) from ei_exam_item WHERE IsEnable=1 And FIND_IN_SET (DimID ,@DimIDs ))/60)";
            int ScheduledTime = 0;
            MySQLHelper.ExecuteStatementList(scheduledTimeSql,
               (a) =>
               {
                   while (a.Read())
                   {
                       ScheduledTime = a.GetInt32(0);
                   }

               }, new List<MySqlParameter>() { (new MySqlParameter("@DimIDs", MySqlDbType.VarChar, 2000) { Direction = ParameterDirection.InputOutput, Value = para.DimIDs }) });
            para.ScheduledTime = ScheduledTime;
            #endregion



            List<MySqlParameter> parameters = new List<MySqlParameter>
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID},
                new MySqlParameter("@Name", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=para.Name},
                new MySqlParameter("@Phone", MySqlDbType.VarChar,20){ Direction=ParameterDirection.InputOutput, Value=para.Phone},
                new MySqlParameter("@TrainAim", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TrainAim},
                new MySqlParameter("@CreateTime", MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput, Value=DateTime.Now},
                new MySqlParameter("@DelFlag", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=0},
                new MySqlParameter("@Remark", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=string.Empty},
                //new MySqlParameter("@StageID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.StageID},
                //new MySqlParameter("@SubjectID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.SubjectID},
                new  MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.Code},
                new  MySqlParameter("@ReturnID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.ID},
                //new  MySqlParameter("@GradeID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.GradeID},
                new  MySqlParameter("@Gender", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.Gender},
                new  MySqlParameter("@Age", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.Age},
                new  MySqlParameter("@School", MySqlDbType.VarChar,51){ Direction=ParameterDirection.InputOutput,Value=para.School},
                new  MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.ExamID},
                new  MySqlParameter("@Adddress", MySqlDbType.VarChar,255){ Direction=ParameterDirection.InputOutput,Value=para.Adddress},
                new MySqlParameter("@ScheduledTime",MySqlDbType.Float,8){Direction=ParameterDirection.InputOutput,Value=para.ScheduledTime},
                new MySqlParameter("@MeasureVersion",MySqlDbType.Byte,1){Direction=ParameterDirection.InputOutput,Value=para.MeasureVersion}
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"insert into EI_TempStudentInfo(ID,TID,Name, Phone, TrainAim, CreateTime, DelFlag, Remark,GradeID,StageID,Gender,Age,School,Adddress,IsEffect,MeasureVersion) 
            values (@ReturnID,@TID,@Name,@Phone,@TrainAim,@CreateTime,@DelFlag,@Remark,0,0,@Gender,@Age,@School,@Adddress,0,@MeasureVersion);

            INSERT INTO EI_TestAnalyze(ID, SID, StageID, SubjectID, CreateTime, DelFlag, Remark,ScheduledTime,GradeID,ExamID,MaterialID,Mversion,MeasureVersion) 
            values  ( @ID,@ReturnID,0,0,@CreateTime,0,'',@ScheduledTime,0,@ExamID,'','' ,2);");
            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format(@"安排知识测评【{0}】", para.Name), para.TID.ToString()));
            dto.Result = MySQLHelper.ExecuteStatement(strSql.ToString(), parameters).ToString();
            dto.Code = para.ScheduledTime.ToString();
            //dto.ID = parameters[10].Value.ToString();
            return dto;
        }

        //public ReponseData SaveBook(TempStudentInfoModel para)
        //{
        //    ReponseData dto = new ReponseData() { Code = Guid.NewGuid().ToString(), ID = Guid.NewGuid().ToString() };
        //    MySqlParameter[] parameters = new MySqlParameter[]
        //    {
        //        new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID},
        //        new MySqlParameter("@Name", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=para.Name},
        //        new MySqlParameter("@Phone", MySqlDbType.VarChar,20){ Direction=ParameterDirection.InputOutput, Value=para.Phone},
        //        new MySqlParameter("@TrainAim", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TrainAim},
        //        new MySqlParameter("@CreateTime", MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput, Value=DateTime.Now},
        //        new MySqlParameter("@DelFlag", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=0},
        //        new MySqlParameter("@Remark", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=string.Empty},
        //        new MySqlParameter("@StageID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.StageID},
        //        new MySqlParameter("@SubjectID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.SubjectID},
        //        new  MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.Code},
        //        new  MySqlParameter("@ReturnID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=dto.ID},
        //        new  MySqlParameter("@GradeID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.GradeID},
        //        new  MySqlParameter("@Gender", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.Gender},
        //        new  MySqlParameter("@Age", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.Age},
        //        new  MySqlParameter("@School", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput,Value=para.School}
        //    };
        //    StringBuilder strSql = new StringBuilder();
        //    strSql.Append(@"insert into EI_TempStudentInfo(ID,TID,Name, Phone, TrainAim, CreateTime, DelFlag, Remark,GradeID,StageID,Gender,Age,School) values (@ReturnID,@TID,@Name,@Phone,@TrainAim,@CreateTime,@DelFlag,@Remark,@GradeID,@StageID,@Gender,@Age,@School);");
        //    strSql.Append(@"INSERT INTO EI_TestAnalyze(ID, SID, StageID, SubjectID, CreateTime, DelFlag, Remark,GradeID) VALUES(@ID,@ReturnID,@StageID,@SubjectID,@CreateTime,0,'',@GradeID);");
        //    strSql.Append(@"INSERT INTO EI_TARelKno(TAID, KID, KnowledgeName, ClassHour, DiffNum) VALUES");
        //    if (para.dto != null && para.dto.Count > 0)
        //    {
        //        for (int i = 0; i < para.dto.Count; i++)
        //        {
        //            if (i == 0)
        //            {
        //                strSql.AppendFormat(@"(@ID,'{0}','{1}',0,0)", para.dto[i].KID, para.dto[i].KnowledgeName);
        //            }
        //            else
        //            {
        //                strSql.AppendFormat(@",(@ID,'{0}','{1}',0,0)", para.dto[i].KID, para.dto[i].KnowledgeName);
        //            }
        //        }
        //    }
        //    strSql.Append(@";");
        //    dto.Result = MySQLHelper.ExecuteSql(strSql.ToString(), parameters).ToString();
        //    dto.ID = parameters[10].Value.ToString();
        //    return dto;
        //}

        public ReponseData SaveBookExam(TempStudentInfoModel para)
        {

            ReponseData dto = new ReponseData();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=para.TID},
                new MySqlParameter("@ExamName", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=para.Name},
                new MySqlParameter("@StageID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.StageID},
                new MySqlParameter("@SubjectID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.SubjectID},
                new  MySqlParameter("@GradeID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput,Value=para.GradeID},
            };
            StringBuilder strSql = new StringBuilder();

            strSql.Append("select  A.TID AS TID,A.StageID AS StageID,  A.SubjectID AS SubjectID,A.MaterialID AS MaterialID,B.Mversion AS Mversion from EI_ManRelSta A INNER JOIN EI_Material B  ");
            strSql.Append(" ON  A.MaterialID=B.ID WHERE A.TID=@TID AND A.StageID=@StageID AND A.SubjectID=@SubjectID");

            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            var MaterialID = string.Empty;
            var Mversion = string.Empty;
            if (ds.Tables[0].Rows.Count > 0)
            {
                MaterialID = ds.Tables[0].Rows[0]["MaterialID"].ToString();
                Mversion = ds.Tables[0].Rows[0]["Mversion"].ToString();
            }

            strSql.Clear();
            strSql.AppendFormat(@"insert into EI_TestExam(ExamName,TID,LastTID,StageID,GradeID,SubjectID,MaterialID,Mversion,ExamVersion) values(@ExamName,@TID,@TID,@StageID,@GradeID,@SubjectID,'{0}','{1}',2);", MaterialID, Mversion);
            strSql.Append(@"select @@identity;");
            strSql.Append(@"insert into EI_TestExamKnow(ExamID,KID,KnowledgeName) values");
            if (para.dto != null && para.dto.Count > 0)
            {
                for (int i = 0; i < para.dto.Count; i++)
                {
                    if (i == 0)
                    {
                        strSql.AppendFormat(@"(@@identity,'{0}','{1}')", para.dto[i].KID, para.dto[i].KnowledgeName);
                    }
                    else
                    {
                        strSql.AppendFormat(@",(@@identity,'{0}','{1}')", para.dto[i].KID, para.dto[i].KnowledgeName);
                    }
                }
            }
            strSql.Append(@";");
            dto.ID = MySQLHelper.ExecuteStatementList<Int64>(strSql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    Int64 i = 0;
                    while (a.Read())
                    {
                        i = a.GetInt64(0);
                    }
                    return i;
                }
                else
                    return 0;
            }, parameters).ToString();
            return dto;
        }

        public ReponseData SaveItem(TempTARelModel para)
        {
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.VarChar,45){ Direction=ParameterDirection.InputOutput, Value=para.TID.ToString()},
                new MySqlParameter("@ExamName", MySqlDbType.VarChar,200){ Direction=ParameterDirection.InputOutput, Value=para.TestName},
                new MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=Convert.ToInt32(para.ListB.First().TAID)},
                new MySqlParameter("@ScheduledTime", MySqlDbType.Float,8){ Direction=ParameterDirection.InputOutput, Value=para.ScheduledTime},
            };
            ReponseData dto = new ReponseData();
            StringBuilder strSql = new StringBuilder();
            if (para.ListB != null && para.ListB.Count > 0)
            {
                strSql.Append(@"UPDATE EI_TestExamKnow a set a.IsUse=0 where a.ExamID=@ExamID;");
                strSql.Append(@" UPDATE EI_TestExamKnow a INNER JOIN(");
                for (int i = 0; i < para.ListB.Count; i++)
                {
                    if (i > 0)
                    {
                        strSql.Append(" UNION ");
                    }
                    strSql.AppendFormat(@"SELECT '{0}' as ExamID,'{1}' as KID, {2} as ClassHour,{3} as DefaultHour", para.ListB[i].TAID, para.ListB[i].KID, para.ListB[i].ClassHour, para.ListB[i].DefaultHour);
                }
                strSql.Append(@") as b on a.ExamID=b.ExamID and a.KID=b.KID set a.ClassHour=b.ClassHour,a.DefaultHour=b.DefaultHour,a.IsUse=1;");
            }
            strSql.AppendFormat(@"DELETE FROM EI_TestExamItem WHERE ExamID='{0}' and ItemSource=0;", para.ListB.First().TAID);
            strSql.Append(@"INSERT INTO EI_TestExamItem(ExamID, KID, ItemID, DiffNum, SequenceID, ItemSource,PointID,PointName) VALUES");
            if (para.ListA != null && para.ListA.Count > 0)
            {
                for (int i = 0; i < para.ListA.Count; i++)
                {
                    if (i == 0)
                    {
                        strSql.AppendFormat(@"('{0}','{1}',{2},{3},{4},{5},'{6}','{7}')", para.ListA[i].TAID, para.ListA[i].KID, para.ListA[i].ItemID, para.ListA[i].DiffNum, para.ListA[i].SequenceID, para.ListA[i].ItemSource, para.ListA[i].PointID, para.ListA[i].PointName);
                    }
                    else
                    {
                        strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5},'{6}','{7}')", para.ListA[i].TAID, para.ListA[i].KID, para.ListA[i].ItemID, para.ListA[i].DiffNum, para.ListA[i].SequenceID, para.ListA[i].ItemSource, para.ListA[i].PointID, para.ListA[i].PointName);
                    }
                }
            }
            strSql.Append(@";");
            strSql.AppendFormat(@"update EI_TestExam set IsEnable=1,ScheduledTime=@ScheduledTime,ExamName=@ExamName,LastUpdateTime='{0}',LastTID=@TID where ExamID=@ExamID;", DateTime.Now);
            dto.Result = MySQLHelper.ExecuteStatement(strSql.ToString(), parameters).ToString();
            return dto;
        }

        //public ReponseData SaveItem(TempTARelModel para)
        //{
        //    ReponseData dto = new ReponseData();
        //    StringBuilder strSql = new StringBuilder();
        //    if (para.ListB != null && para.ListB.Count > 0)
        //    {
        //        strSql.Append(@" UPDATE EI_TARelKno a INNER JOIN(");
        //        for (int i = 0; i < para.ListB.Count; i++)
        //        {
        //            if (i > 0)
        //            {
        //                strSql.Append(" UNION ");
        //            }
        //            strSql.AppendFormat(@"SELECT '{0}' as TAID,'{1}' as KID, {2} as ClassHour,{3} as DefaultHour", para.ListB[i].TAID, para.ListB[i].KID, para.ListB[i].ClassHour, para.ListB[i].DefaultHour);
        //        }
        //        strSql.Append(@") as b on a.TAID=b.TAID and a.KID=b.KID set a.ClassHour=b.ClassHour,a.DefaultHour=b.DefaultHour;");
        //    }
        //    strSql.AppendFormat(@"DELETE FROM EI_TARelItem WHERE TAID='{0}' and ItemSource=0;", para.ListB.First().TAID);
        //    strSql.Append(@"INSERT INTO EI_TARelItem(TAID, KID, ItemID, DiffNum, SequenceID, ItemSource) VALUES");
        //    if (para.ListA != null && para.ListA.Count > 0)
        //    {
        //        for (int i = 0; i < para.ListA.Count; i++)
        //        {
        //            if (i == 0)
        //            {
        //                strSql.AppendFormat(@"('{0}','{1}',{2},{3},{4},{5})", para.ListA[i].TAID, para.ListA[i].KID, para.ListA[i].ItemID, para.ListA[i].DiffNum, para.ListA[i].SequenceID, para.ListA[i].ItemSource);
        //            }
        //            else
        //            {
        //                strSql.AppendFormat(@",('{0}','{1}',{2},{3},{4},{5})", para.ListA[i].TAID, para.ListA[i].KID, para.ListA[i].ItemID, para.ListA[i].DiffNum, para.ListA[i].SequenceID, para.ListA[i].ItemSource);
        //            }
        //        }
        //    }
        //    strSql.Append(@";");
        //    dto.Result = MySQLHelper.ExecuteSql(strSql.ToString()).ToString();
        //    return dto;
        //}

        /// <summary>
        /// 判断是否存在阶段科目信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool IsExitRelSub(int tid, int stageid, int subjectid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select TID,StageID,SubjectID from EI_ManRelSta where TID=@TID AND StageID=@StageID AND SubjectID=@SubjectID ");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.Int32,40),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,11)
                                          };
            parameters[0].Value = tid;
            parameters[1].Value = stageid;
            parameters[2].Value = subjectid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            return ds.Tables[0].Rows.Count > 0;
        }

        /// <summary>
        /// 向阶段科目对应表中插入数据
        /// </summary>
        /// <returns></returns>
        public bool InsertManRelStaList(List<ManRelStaModel> model, int tid, int flag)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat(@"DELETE FROM EI_ManRelSta WHERE TID='{0}';", tid);
            if (model.Count > 0)
            {
                foreach (var item in model)
                {
                    strSql.AppendFormat(@"INSERT INTO EI_ManRelSta(TID,StageID, SubjectID, MaterialID) VALUES({0},{1},{2},'{3}'); ", tid, item.StageID, item.SubjectID, item.MaterialID);
                }
            }
            if (flag == 1)
            {
                strSql.AppendFormat("UPDATE EI_ManRelSta Set MaterialID=0 Where TID={0};", tid);
            }
            return MySQLHelper.ExecuteSql(strSql.ToString()) > 0;

        }



        public bool ValidatePW(EI_Base<TeacherBaseModel> eI_Base)
        {
            bool ok = false;
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.AccountNumber},
                new MySqlParameter("@Pwd", MySqlDbType.VarChar,50){ Direction=ParameterDirection.InputOutput, Value=eI_Base.dto.Pwd},
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" select Pwd from EI_ManagerInfo WHERE AccountNumber=@TID AND Pwd=@Pwd;");
            MySQLHelper.ExecuteStatementList<string>(strSql.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        ok = true;
                    }
                }
                return null;
            }, parameters);
            return ok;
        }
    }
}
