/*
 * author:谢利民;
 * function:公告表【EI_Announcement】操作的功能
 * adddate:2015-04-19
 * updatedate:2015-04-19
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
    /// ExamDal:考卷表【EI_Exam】在线考试操作的功能
    /// </summary>
    public class ExamDal
    {
        #region 私有变量
        private CommonDal _commonDal = new CommonDal();//公用的Dal  
        #endregion

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_Exam");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        #region 增加一条数据(试卷)
        /// <summary>
        /// 增加一条数据学生考试
        /// </summary>
        public bool Add(EI_Exam model)
        {
            #region 添加job到redis
            var keyValues = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("ID",        model.ID),
                new KeyValuePair<string, string>("Name",      model.Name),
                new KeyValuePair<string, string>("GradeID",   model.GradeID.ToString()),
                new KeyValuePair<string, string>("SubjectID", model.SubjectID.ToString()),
                new KeyValuePair<string, string>("EndTime",   model.EndTime.ToString()),
                new KeyValuePair<string, string>("State",     model.State.ToString()),
                new KeyValuePair<string, string>("TID",       model.TID),
                new KeyValuePair<string, string>("CreateTime",model.CreateTime.ToString()),
                new KeyValuePair<string, string>("DelFlag",   model.DelFlag.ToString()),
                new KeyValuePair<string, string>("Remark",    string.IsNullOrEmpty(model.Remark)?"":model.Remark),
                new KeyValuePair<string, string>("ExamTime",   model.ExamTime.ToString()),
                new KeyValuePair<string, string>("StageID",   model.StageID.ToString())
                                          };

            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, model.ID, keyValues);
            #endregion
            #region Redis之前代码

            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("insert into EI_Exam(");
            //strSql.Append("ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,ExamTime,StageID)");
            //strSql.Append(" values (");
            //strSql.Append("@ID,@Name,@GradeID,@SubjectID,@EndTime,@State,@TID,@CreateTime,@DelFlag,@Remark,@ExamTime,@StageID)");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@ID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@Name", MySqlDbType.VarChar,50),
            //        new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
            //        new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
            //        new MySqlParameter("@EndTime", MySqlDbType.DateTime),
            //        new MySqlParameter("@State", MySqlDbType.Int32,1),
            //        new MySqlParameter("@TID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
            //        new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
            //        new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
            //        new MySqlParameter("@ExamTime", MySqlDbType.Int32,11),
            //         new MySqlParameter("@StageID", MySqlDbType.Int32,11)
            //                              };
            //parameters[0].Value = model.ID;
            //parameters[1].Value = model.Name;
            //parameters[2].Value = model.GradeID;
            //parameters[3].Value = model.SubjectID;
            //parameters[4].Value = model.EndTime;
            //parameters[5].Value = model.State;
            //parameters[6].Value = model.TID;
            //parameters[7].Value = model.CreateTime;
            //parameters[8].Value = model.DelFlag;
            //parameters[9].Value = model.Remark;
            //parameters[10].Value = model.ExamTime;
            //parameters[11].Value = model.StageID;

            //int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            //if (rows > 0)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}
            #endregion
        }


        /// <summary>
        /// 添加一条数据(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddTea(EI_Exam model)
        {
            #region 添加job到redis
            var keyValues = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("ID",        model.ID),
                new KeyValuePair<string, string>("Name",      model.Name),
                new KeyValuePair<string, string>("GradeID",   model.GradeID.ToString()),
                new KeyValuePair<string, string>("SubjectID", model.SubjectID.ToString()),
                new KeyValuePair<string, string>("TID",       model.TID),
                new KeyValuePair<string, string>("CreateTime",DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                new KeyValuePair<string, string>("UpdateTime",DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                new KeyValuePair<string, string>("ExamTime",   model.ExamTime.ToString()),
                new KeyValuePair<string, string>("StageID",   model.StageID.ToString())
                                          };

            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, model.ID, keyValues);
            #endregion
            #region Redis之前代码
            //StringBuilder strSql = new StringBuilder();
            //strSql.Append("insert into ei_tea_exambook( ");
            //strSql.Append("ID,Name,TID,StageID,GradeID,SubjectID,ExamTime,CreateTime,UpdateTime )");
            //strSql.Append(" values (");
            //strSql.Append("@ID,@Name,@TID,@StageID,@GradeID,@SubjectID,@ExamTime,@CreateTime,@UpdateTime)");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@ID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@Name", MySqlDbType.VarChar,50),
            //        new MySqlParameter("@TID", MySqlDbType.VarChar,40),
            //        new MySqlParameter("@StageID", MySqlDbType.Int32,11),
            //        new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
            //        new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
            //        new MySqlParameter("@ExamTime", MySqlDbType.Int32,40),
            //        new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
            //        new MySqlParameter("@UpdateTime", MySqlDbType.DateTime)
            //                              };
            //parameters[0].Value = model.ID;
            //parameters[1].Value = model.Name;
            //parameters[2].Value = model.TID;
            //parameters[3].Value = model.StageID;
            //parameters[4].Value = model.GradeID;
            //parameters[5].Value = model.SubjectID;
            //parameters[6].Value = model.ExamTime;
            //parameters[7].Value = DateTime.Now;
            //parameters[8].Value = DateTime.Now;

            //int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            //if (rows > 0)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //} 
            #endregion
        }



        #endregion

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_Exam model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Exam set ");
            strSql.Append("Name=@Name,");
            strSql.Append("GradeID=@GradeID,");
            strSql.Append("SubjectID=@SubjectID,");
            strSql.Append("EndTime=@EndTime,");
            strSql.Append("State=@State,");
            strSql.Append("TID=@TID,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
					new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
					new MySqlParameter("@EndTime", MySqlDbType.DateTime),
					new MySqlParameter("@State", MySqlDbType.Int32,1),
					new MySqlParameter("@TID", MySqlDbType.VarChar,40),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.Name;
            parameters[1].Value = model.GradeID;
            parameters[2].Value = model.SubjectID;
            parameters[3].Value = model.EndTime;
            parameters[4].Value = model.State;
            parameters[5].Value = model.TID;
            parameters[6].Value = model.CreateTime;
            parameters[7].Value = model.DelFlag;
            parameters[8].Value = model.Remark;
            parameters[9].Value = model.ID;

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
            strSql.Append("delete from EI_Exam ");
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
        /// 批量删除数据
        /// </summary>
        public bool DeleteList(string IDlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_Exam ");
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
        public EI_Exam GetModel(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark from EI_Exam ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            EI_Exam model = new EI_Exam();
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
        #region yangjin 根据作业ID获取考试信息 Redis
        public ExamModel GetExamInfo(string examId)
        {
            var examInfo = new ExamModel();
            if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, examId))
            {
                var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, examId);
                if (dicts.Count > 0)
                {
                    //Exam主表  
                    examInfo.ID = examId;
                    examInfo.Name = dicts["Name"];
                    examInfo.GradeID = string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
                    examInfo.SubjectID = string.IsNullOrEmpty(dicts["SubjectID"])
                        ? 0
                        : Convert.ToInt32(dicts["SubjectID"]);
                    examInfo.EndTime = string.IsNullOrEmpty(dicts["EndTime"])
                        ? DateTime.Now.AddDays(3)
                        : Convert.ToDateTime(dicts["EndTime"]);
                    examInfo.State = string.IsNullOrEmpty(dicts["State"]) ? 0 : Convert.ToInt32(dicts["State"]);
                    examInfo.TID = dicts["TID"];
                    examInfo.CreateTime = Convert.ToDateTime(dicts["CreateTime"]);
                    examInfo.ExamTime = Convert.ToInt32(dicts["ExamTime"]);
                    //作业题目
                    var jobItems =
                        dicts.Where(m => m.Key.Contains("Item_"))
                            .Select(m => m.Value.FromJsonTo<ERelItemModel>())
                            .ToList();
                    examInfo.ExamrelItemList = jobItems;
                    //布置对象
                    var stuItems = new List<ERelSModel>() { };
                    if (dicts.ContainsKey("studentObjs"))
                    {
                        stuItems = dicts["studentObjs"].Split('|').ToList().Select(m =>
                        {
                            var s = m.Split(',');
                            return new ERelSModel()
                            {
                                EID = examId,
                                SID = s[0],
                                StuState = 0,
                                SumeTime = 0,
                                Name = s[1]
                            };
                        }
                    ).ToList();

                    }
                    examInfo.ErelsList = stuItems;
                }


            }
            else
            {
                StringBuilder strSql = new StringBuilder();

                //Exam主表

                strSql.Append("select ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,StageID from EI_Exam ");
                strSql.Append(" where ID=@EID ");

                //Examitems
                strSql.Append("select EID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName,DiffNum,ItemSourceType,Score,PID from EI_ERelI");
                strSql.Append(" where EID=@EID Order By SequenceID  ");

                //Exam和学生关联
                strSql.Append("select EID,SID,StuState from EI_ERelS");
                strSql.Append(" where EID=@EID ");

                MySqlParameter[] parameters =
                {
                    new MySqlParameter("@EID", MySqlDbType.VarChar, 40)
                };
                parameters[0].Value = examId;
                DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
                examInfo = ModelConvertHelper<ExamModel>.ConvertToModel(ds.Tables[0]);
                var jobitems = ModelConvertHelper<ERelItemModel>.ConvertToModelList(ds.Tables[1]);
                examInfo.ExamrelItemList = jobitems;
                var stuitems = ModelConvertHelper<ERelSModel>.ConvertToModelList(ds.Tables[2]);
                examInfo.ErelsList = stuitems;

                var keyValues = new List<KeyValuePair<string, string>>()
                {
                    new KeyValuePair<string, string>("ID",        examInfo.ID),
                    new KeyValuePair<string, string>("Name",      examInfo.Name),
                    new KeyValuePair<string, string>("GradeID",   examInfo.GradeID.ToString()),
                    new KeyValuePair<string, string>("SubjectID", examInfo.SubjectID.ToString()),
                    new KeyValuePair<string, string>("EndTime",   examInfo.EndTime.ToString()),
                    new KeyValuePair<string, string>("State",     examInfo.State.ToString()),
                    new KeyValuePair<string, string>("TID",       examInfo.TID),
                    new KeyValuePair<string, string>("CreateTime",examInfo.CreateTime.ToString()),
                    new KeyValuePair<string, string>("DelFlag",   examInfo.DelFlag.ToString()),
                    new KeyValuePair<string, string>("Remark",    string.IsNullOrEmpty(examInfo.Remark)?"":examInfo.Remark),
                    new KeyValuePair<string, string>("ExamTime",   examInfo.ExamTime.ToString()),
                    new KeyValuePair<string, string>("StageID",   examInfo.StageID.ToString())
                };

                jobitems.ForEach(
                    m => keyValues.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));

                //布置对象
                RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, examInfo.ID, "studentObjs");
                if (stuitems != null)
                {
                    var stu = new StringBuilder();
                    stuitems.ForEach(
                        m => stu.Append(m.SID + "," + m.Name + "|"));
                    keyValues.Add(new KeyValuePair<string, string>("studentObjs", stu.ToString().TrimEnd('|')));
                }
                RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, examInfo.ID, keyValues);
            }

            return examInfo;
        }
        #endregion


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public EI_Exam DataRowToModel(DataRow row)
        {
            EI_Exam model = new EI_Exam();
            if (row != null)
            {
                if (row["ID"] != null)
                {
                    model.ID = row["ID"].ToString();
                }
                if (row["Name"] != null)
                {
                    model.Name = row["Name"].ToString();
                }
                if (row["GradeID"] != null && row["GradeID"].ToString() != "")
                {
                    model.GradeID = int.Parse(row["GradeID"].ToString());
                }
                if (row["SubjectID"] != null && row["SubjectID"].ToString() != "")
                {
                    model.SubjectID = int.Parse(row["SubjectID"].ToString());
                }
                if (row["EndTime"] != null && row["EndTime"].ToString() != "")
                {
                    model.EndTime = DateTime.Parse(row["EndTime"].ToString());
                }
                if (row["State"] != null && row["State"].ToString() != "")
                {
                    model.State = int.Parse(row["State"].ToString());
                }
                if (row["TID"] != null)
                {
                    model.TID = row["TID"].ToString();
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
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_Exam ");
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
            strSql.Append("select count(1) FROM EI_Exam ");
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
            strSql.Append(")AS Row, T.*  from EI_Exam T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }


        #region 获取考试列表(老师分页)
        /// <summary>
        /// 获取作业列表(老师分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetExamListByDic(Dictionary<string, object> dic)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }

            #region 作废
            //string strSqlCount = "";
            //StringBuilder strSqlList = new StringBuilder();
            //StringBuilder strSqlWhere = new StringBuilder();
            //string strSqlLimit = "";


            //strSqlCount = " SELECT Count(1) Count from EI_Exam ";

            //strSqlList.Append(" SELECT ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,StageID,DelFlag,Remark , ");

            //strSqlList.Append(" (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID) StuCount, ");//布置人数
            //strSqlList.Append(" (SELECT COUNT(1) FROM EI_ERelI WHERE EID=EI_Exam.ID) ItemCount, ");//题目数量
            //#region 年级
            //strSqlList.Append(" CASE WHEN GradeID=1 THEN '一年级' ");
            //strSqlList.Append(" WHEN GradeID=2 THEN '二年级' ");
            //strSqlList.Append(" WHEN GradeID=3 THEN '三年级' ");
            //strSqlList.Append(" WHEN GradeID=4 THEN '四年级' ");
            //strSqlList.Append(" WHEN GradeID=5 THEN '五年级' ");
            //strSqlList.Append(" WHEN GradeID=6 THEN '六年级' ");
            //strSqlList.Append(" WHEN GradeID=7 THEN '七年级' ");
            //strSqlList.Append(" WHEN GradeID=8 THEN '八年级' ");
            //strSqlList.Append(" WHEN GradeID=9 THEN '九年级' ");
            //strSqlList.Append(" WHEN GradeID=10 THEN '高一' ");
            //strSqlList.Append(" WHEN GradeID=11 THEN '高二' ");
            //strSqlList.Append(" WHEN GradeID=12 THEN '高三' ");
            //strSqlList.Append(" ELSE '' END GradeName, ");
            //#endregion

            //#region 科目
            //strSqlList.Append(" CASE WHEN SubjectID=1 THEN '语文' ");
            //strSqlList.Append(" WHEN SubjectID=2 THEN '数学' ");
            //strSqlList.Append(" WHEN SubjectID=3 THEN '英语' ");
            //strSqlList.Append(" WHEN SubjectID=4 THEN '物理' ");
            //strSqlList.Append(" WHEN SubjectID=5 THEN '化学' ");
            //strSqlList.Append(" WHEN SubjectID=6 THEN '地理' ");
            //strSqlList.Append(" WHEN SubjectID=7 THEN '历史' ");
            //strSqlList.Append(" WHEN SubjectID=8 THEN '政治' ");
            //strSqlList.Append(" WHEN SubjectID=9 THEN '生物' ");
            //strSqlList.Append(" ELSE '' END SubjectName, ");
            //#endregion
            //strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=1 )>0 ");
            //strSqlList.Append(" THEN 0 ELSE 1 END IsCorrecting ,");//有无批改  (0:有批改  1无批改)
            //strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=2 )>0 ");
            //strSqlList.Append(" THEN 0 ELSE 1 END IsAnalysis ");//有无分析  (0:有分析  1无分析)


            //strSqlList.Append(" from EI_Exam ");

            //#region 优化

            ////if (dictionary.ContainsKey("State"))
            ////{


            ////    if (Convert.ToInt32(dictionary["State"]) == 0) //0未批改，1已批改
            ////    {
            ////        strSqlWhere.Append(" INNER JOIN EI_ERelS c on ID=c.EID  ");
            ////        strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0  ");

            ////        strSqlWhere.Append(" AND c.StuState=1 ");
            ////    }
            ////    else
            ////    {
            ////        //strSqlWhere.Append(" and c.StuState=2 ");
            ////        strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0 AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID)>0 ");
            ////        strSqlWhere.Append(" AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=1 )=0 ");
            ////        strSqlWhere.Append(" AND ( (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=2 )>0  )");//OR EndTime<SYSDATE()
            ////    }
            ////}
            ////else
            ////{
            ////    strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0  ");
            ////    strSqlWhere.Append(" AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID)>0  ");


            ////}

            ////strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0 AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID)>0 ");
            //strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0 ");

            //if (dictionary.ContainsKey("State"))
            //{
            //    if (Convert.ToInt32(dictionary["State"]) == 0)//0未批改，1已批改
            //    {
            //        //strSqlWhere.Append(" AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=1 )>0 ");// StuState学生作业状态,0未提交，1已提交和2已批改
            //        strSqlWhere.Append(" AND State=1 ");
            //    }
            //    else
            //    {
            //        //strSqlWhere.Append(" AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=1 )=0 ");
            //        //strSqlWhere.Append(" AND ( (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=2 )>0  )");//OR EndTime<SYSDATE()
            //        strSqlWhere.Append(" AND State=2 ");
            //    }
            //}

            //#endregion



            //if (dictionary.ContainsKey("GradeID"))//
            //{
            //    strSqlWhere.Append(" AND GradeID=@GradeID ");
            //}

            //if (dictionary.ContainsKey("SubjectID"))
            //{
            //    strSqlWhere.Append(" AND SubjectID=@SubjectID ");
            //}
            //if (dictionary.ContainsKey("TID"))
            //{
            //    strSqlWhere.Append(" AND TID=@TID ");
            //}


            //if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            //{
            //    strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            //}
            ////dictionary.Add("Skip", dic["Skip"]);
            ////dictionary.Add("Take", dic["Take"]);

            //string strOrder = " ORDER BY EndTime DESC , CreateTime DESC ";
            //StringBuilder sb = new StringBuilder();

            ////总数
            //sb.Append(strSqlCount);
            //sb.Append(strSqlWhere);
            //sb.Append(";");

            ////分页
            //sb.Append(strSqlList);
            //sb.Append(strSqlWhere);
            //sb.Append(strOrder);
            //sb.Append(strSqlLimit);
            //sb.Append(";"); 
            #endregion

            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";


            strSqlCount = " SELECT Count(1) Count from EI_Exam ";

            strSqlList.Append(" select a.*,count(b.ID) ItemCount from ("); //题目数量 

            strSqlList.Append(" SELECT  ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,DelFlag,StageID,Remark,GradeName,SubjectName,");
            strSqlList.Append(" sum(StuState0),sum(StuState1),sum(StuState2),cast(sum(StuState1)+sum(StuState2) as signed)CompleteCount,cast(sum(StuState0+StuState1+StuState2) as signed)StuCount,  ");// StuState0 未提交  StuState1 已提交   StuState2 已批改  CompleteCount 已完成  StuCount 布置人数
            strSqlList.Append(" CASE WHEN sum(StuState1)>0 ");
            strSqlList.Append(" THEN 0 ELSE 1 END IsCorrecting ,");//有无批改  (0:有批改  1无批改)
            strSqlList.Append(" CASE WHEN sum(StuState2)>0 ");
            strSqlList.Append(" THEN 0 ELSE 1 END IsAnalysis  ");//有无分析  (0:有分析  1无分析)

            strSqlList.Append(" from (  "); //

            strSqlList.Append(" SELECT  ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,DelFlag,StageID,Remark,GradeName,SubjectName,");
            strSqlList.Append(" CASE x.StuState WHEN 0 THEN x.Count ELSE 0 END  StuState0,");
            strSqlList.Append(" CASE x.StuState WHEN 1 THEN x.Count ELSE 0 END  StuState1,");
            strSqlList.Append(" CASE x.StuState WHEN 2 THEN x.Count ELSE 0 END  StuState2 ");

            strSqlList.Append(" from (  "); //
            strSqlList.Append(" SELECT a.ID,a.Name,a.GradeID,a.SubjectID,a.EndTime,a.ExamTime,a.State,a.TID,a.CreateTime,a.DelFlag,a.StageID,a.Remark , ");
            #region 年级
            strSqlList.Append(" CASE WHEN GradeID=1 THEN '一年级' ");
            strSqlList.Append(" WHEN GradeID=2 THEN '二年级' ");
            strSqlList.Append(" WHEN GradeID=3 THEN '三年级' ");
            strSqlList.Append(" WHEN GradeID=4 THEN '四年级' ");
            strSqlList.Append(" WHEN GradeID=5 THEN '五年级' ");
            strSqlList.Append(" WHEN GradeID=6 THEN '六年级' ");
            strSqlList.Append(" WHEN GradeID=7 THEN '七年级' ");
            strSqlList.Append(" WHEN GradeID=8 THEN '八年级' ");
            strSqlList.Append(" WHEN GradeID=9 THEN '九年级' ");
            strSqlList.Append(" WHEN GradeID=10 THEN '高一' ");
            strSqlList.Append(" WHEN GradeID=11 THEN '高二' ");
            strSqlList.Append(" WHEN GradeID=12 THEN '高三' ");
            strSqlList.Append(" ELSE '' END GradeName, ");
            #endregion
            #region 科目
            strSqlList.Append(" CASE WHEN SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName, ");
            #endregion

            strSqlList.Append(" b.StuState, count(1) Count ");
            strSqlList.Append(" from EI_Exam a ");
            strSqlList.Append(" left join EI_ERelS b on  b.EID=a.ID ");

            //添加过滤条件
            strSqlList.Append(" WHERE 1=1 AND DelFlag=0  ");
            strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0  ");
            if (dictionary.ContainsKey("State"))
            {
                if (Convert.ToInt32(dictionary["State"]) == 0)//0未批改，1已批改
                {
                    strSqlList.Append(" AND a.State=1 ");
                    strSqlWhere.Append(" AND State=1 ");
                }
                else
                {
                    strSqlList.Append(" AND a.State=2 ");
                    strSqlWhere.Append(" AND State=2 ");
                }
            }
            if (dictionary.ContainsKey("GradeID"))//
            {
                strSqlList.Append(" AND GradeID=@GradeID ");
                strSqlWhere.Append(" AND GradeID=@GradeID ");
            }

            if (dictionary.ContainsKey("SubjectID"))
            {
                strSqlList.Append(" AND SubjectID=@SubjectID ");
                strSqlWhere.Append(" AND SubjectID=@SubjectID ");
            }
            if (dictionary.ContainsKey("TID"))
            {
                strSqlList.Append(" AND TID=@TID ");
                strSqlWhere.Append(" AND TID=@TID ");
            }


            strSqlList.Append(" GROUP BY a.ID,b.StuState  ) x"); //
            strSqlList.Append(" )y GROUP BY ID ORDER BY EndTime DESC , CreateTime DESC "); //


            if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            {
                strSqlList.Append(" LIMIT @Skip,@Take "); //Skip 过滤  Take取
                //strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            }

            strSqlList.Append(" ) a inner join EI_ERelI b on  b.EID=a.ID   GROUP BY a.ID");//

            string strOrder = " ORDER BY EndTime DESC , CreateTime DESC ";

            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            //sb.Append(strSqlWhere);
            sb.Append(strOrder);
            //sb.Append(strSqlLimit);
            sb.Append(";");

            return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);
        }



        public int GetExamListByDic(string tID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT Count(1) Count from EI_Exam a  ");//总条数
            #region 查询条件
            //strSql.Append(" INNER JOIN EI_ERelS c on a.ID=c.EID ");
            //strSql.Append(" WHERE 1=1  ");
            //strSql.Append(" AND DelFlag=0 and c.StuState=1 AND a.TID=@TID ");

            strSql.Append(" WHERE 1=1 AND DelFlag=0 AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=a.ID)>0 ");

            //strSql.Append(" AND (SELECT COUNT(1) FROM EI_ERelS WHERE EID=a.ID AND StuState=1 )>0 ");// StuState学生作业状态,0未提交，1已提交和2已批改

            strSql.Append(" AND State=1 ");

            strSql.Append(" AND a.TID=@TID ");
            #endregion
            MySqlParameter[] parameters = {
					new MySqlParameter("@TID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = tID;
            return Convert.ToInt32(MySQLHelper.GetSingle(strSql.ToString(), parameters));
        }



        /// <summary>
        /// 获取作业列表(老师考试分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetTeaExamListByDic(Dictionary<string, object> dic)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }

            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";
            string strOrder = "";

            switch (dictionary["type"].ToString())
            {
                case "myExaminationPaper"://我的试卷
                    strSqlCount = " SELECT Count(1) Count from ei_tea_exambook ";
                    strSqlList.Append(" SELECT  ID,Name,CreateTime,UpdateTime,SubjectID ");
                    strSqlList.Append(" from ei_tea_exambook ");
                    strSqlWhere.Append(" WHERE IsEnable=1 ");
                    strSqlWhere.Append(" AND TID=@TID ");

                    if (dictionary.ContainsKey("name"))
                    {
                        dictionary["name"] = "%" + dictionary["name"] + "%";
                        strSqlWhere.Append(" AND Name like @name ");
                    }

                    strOrder = " ORDER BY UpdateTime DESC , CreateTime DESC ";
                    break;
                case "myExam"://我要考试

                    strSqlCount = " SELECT Count(1) Count from ei_tea_exam a INNER JOIN ei_tea_erelt b ON b.EID=a.ID ";

                    strSqlList.Append(" SELECT  a.ID,a.Name,a.CreateTime,a.EndTime,b.StuState,c.Name Tname ");
                    strSqlList.Append(" from ei_tea_exam a ");
                    strSqlList.Append(" INNER JOIN ei_tea_erelt b ON b.EID=a.ID ");
                    strSqlList.Append(" INNER JOIN EI_ManagerInfo c ON c.AccountNumber=a.TID  ");
                    strOrder = " ORDER BY a.EndTime DESC , a.CreateTime DESC ";

                    strSqlWhere.Append(" WHERE b.TID=@TID and a.DelFlag=0");
                    break;
                case "myArrangement"://我的布置

                    strSqlCount = " SELECT Count(1) Count from ei_tea_exam ";
                    strSqlList.Append(" SELECT  ID,Name,CreateTime,EndTime, ");

                    strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM ei_tea_erelt WHERE EID=ei_tea_exam.ID AND StuState=1 )>0 ");
                    strSqlList.Append(" THEN 0 ELSE 1 END IsCorrecting ,");//有无批改  (0:有批改  1无批改)
                    strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM ei_tea_erelt WHERE EID=ei_tea_exam.ID AND StuState=2 )>0 ");
                    strSqlList.Append(" THEN 0 ELSE 1 END IsAnalysis ");//有无分析  (0:有分析  1无分析)

                    strSqlList.Append(" from ei_tea_exam ");
                    strSqlWhere.Append(" WHERE TID=@TID  and DelFlag=0");

                    strOrder = " ORDER BY EndTime DESC , CreateTime DESC ";

                    break;
                default:

                    break;
            }




            if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            {
                strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            }



            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);
        }

        #endregion

        #region 获取考试列表(微信分页)
        /// <summary>
        /// 获取考试列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetExamList2WeixinByDic(SearchObj searchObj)
        {

            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";

            strSqlCount = " SELECT Count(1) Count from EI_Exam a INNER JOIN EI_ERelS b ON a.ID = b.EID  ";//总条数

            strSqlList.Append(" SELECT a.ID,a.Name,a.GradeID,a.SubjectID,b.SID,b.StuState , ");
            strSqlList.Append(" (SELECT SUM(Score) FROM EI_EAnswer WHERE SID=b.SID AND EID=a.ID) SumScore, ");//作业得分

            #region 科目
            strSqlList.Append(" CASE WHEN a.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN a.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN a.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN a.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN a.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN a.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN a.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN a.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN a.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName ");
            #endregion

            strSqlList.Append(" FROM EI_Exam a ");
            strSqlList.Append(" INNER JOIN EI_ERelS b ON a.ID = b.EID ");

            #region 查询条件


            List<MySqlParameter> parameters = new List<MySqlParameter>();

            strSqlWhere.Append(" WHERE 1=1 AND DelFlag=0 ");

            if (!string.IsNullOrEmpty(searchObj.SID))//学生ID
            {
                strSqlWhere.Append(" AND b.SID=@SID ");
                parameters.Add(new MySqlParameter("@SID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = searchObj.SID });
            }


            if (!string.IsNullOrEmpty(searchObj.SubjectID))//科目ID
            {
                strSqlWhere.Append(" AND a.SubjectID=@SubjectID ");
                parameters.Add(new MySqlParameter("@SubjectID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = searchObj.SubjectID });
            }

            if (searchObj.StuState == 0)//学生作业状态,0未提交，1已提交和2已批改
            {
                strSqlWhere.Append(" AND b.StuState=0 ");
            }
            else if (searchObj.StuState == 1)
            {
                strSqlWhere.Append(" AND ( b.StuState=1 or b.StuState=2)");
            }
            #endregion



            strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            parameters.Add(new MySqlParameter("@Skip", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = searchObj.Skip });
            parameters.Add(new MySqlParameter("@Take", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = searchObj.Take });

            string strOrder = " ORDER BY a.EndTime DESC , a.CreateTime DESC";

            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            //return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);
            return MySQLHelper.Query(sb.ToString(), parameters);
        }

        #endregion

        #region 获取考试列表(学生分页)
        /// <summary>
        /// 获取考试列表(学生分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public DataSet GetExamList2StudentByDic(Dictionary<string, object> dic)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }

            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";


            strSqlCount = " SELECT Count(1) Count from EI_Exam a INNER JOIN EI_ERelS b ON b.EID=a.ID ";

            strSqlList.Append(" SELECT a.ID,a.Name,a.EndTime,a.CreateTime,a.ExamTime,b.StuState,c.Name Tname,  ");

            strSqlList.Append(" (SELECT COUNT(1) FROM EI_ERelI WHERE EID=a.ID) ItemCount, ");//题目数量

            strSqlList.Append(" (SELECT SUM(Score) FROM EI_EAnswer WHERE SID=b.SID AND EID=a.ID) SumScore ,");//作业得分

            #region 年级
            strSqlList.Append(" CASE WHEN a.GradeID=1 THEN '一年级' ");
            strSqlList.Append(" WHEN a.GradeID=2 THEN '二年级' ");
            strSqlList.Append(" WHEN a.GradeID=3 THEN '三年级' ");
            strSqlList.Append(" WHEN a.GradeID=4 THEN '四年级' ");
            strSqlList.Append(" WHEN a.GradeID=5 THEN '五年级' ");
            strSqlList.Append(" WHEN a.GradeID=6 THEN '六年级' ");
            strSqlList.Append(" WHEN a.GradeID=7 THEN '七年级' ");
            strSqlList.Append(" WHEN a.GradeID=8 THEN '八年级' ");
            strSqlList.Append(" WHEN a.GradeID=9 THEN '九年级' ");
            strSqlList.Append(" WHEN a.GradeID=10 THEN '高一' ");
            strSqlList.Append(" WHEN a.GradeID=11 THEN '高二' ");
            strSqlList.Append(" WHEN a.GradeID=12 THEN '高三' ");
            strSqlList.Append(" ELSE '' END GradeName, ");
            #endregion

            #region 科目
            strSqlList.Append(" CASE WHEN a.SubjectID=1 THEN '语文' ");
            strSqlList.Append(" WHEN a.SubjectID=2 THEN '数学' ");
            strSqlList.Append(" WHEN a.SubjectID=3 THEN '英语' ");
            strSqlList.Append(" WHEN a.SubjectID=4 THEN '物理' ");
            strSqlList.Append(" WHEN a.SubjectID=5 THEN '化学' ");
            strSqlList.Append(" WHEN a.SubjectID=6 THEN '地理' ");
            strSqlList.Append(" WHEN a.SubjectID=7 THEN '历史' ");
            strSqlList.Append(" WHEN a.SubjectID=8 THEN '政治' ");
            strSqlList.Append(" WHEN a.SubjectID=9 THEN '生物' ");
            strSqlList.Append(" ELSE '' END SubjectName ");
            #endregion

            //strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=1 )>0 ");
            //strSqlList.Append(" THEN 0 ELSE 1 END IsCorrecting ,");//有无批改  (0:有批改  1无批改)
            //strSqlList.Append(" CASE WHEN (SELECT COUNT(1) FROM EI_ERelS WHERE EID=EI_Exam.ID AND StuState=2 )>0 ");
            //strSqlList.Append(" THEN 0 ELSE 1 END IsAnalysis ");//有无分析  (0:有分析  1无分析)


            strSqlList.Append(" from EI_Exam a  ");

            strSqlList.Append(" INNER JOIN EI_ERelS b ON b.EID=a.ID  ");

            strSqlList.Append(" INNER JOIN EI_ManagerInfo c ON c.AccountNumber=a.TID  ");

            #region 查询条件
            strSqlWhere.Append(" WHERE 1=1 AND a.DelFlag=0 ");
            if (dictionary.ContainsKey("SID"))//学生ID
            {
                strSqlWhere.Append(" AND b.SID=@SID ");
            }

            if (dictionary.ContainsKey("StageID"))//学生大年级
            {
                strSqlWhere.Append(" AND a.StageID=@StageID ");
            }


            if (dictionary.ContainsKey("StuState"))//学生作业状态,0未提交，1已提交和2已批改
            {
                if (dictionary["StuState"].ToString() == "0")
                {
                    strSqlWhere.Append(" AND b.StuState=0 ");
                    strSqlWhere.Append(" AND a.EndTime>SYSDATE() ");
                }
                else if (dictionary["StuState"].ToString() == "1")
                {
                    strSqlWhere.Append(" AND b.StuState=1 ");
                }
                else//过了截至时间 全部都认为是已批改
                {
                    strSqlWhere.Append(" AND ( (a.EndTime<SYSDATE() AND b.StuState=0 ) or b.StuState=2 )");
                }
            }
            #endregion

            if (dictionary.ContainsKey("Skip") && dictionary.ContainsKey("Take"))
            {
                strSqlLimit = " LIMIT @Skip,@Take "; //Skip 过滤  Take取
            }
            //dictionary.Add("Skip", dic["Skip"]);
            //dictionary.Add("Take", dic["Take"]);

            string strOrder = " ORDER BY a.EndTime DESC , a.CreateTime DESC ";
            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            return _commonDal.GetDataSetBySqlAndDic(sb.ToString(), dictionary);
        }



        public int GetExamList2StudentByDic(string sID, string bGrade)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT Count(1) Count from EI_Exam a INNER JOIN EI_ERelS b ON a.ID = b.EID  ");//总条数
            #region 查询条件
            strSql.Append(" WHERE a.DelFlag=0 ");
            strSql.Append(" AND b.SID=@SID ");
            strSql.Append(" AND b.StuState=0 ");
            strSql.Append(" AND a.EndTime>SYSDATE() ");
            strSql.Append(" AND a.StageID=@StageID ");
            #endregion
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11)	};
            parameters[0].Value = sID;
            parameters[1].Value = bGrade;
            return Convert.ToInt32(MySQLHelper.GetSingle(strSql.ToString(), parameters));
        }
        #endregion

        #region 获取考试布置
        /// <summary>
        /// 获取查看作业布置
        /// </summary>
        /// <param name="ID">作业ID</param>
        /// <returns></returns>
        public DataSet GetSetted(string ID)
        {

            StringBuilder strSql = new StringBuilder();

            //获取作业
            strSql.Append(" SELECT ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,StageID,DelFlag,Remark from EI_Exam where ID=@ID ;");

            //获取作业与学生关联
            strSql.Append(" SELECT b.EID, b.SID,b.StuState,c.Name SName from EI_Exam a ");
            strSql.Append(" INNER JOIN EI_ERelS b ON a.ID=b.EID ");
            strSql.Append(" INNER JOIN EI_StudentInfo c on b.SID=c.MfgID ");
            strSql.Append(" where a.ID=@ID ; ");

            //获取作业与题目关联
            strSql.Append(" SELECT a.ID,a.Name,GradeID,a.SubjectID,a.EndTime,a.ExamTime,a.State,a.TID,a.CreateTime,a.StageID,a.DelFlag,a.Remark,b.EID,b.SequenceID,b.ItemID,b.ItemType,b.KnowledgeID,b.KnowledgeName,b.ItemSourceType,b.Score,b.DiffNum,b.PID,b.AddTime FROM  EI_Exam a ");
            strSql.Append(" INNER JOIN EI_ERelI b on a.ID=b.EID ");
            strSql.Append(" where a.ID=@ID  ");
            strSql.Append(" ORDER BY SequenceID; ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)
					};
            parameters[0].Value = ID;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }




        /// <summary>
        /// 获取查看作业布置（老师考试）
        /// </summary>
        /// <param name="ID">作业ID</param>
        /// <returns></returns>
        public DataSet GetTeaSetted(string ID)
        {

            StringBuilder strSql = new StringBuilder();

            //获取作业
            strSql.Append(" SELECT ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,StageID,DelFlag,Remark from ei_tea_exam where ID=@ID ;");

            //获取作业与学生关联
            strSql.Append(" SELECT b.EID, b.TID,b.StuState,c.Name SName from ei_tea_exam a ");
            strSql.Append(" INNER JOIN ei_tea_erelt b ON a.ID=b.EID ");
            strSql.Append(" INNER JOIN ei_managerinfo c on b.TID=c.AccountNumber ");
            strSql.Append(" where a.ID=@ID ; ");

            //获取作业与题目关联
            strSql.Append(" SELECT a.ID,a.Name,GradeID,a.SubjectID,a.EndTime,a.ExamTime,a.State,a.TID,a.CreateTime,a.StageID,a.DelFlag,a.Remark,b.EID,b.SequenceID,b.ItemID,b.ItemType,b.KnowledgeID,b.KnowledgeName,b.ItemSourceType,b.Score,b.DiffNum,b.PID,b.AddTime FROM  ei_tea_exam a ");
            strSql.Append(" INNER JOIN ei_tea_ereli b on a.ID=b.EID ");
            strSql.Append(" where a.ID=@ID  ");
            strSql.Append(" ORDER BY SequenceID; ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)
					};
            parameters[0].Value = ID;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion

        #region 获取考试试题
        /// <summary>
        /// 获取考试试题
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        public DataSet GetExamItem(string ID, string SID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(
                " SELECT a.ID, a.Name,a.SubjectID,a.ExamTime,a.EndTime,b.SequenceID,b.EID,b.ItemID,b.ItemType,b.Score,c.SID,");
            strSql.Append(" CASE d.IsTextAnswer WHEN 0 THEN d.Answer WHEN 1 THEN d.AnswerText END AS Answer,");
            strSql.Append(" d.AnswerTime,d.IsTextAnswer,d.AnswerText,c.StuState ");
            strSql.Append(" FROM  EI_Exam a ");
            strSql.Append(" INNER JOIN EI_ERelI b on a.ID=b.EID ");
            strSql.Append(" INNER JOIN EI_ERelS c ON c.EID=a.ID ");
            strSql.Append(" LEFT JOIN EI_EAnswer d on d.ItemID=b.ItemID AND d.SID=c.SID AND c.EID=d.EID  ");

            strSql.Append(" where a.ID=@ID AND c.SID=@SID  ");
            strSql.Append(" ORDER BY b.SequenceID; ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=ID},
                    	new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=SID}
					};
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 获取考试试题(老师考试)
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        public DataSet GetTeaExamItem(string ID, string TID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(
                " SELECT a.ID, a.Name,a.SubjectID,a.ExamTime,a.EndTime,b.SequenceID,b.EID,b.ItemID,b.ItemType,b.Score,c.TID,");
            strSql.Append(" CASE d.IsTextAnswer WHEN 0 THEN d.Answer WHEN 1 THEN d.AnswerText END AS Answer,");
            strSql.Append(" d.AnswerTime,d.IsTextAnswer,d.AnswerText,c.StuState ");
            strSql.Append(" FROM  ei_tea_exam a ");
            strSql.Append(" INNER JOIN ei_tea_ereli b on a.ID=b.EID ");
            strSql.Append(" INNER JOIN ei_tea_erelt c ON c.EID=a.ID ");
            strSql.Append(" LEFT JOIN ei_tea_eanswer d on d.ItemID=b.ItemID AND d.TID=c.TID AND c.EID=d.EID  ");

            strSql.Append(" where a.ID=@ID AND c.TID=@TID  ");
            strSql.Append(" ORDER BY b.SequenceID; ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=ID},
                    	new MySqlParameter("@TID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=TID}
					};
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion

        #region 删除考试
        /// <summary>
        /// 删除考试
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteExam(string ID)
        {
            int rows = 0;
            var isExists = new EAnswerDal().Exists(ID);
            if (!isExists)
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append(" DELETE FROM EI_Exam WHERE ID=@ID ;");
                strSql.Append(" DELETE FROM EI_ERelI WHERE EID=@ID ;");
                strSql.Append(" DELETE FROM EI_ERelS WHERE EID=@ID ;");
                strSql.Append(" DELETE FROM EI_EAnswer WHERE EID=@ID ;");
                MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = ID
                    }
                };

                rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            }
            return rows;
        }

        /// <summary>
        /// 删除考试(老师考试 我的试卷)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteTeaExamBook(string ID)
        {
            int rows = 0;

            StringBuilder strSql = new StringBuilder();
            strSql.Append(" DELETE FROM ei_tea_exambook WHERE ID=@ID ;");

            MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = ID
                    }
                };
            rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);

            return rows;
        }


        /// <summary>
        /// 删除考试(老师考试 我的布置)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteTeaExam(string ID)
        {
            int rows = 0;
            var isExists = new EAnswerDal().ExistsTea(ID);
            if (!isExists)
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append(" DELETE FROM ei_tea_exam WHERE ID=@ID ;");
                strSql.Append(" DELETE FROM ei_tea_ereli WHERE EID=@ID ;");
                strSql.Append(" DELETE FROM ei_tea_erelt WHERE EID=@ID ;");
                strSql.Append(" DELETE FROM ei_tea_eanswer WHERE EID=@ID ;");
                MySqlParameter[] parameters =
                {
                    new MySqlParameter("@ID", MySqlDbType.VarChar, 40)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = ID
                    }
                };

                rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            }
            return rows;
        }
        #endregion



        #region 考试分析
        /// <summary>
        /// 根据考试ID获取布置对象的回答列表
        /// </summary>
        /// <param name="examId"></param>
        /// <returns></returns>
        public DataSet GetStudentByExamID(string examId, string sid = "")
        {
            StringBuilder strSql = new StringBuilder();
            //查询学生信息
            strSql.Append("SELECT EIS.MfgID,EIS.OrgID,EIS.SType,EIS.Name,EIS.Shool,EIS.Class,EIS.MasterName,");
            strSql.Append("EIS.MasterPhone,EIS.Gender,EIS.GradeID,EIS.CardNumber,EIS.QQ,EIS.Phone,EIS.Address,");
            strSql.Append("EIS.ImgUrl,EIS.RoleTypeID,EIS.DelFlag,EIS.Remark,EIG.`Name` AS GroupName,EIES.StuState,EIES.SumeTime from EI_StudentInfo EIS ");
            strSql.Append("INNER JOIN EI_ERelS EIES on EIS.MfgID=EIES.SID and EIS.DelFlag=0");
            strSql.Append(" LEFT JOIN EI_GRelS EIGS ON EIGS.SID=EIS.MfgID LEFT JOIN EI_GroupInfo EIG ON EIG.ID =EIGS.GID ");
            strSql.Append(" where EIES.EID=@examId ");
            strSql.Append(" group BY EIS.MfgID ORDER BY EIGS.GID, EIGS.SID ;");


            //查询学生回答情况
            strSql.Append("select EIES.TeacherComment as TeacherTotalComment, EIE.GradeID,EIEA.ID, EIEA.Accuracy,EIEA.SID AS SID,EIEA.EID AS ExamID,EIEI.SequenceID,EIEA.Score," +
                          "EIEI.ItemID,EIE.`Name` AS ExamName,EIEI.ItemType,EIE.SubjectID,EIEI.Score as FullScore," +
                          "EIEA.Review AS TeacherComment,EIEA.AnswerTime,EIEI.KnowledgeID,EIEI.KnowledgeName,EIEA.NoteContent,EIES.StuState,EIEI.DiffNum," +
                          "  CASE EIEA.IsTextAnswer WHEN 0 THEN EIEA.Answer WHEN 1 THEN EIEA.AnswerText END AS Answer,EIEA.IsTextAnswer,EIEA.AnswerText " +
                          " from EI_EAnswer EIEA ");

            strSql.Append("INNER JOIN EI_ERelS EIES ON EIEA.SID=EIES.SID AND EIEA.EID=EIES.EID ");
            strSql.Append(" INNER JOIN EI_ERelI EIEI ON EIEI.ItemID=EIEA.ItemID AND EIEI.EID =EIEA.EID ");
            strSql.Append(" INNER JOIN EI_Exam EIE ON EIEA.EID=EIE.ID ");
            strSql.Append(" WHERE EIEA.DelFlag=0 AND ");
            strSql.Append("EIES.EID=@examId ");
            //if (!string.IsNullOrEmpty(sid))
            //{
            //    strSql.Append(" And EIES.SID=@SID ");
            //}
            strSql.Append("order by EIEI.ItemType,EIEI.SequenceID ;");


            //查询知识点列表
            strSql.Append("select SUM(EIEA.Score) as ActuScore,SUM(EIEI.Score) as FULLScore,");
            strSql.Append("EIEA.SID AS SID,EIEA.EID AS ExamID,EIEI.ItemID,EIEI.KnowledgeID  as PointID,EIEI.KnowledgeName  as PointName ");
            strSql.Append("from EI_EAnswer EIEA INNER JOIN EI_ERelS EIES ON EIEA.SID=EIES.SID AND EIEA.EID=EIES.EID ");
            strSql.Append("INNER JOIN EI_ERelI EIEI ON EIEI.ItemID=EIEA.ItemID AND EIEI.EID =EIEA.EID ");

            strSql.Append("WHERE EIEA.DelFlag=0 AND EIES.EID=@examId ");
            strSql.Append("GROUP BY EIEI.KnowledgeID,EIEA.SID ;");
            //查询作业信息
            strSql.Append("select EIE.SubjectID ,EIE.`Name` AS ExamName , EID AS ExamID,ItemID,SequenceID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score as FullScore, DiffNum from EI_ERelI EIEI INNER JOIN EI_Exam EIE ON EIEI.EID=EIE.ID");
            //strSql.Append("select EID AS ExamID,ItemID,SequenceID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score as FullScore, DiffNum from EI_ERelI");
            strSql.Append(" WHERE EID=@examId ;");

            MySqlParameter[] parameters = {
					new MySqlParameter("@examId", MySqlDbType.VarChar,40),
					   new MySqlParameter("@SID", MySqlDbType.VarChar,40)};
            parameters[0].Value = examId;
            if (!string.IsNullOrEmpty(sid))
            {
                parameters[1].Value = sid;
            }

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }



        #endregion

        #region 考试分析 教学基本功
        /// <summary>
        /// 根据考试ID获取布置对象的回答列表
        /// </summary>
        /// <param name="examId"></param>
        /// <returns></returns>
        public DataSet TeaGetStudentByExamID(string examId, string sid = "")
        {
            StringBuilder strSql = new StringBuilder();
            #region 学生考试信息
            //查询学生信息
            //strSql.Append("SELECT EIS.MfgID,EIS.OrgID,EIS.SType,EIS.Name,EIS.Shool,EIS.Class,EIS.MasterName,");
            //strSql.Append("EIS.MasterPhone,EIS.Gender,EIS.GradeID,EIS.CardNumber,EIS.QQ,EIS.Phone,EIS.Address,");
            //strSql.Append("EIS.ImgUrl,EIS.RoleTypeID,EIS.DelFlag,EIS.Remark,EIG.`Name` AS GroupName,EIES.StuState,EIES.SumeTime from EI_StudentInfo EIS ");
            //strSql.Append("INNER JOIN EI_ERelS EIES on EIS.MfgID=EIES.SID and EIS.DelFlag=0");
            //strSql.Append(" LEFT JOIN EI_GRelS EIGS ON EIGS.SID=EIS.MfgID LEFT JOIN EI_GroupInfo EIG ON EIG.ID =EIGS.GID ");
            //strSql.Append(" where EIES.EID=@examId ");
            //strSql.Append(" group BY EIS.MfgID ORDER BY EIGS.GID, EIGS.SID ;");

            //查询学生回答情况
            //strSql.Append("select EIES.TeacherComment as TeacherTotalComment, EIE.GradeID,EIEA.ID, EIEA.Accuracy,EIEA.SID AS SID,EIEA.EID AS ExamID,EIEI.SequenceID,EIEA.Score," +
            //              "EIEI.ItemID,EIE.`Name` AS ExamName,EIEI.ItemType,EIE.SubjectID,EIEI.Score as FullScore," +
            //              "EIEA.Review AS TeacherComment,EIEA.AnswerTime,EIEI.KnowledgeID,EIEI.KnowledgeName,EIEA.NoteContent,EIES.StuState,EIEI.DiffNum," +
            //              "  CASE EIEA.IsTextAnswer WHEN 0 THEN EIEA.Answer WHEN 1 THEN EIEA.AnswerText END AS Answer,EIEA.IsTextAnswer,EIEA.AnswerText " +
            //              " from EI_EAnswer EIEA ");

            //strSql.Append("INNER JOIN EI_ERelS EIES ON EIEA.SID=EIES.SID AND EIEA.EID=EIES.EID ");
            //strSql.Append(" INNER JOIN EI_ERelI EIEI ON EIEI.ItemID=EIEA.ItemID AND EIEI.EID =EIEA.EID ");
            //strSql.Append(" INNER JOIN EI_Exam EIE ON EIEA.EID=EIE.ID ");
            //strSql.Append(" WHERE EIEA.DelFlag=0 AND ");
            //strSql.Append("EIES.EID=@examId ");
            //if (!string.IsNullOrEmpty(sid))
            //{
            //    strSql.Append(" And EIES.SID=@SID ");
            //}
            //strSql.Append("order by EIEI.ItemType,EIEI.SequenceID ;");
            //查询知识点列表
            //strSql.Append("select SUM(EIEA.Score) as ActuScore,SUM(EIEI.Score) as FULLScore,");
            //strSql.Append("EIEA.SID AS SID,EIEA.EID AS ExamID,EIEI.ItemID,EIEI.KnowledgeID  as PointID,EIEI.KnowledgeName  as PointName ");
            //strSql.Append("from EI_EAnswer EIEA INNER JOIN EI_ERelS EIES ON EIEA.SID=EIES.SID AND EIEA.EID=EIES.EID ");
            //strSql.Append("INNER JOIN EI_ERelI EIEI ON EIEI.ItemID=EIEA.ItemID AND EIEI.EID =EIEA.EID ");

            //strSql.Append("WHERE EIEA.DelFlag=0 AND EIES.EID=@examId ");
            //strSql.Append("GROUP BY EIEI.KnowledgeID,EIEA.SID ;");
            //查询作业信息
            //strSql.Append("select EIE.SubjectID ,EIE.`Name`, EID AS ExamID,ItemID,SequenceID,ItemType,KnowledgeID,KnowledgeName,ItemSourceType,Score as FullScore, DiffNum from EI_ERelI EIEI INNER JOIN EI_Exam EIE ON EIEI.EID=EIE.ID");
            //strSql.Append(" WHERE EID=@examId ;"); 
            #endregion
            //查询老师信息
            strSql.Append(" SELECT ");
            strSql.Append(" CONCAT(EIS.`AccountNumber`,'') AS MfgID,");
            strSql.Append(" EIS.OrgID,");
            strSql.Append(" EIS.`UType` AS SType,");
            strSql.Append(" EIS.Name,");
            strSql.Append(" EIS.DelFlag,");
            strSql.Append(" EIG.`Name` AS GroupName,");
            strSql.Append(" EIES.SumeTime ");
            strSql.Append(" FROM");
            strSql.Append(" ei_managerinfo EIS ");
            strSql.Append(" INNER JOIN ei_tea_erelt EIES ");
            strSql.Append(" ON EIS.`AccountNumber` = EIES.`TID` ");
            strSql.Append(" AND EIS.DelFlag = 0 ");
            strSql.Append(" LEFT JOIN EI_GRelM EIGS ");
            strSql.Append(" ON EIGS.`TID` = EIS.`AccountNumber` ");
            strSql.Append(" LEFT JOIN EI_GroupInfo EIG ");
            strSql.Append(" ON EIG.ID = EIGS.GID ");
            strSql.Append(" WHERE EIES.EID = @examId ");
            strSql.Append(" GROUP BY EIS.`AccountNumber` ");
            strSql.Append(" ORDER BY EIGS.GID,");
            strSql.Append(" EIGS.`TID` ;");

            //查询老师回答情况
            strSql.Append("	 SELECT  ");
            strSql.Append("  EIES.TeacherComment AS TeacherTotalComment, ");
            strSql.Append("  EIE.GradeID, ");
            strSql.Append("  EIEA.ID, ");
            strSql.Append("  EIEA.Accuracy, ");
            strSql.Append("  EIEA.TID AS SID, ");
            strSql.Append("  EIEA.EID AS ExamID, ");
            strSql.Append("  EIEI.SequenceID, ");
            strSql.Append("  EIEA.Score, ");
            strSql.Append("  EIEI.ItemID, ");
            strSql.Append("  EIE.`Name` AS ExamName, ");
            strSql.Append("  EIEI.ItemType, ");
            strSql.Append("  EIE.SubjectID, ");
            strSql.Append("  EIEI.Score AS FullScore, ");
            strSql.Append("  EIEA.Review AS TeacherComment, ");
            strSql.Append("  EIEA.AnswerTime, ");
            strSql.Append("  EIEI.KnowledgeID, ");
            strSql.Append("  EIEI.KnowledgeName, ");
            strSql.Append("  EIEA.NoteContent, ");
            strSql.Append("  EIES.StuState, ");
            strSql.Append("  EIEI.DiffNum, ");
            strSql.Append("  CASE ");
            strSql.Append("    EIEA.IsTextAnswer  ");
            strSql.Append("    WHEN 0  ");
            strSql.Append("    THEN EIEA.Answer  ");
            strSql.Append("    WHEN 1  ");
            strSql.Append("    THEN EIEA.AnswerText  ");
            strSql.Append("  END AS Answer, ");
            strSql.Append("  EIEA.IsTextAnswer, ");
            strSql.Append("  EIEA.AnswerText  ");
            strSql.Append(" FROM ");
            strSql.Append("  ei_tea_eanswer EIEA  ");
            strSql.Append("  INNER JOIN `ei_tea_erelt` EIES  ");
            strSql.Append("    ON EIEA.TID = EIES.TID  ");
            strSql.Append("    AND EIEA.EID = EIES.EID  ");
            strSql.Append("  INNER JOIN `ei_tea_ereli` EIEI  ");
            strSql.Append("    ON EIEI.ItemID = EIEA.ItemID  ");
            strSql.Append("    AND EIEI.EID = EIEA.EID  ");
            strSql.Append("  INNER JOIN `ei_tea_exam` EIE  ");
            strSql.Append("    ON EIEA.EID = EIE.ID  ");
            strSql.Append(" WHERE EIEA.DelFlag = 0  ");
            strSql.Append("  AND EIES.EID = @examId");
            strSql.Append(" order by EIEI.ItemType,EIEI.SequenceID ;");



            MySqlParameter[] parameters = {
					new MySqlParameter("@examId", MySqlDbType.VarChar,40),
					   new MySqlParameter("@SID", MySqlDbType.VarChar,40)};
            parameters[0].Value = examId;
            if (!string.IsNullOrEmpty(sid))
            {
                parameters[1].Value = sid;
            }

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }



        #endregion


        #region 布置在线考试 修改时间20150616
        /// <summary>
        /// 
        /// </summary>
        /// <param name="exammodel"></param>
        /// <returns></returns>
        public bool SaveExam2Model(ViewModel.ExamModel exammodel)
        {
            #region 保存在线考试
            var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, exammodel.ID);
            if (dicts.Count > 0)
            {
                //Exam主表

                exammodel.ID = !dicts.ContainsKey("ID") ? string.Empty : dicts["ID"];
                //exammodel.Name = dicts["Name"];
                exammodel.GradeID = !dicts.ContainsKey("GradeID") ? 0 : string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
                exammodel.SubjectID = !dicts.ContainsKey("SubjectID") ? 0 : string.IsNullOrEmpty(dicts["SubjectID"]) ? 0 : Convert.ToInt32(dicts["SubjectID"]);
                //exammodel.EndTime = dicts["EndTime"];
                exammodel.State = !dicts.ContainsKey("State") ? 0 : string.IsNullOrEmpty(dicts["State"]) ? 0 : Convert.ToInt32(dicts["State"]);
                exammodel.TID = !dicts.ContainsKey("TID") ? string.Empty : dicts["TID"];
                exammodel.CreateTime = DateTime.Now;
                exammodel.DelFlag = 0;
                exammodel.Remark = !dicts.ContainsKey("Remark") ? string.Empty : dicts["Remark"];
                exammodel.ExamTime = !dicts.ContainsKey("ExamTime") ? 0 : string.IsNullOrEmpty(dicts["ExamTime"]) ? 0 : Convert.ToInt32(dicts["ExamTime"]);
                exammodel.StageID = !dicts.ContainsKey("StageID") ? 0 : string.IsNullOrEmpty(dicts["StageID"]) ? 0 : Convert.ToInt32(dicts["StageID"]);
            }
            List<String> SqlList = new List<String>();

            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();

            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_Exam(");
            strSql.Append("ID,Name,GradeID,SubjectID,EndTime,State,TID,CreateTime,DelFlag,Remark,ExamTime,StageID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@Name,@GradeID,@SubjectID,@EndTime,@State,@TID,@CreateTime,@DelFlag,@Remark,@ExamTime,@StageID)");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
                    new MySqlParameter("@EndTime", MySqlDbType.DateTime),
                    new MySqlParameter("@State", MySqlDbType.Int32,1),
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
                    new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@ExamTime", MySqlDbType.Int32,11),
                     new MySqlParameter("@StageID", MySqlDbType.Int32,11)
                };
            parameters[0].Value = exammodel.ID;
            parameters[1].Value = exammodel.Name;
            parameters[2].Value = exammodel.GradeID;
            parameters[3].Value = exammodel.SubjectID;
            //parameters[4].Value = exammodel.EndTime;
            parameters[4].Value = Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", exammodel.EndTime) + "  23:59:59");
            parameters[5].Value = exammodel.State;
            parameters[6].Value = exammodel.TID;
            parameters[7].Value = exammodel.CreateTime;
            parameters[8].Value = exammodel.DelFlag;
            parameters[9].Value = exammodel.Remark;
            parameters[10].Value = exammodel.ExamTime;
            parameters[11].Value = exammodel.StageID;
            sqlParamList.Add(parameters);
            SqlList.Add(strSql.ToString());
            strSql.Clear();
            strSql.AppendFormat(@"delete from EI_ERelI where EID='{0}';", exammodel.ID);
            if (exammodel.ExamrelItemList.Count > 0)
            {
                foreach (var item in exammodel.ExamrelItemList)
                {
                    strSql.Append(@"Insert into EI_ERelI(ID,EID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        exammodel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }
            }
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });



            #endregion

            #region 布置对象修改
            strSql.Clear();
            strSql.Append(@"delete from EI_ERelS where  EID=@EID;");
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] {
              new MySqlParameter("@EID", MySqlDbType.VarChar, 40){Direction = ParameterDirection.InputOutput, Value = exammodel.ID}
            });
            strSql.Clear();
            if (exammodel.ErelsList.Count > 0)
            {
                foreach (var item in exammodel.ErelsList)
                {
                    strSql.AppendFormat("insert into EI_ERelS(EID,SID,StuState)values ('{0}','{1}',{2});", exammodel.ID, item.SID, (int?)StateEnum.NoSubmit);

                }
            }
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion

            #region 添加教学日记
            strSql.Clear();
            strSql.Append(@"insert into EI_TeachDiary(");
            strSql.Append(@"ID,Name,TId,CreateTime,DelFlag,Remark)");
            strSql.Append(@" values (");
            strSql.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}');", Guid.NewGuid().ToString(), "布置考试【" + exammodel.Name + "】", exammodel.TID, DateTime.Now, 0, "");
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            #endregion
            if (MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
            #region Redis之前代码
            //#region 保存在线考试
            //List<String> SqlList = new List<String>();
            //List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            //StringBuilder str = new StringBuilder();
            //MySqlParameter[] parameters =
            //    {
            //        new MySqlParameter("@ID", MySqlDbType.VarChar, 40),
            //        new MySqlParameter("@Name", MySqlDbType.VarChar, 50),
            //        new MySqlParameter("@EndTime", MySqlDbType.DateTime, -1),
            //    };
            //parameters[0].Value = exammodel.ID;
            //parameters[1].Value = exammodel.Name;
            //parameters[2].Value = Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", exammodel.EndTime) + "  23:59:59");
            //str.Append(@"UPDATE EI_Exam set `Name`=@Name, EndTime=@EndTime WHERE ID=@ID;");
            //sqlParamList.Add(parameters);
            //SqlList.Add(str.ToString());
            //str.Clear();
            //str.AppendFormat(@"delete from EI_ERelI where EID='{0}';", exammodel.ID);
            //if (exammodel.ExamrelItemList.Count > 0)
            //{
            //    foreach (var item in exammodel.ExamrelItemList)
            //    {
            //        str.Append(@"Insert into EI_ERelI(ID,EID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
            //        str.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
            //            Guid.NewGuid().ToString(),
            //            exammodel.ID,
            //            item.KnowledgeID,
            //            item.KnowledgeName,
            //            item.ItemID,
            //            item.ItemType,
            //            item.ItemSourceType,
            //            item.SequenceID,
            //            item.Score,
            //            item.DiffNum,
            //            item.PID
            //            );
            //    }
            //}
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] { });



            //#endregion

            //#region 布置对象修改
            //str.Clear();
            //str.Append(@"delete from EI_ERelS where  EID=@EID;");
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] {
            //  new MySqlParameter("@EID", MySqlDbType.VarChar, 40){Direction = ParameterDirection.InputOutput, Value = exammodel.ID}
            //});
            //str.Clear();
            //if (exammodel.ErelsList.Count > 0)
            //{
            //    foreach (var item in exammodel.ErelsList)
            //    {
            //        str.AppendFormat("insert into EI_ERelS(EID,SID,StuState)values ('{0}','{1}',{2});", exammodel.ID, item.SID, (int?)StateEnum.NoSubmit);

            //    }
            //}
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] { });
            //#endregion

            //#region 添加教学日记
            //str.Clear();
            //str.Append(@"insert into EI_TeachDiary(");
            //str.Append(@"ID,Name,TId,CreateTime,DelFlag,Remark)");
            //str.Append(@" values (");
            //str.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}');", Guid.NewGuid().ToString(), "布置考试【" + exammodel.Name + "】", exammodel.TID, DateTime.Now, 0, "");
            //SqlList.Add(str.ToString());
            //sqlParamList.Add(new MySqlParameter[] { });
            //#endregion
            //if (MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //} 
            #endregion

        }


        public bool SaveExam2ModelToCache(ExamModel exammodel)
        {
            #region 保存主表
            var keys = new List<KeyValuePair<string, string>>()
            {
                   //new KeyValuePair<string, string>("ID",          jobmodel.ID),
                   new KeyValuePair<string, string>("Name",        exammodel.Name),
                   //new KeyValuePair<string, string>("GradeID",     jobmodel.GradeID.ToString()),
                   //new KeyValuePair<string, string>("SubjectID",   jobmodel.SubjectID.ToString()),
                   new KeyValuePair<string, string>("EndTime",     string.Format("{0:yyyy/MM/dd}", exammodel.EndTime) + "  23:59:59"),
                   //new KeyValuePair<string, string>("State",       jobmodel.State.ToString()),
                   //new KeyValuePair<string, string>("TID",         jobmodel.TID),
                   //new KeyValuePair<string, string>("CreateTime",  jobmodel.CreateTime.ToString()),
                   //new KeyValuePair<string, string>("DelFlag",     jobmodel.DelFlag.ToString()),
                   //new KeyValuePair<string, string>("Remark",      jobmodel.Remark),
                   //new KeyValuePair<string, string>("StageID",     jobmodel.StageID.ToString())
            };
            #endregion



            #region 保存题目信息
            var jobitems = exammodel.ExamrelItemList;
            jobitems.ForEach(
                    m => keys.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            #endregion



            #region 布置对象修改
            RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, exammodel.ID, "studentObjs");
            var stuItems = exammodel.ErelsList ?? new List<ERelSModel>();
            var stu = new StringBuilder();
            if (stuItems.Count > 0)
            {
                foreach (var item in stuItems)
                {
                    stu.Append(item.SID + "," + item.Name + '|');
                }
                keys.Add(new KeyValuePair<string, string>("studentObjs", stu.ToString().TrimEnd('|')));
            }
            #endregion
            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, exammodel.ID, keys);
        }
        #endregion

        #region 添加考试评语
        public bool SaveTeacherCommnet(string examid, string sid, string commnet)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("UPDATE EI_ERelS SET TeacherComment=@commnet WHERE SID=@sid AND EID=@examid ");
            MySqlParameter[] parameters = new MySqlParameter[]{
            new MySqlParameter("@examid",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=examid},
            new MySqlParameter("@sid",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=sid},
            new MySqlParameter("@commnet",MySqlDbType.VarChar,500){Direction=ParameterDirection.InputOutput, Value=commnet}
            };
            var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        #region 添加考试评语 教学基本功
        public bool TeaSaveTeacherCommnet(string examid, string sid, string commnet)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("UPDATE ei_tea_erelt SET TeacherComment=@commnet WHERE TID=@sid AND EID=@examid ");
            MySqlParameter[] parameters = new MySqlParameter[]{
            new MySqlParameter("@examid",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=examid},
            new MySqlParameter("@sid",MySqlDbType.VarChar,40){Direction=ParameterDirection.InputOutput, Value=sid},
            new MySqlParameter("@commnet",MySqlDbType.VarChar,500){Direction=ParameterDirection.InputOutput, Value=commnet}
            };
            var rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion


        #region 获取作业箱列表分页数据
        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterModel"></param>
        /// <returns></returns>
        public void GetJobBookList(ParamFilterModel dto)
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

            str.Append(@"select count(1)  from EI_ExamBook a inner join EI_ManagerInfo b on a.TID=b.AccountNumber");
            str.Append(" where  (a.GradeID=@GradeID or @GradeID=0) and (a.SubjectID=@SubjectID or @SubjectID=0) and b.OrgID=(select x.OrgID from EI_ManagerInfo x where x.AccountNumber=@TID)");
            str.Append(" and ( a.IsShare=1 or (b.AccountNumber=@TID and a.IsShare=0)) and a.IsDel=0; ");

            str.Append(@"select a.ID,a.Name,b.Name,a.GradeID,a.SubjectID,a.StageID,a.CreateTime,a.UpdateTime,a.IsAssign,a.IsEdit,a.IsShare,");
            str.Append(" CASE WHEN a.SubjectID=1 THEN '语文'");
            str.Append(" WHEN a.SubjectID=2 THEN '数学'");
            str.Append(" WHEN a.SubjectID=3 THEN '英语'");
            str.Append(" WHEN a.SubjectID=4 THEN '物理'");
            str.Append(" WHEN a.SubjectID=5 THEN '化学'");
            str.Append(" WHEN a.SubjectID=6 THEN '地理'");
            str.Append(" WHEN a.SubjectID=7 THEN '历史'");
            str.Append(" WHEN a.SubjectID=8 THEN '政治'");
            str.Append(" WHEN a.SubjectID=9 THEN '生物'");
            str.Append(" ELSE '' END SubjectName,a.TID");
            str.Append("  from EI_ExamBook a ");
            str.Append("inner join EI_ManagerInfo b on a.TID=b.AccountNumber");
            str.Append("  where  (a.GradeID=@GradeID or @GradeID=0) and (a.SubjectID=@SubjectID or @SubjectID=0) and b.OrgID=(select x.OrgID from EI_ManagerInfo x where x.AccountNumber=@TID)");
            str.Append("  and ( a.IsShare=1 or (b.AccountNumber=@TID and a.IsShare=0)) and a.IsDel=0");
            str.Append(" order by a.UpdateTime desc limit @CurrentPage,@PageSize;");

            var _index = (dto.PageIndex - 1) * dto.PageSize;
            MySQLHelper.ExecuteStatementList<JobBookModel>(str.ToString(), (a) =>
            {
                if (a.HasRows)
                {
                    while (a.Read())
                    {
                        dto.MaxCount = a.GetInt32(0);
                    }
                }
                dto.bookmodelList = new List<JobBookModel>();
                if (a.NextResult())
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            _index = _index + 1;//生成序号
                            JobBookModel _dto = new JobBookModel();
                            _dto.Index = _index;
                            _dto.ID = a.GetString(0);
                            _dto.Name = a.GetString(1);
                            _dto.TeacherName = a.GetString(2);
                            _dto.GradeID = a.GetInt32(3);
                            _dto.SubjectID = a.GetInt32(4);
                            _dto.StageID = a.GetInt32(5);
                            _dto.CreateTime = a.GetDateTime(6);
                            _dto.UpdateTime = a.GetDateTime(7);
                            _dto.IsAssign = a.GetInt32(8);
                            _dto.IsEdit = a.GetInt32(9);
                            _dto.IsShare = a.GetInt32(10);
                            _dto.SubjectName = a.GetString(11);
                            _dto.TID = a.GetString(12);
                            dto.bookmodelList.Add(_dto);
                        }
                    }
                }
                return null;//没有其它意义
            }, parameters);


        }
        #endregion

        #region 删除作业箱
        public bool DeleteBookInfo(string bookID)
        {
            StringBuilder strBuilder = new StringBuilder();
            strBuilder.AppendFormat(@"Update EI_ExamBook set IsDel=1 where ID='{0}'", bookID);
            if (MySQLHelper.ExecuteSql(strBuilder.ToString()) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        #endregion

        #region 获取电子作业箱列表信息
        public JobBookModel GetBookModel(string bookID)
        {
            var jobinfo = new JobBookModel();
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat("SELECT ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare,ExamTime FROM EI_ExamBook WHERE ID='{0}';", bookID);
            strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From EI_EBookRelI where BookID='{0}';", bookID);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                jobinfo = ModelConvertHelper<JobBookModel>.ConvertToModel(ds.Tables[0]);
                if (ds.Tables[1].Rows.Count > 0)
                {
                    jobinfo.JBookModelList = ModelConvertHelper<JBookRelIModel>.ConvertToModelList(ds.Tables[1]);
                }
            }
            #region old
            ////RedisDal.RemoveKey(RedisTypeEnum.Jobitem, bookID);
            //if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, bookID))
            //{
            //    var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, bookID);
            //    if (dicts.Count > 0)
            //    {
            //        //job主表
            //        jobinfo.ID = bookID;
            //        jobinfo.Name = dicts["Name"];
            //        jobinfo.GradeID = string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
            //        jobinfo.SubjectID = string.IsNullOrEmpty(dicts["SubjectID"])
            //            ? 0
            //            : Convert.ToInt32(dicts["SubjectID"]);
            //        jobinfo.TID = dicts["TID"];
            //        jobinfo.StageID = dicts.ContainsKey("StageID") ? (string.IsNullOrEmpty(dicts["StageID"]) ? 0 : Convert.ToInt32(dicts["StageID"])) : 0;
            //        jobinfo.ExamTime = dicts.ContainsKey("ExamTime")
            //            ? (string.IsNullOrEmpty(dicts["ExamTime"]) ? 0 : Convert.ToInt32(dicts["ExamTime"]))
            //            : 0;

            //        //作业题目
            //        var jobItems =
            //            dicts.Where(m => m.Key.Contains("Item_"))
            //                .Select(m => m.Value.FromJsonTo<JBookRelIModel>())
            //                .ToList();
            //        jobinfo.JBookModelList = jobItems;
            //    }
            //}
            //else
            //{

            //    StringBuilder strSql = new StringBuilder();
            //    strSql.AppendFormat("SELECT ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare,ExamTime FROM EI_ExamBook WHERE ID='{0}';", bookID);
            //    strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From EI_EBookRelI where BookID='{0}';", bookID);
            //    DataSet ds = MySQLHelper.Query(strSql.ToString());
            //    if (ds.Tables[0].Rows.Count > 0)
            //    {
            //        jobinfo = ModelConvertHelper<JobBookModel>.ConvertToModel(ds.Tables[0]);
            //        var keyValues = new List<KeyValuePair<string, string>>()
            //            {
            //                new KeyValuePair<string, string>("ID",        jobinfo.ID),
            //                new KeyValuePair<string, string>("Name",      jobinfo.Name),
            //                new KeyValuePair<string, string>("GradeID",   jobinfo.GradeID.ToString()),
            //                new KeyValuePair<string, string>("SubjectID", jobinfo.SubjectID.ToString()),
            //                new KeyValuePair<string, string>("TID",       jobinfo.TID),
            //                new KeyValuePair<string, string>("CreateTime",jobinfo.CreateTime.ToString()),
            //                new KeyValuePair<string, string>("StageID",   jobinfo.StageID.ToString()),
            //                new KeyValuePair<string, string>("ExamTime",   jobinfo.ExamTime.ToString())
            //            };
            //        if (ds.Tables[1].Rows.Count > 0)
            //        {
            //            jobinfo.JBookModelList = ModelConvertHelper<JBookRelIModel>.ConvertToModelList(ds.Tables[1]);
            //            jobinfo.JBookModelList.ForEach(
            //              m => keyValues.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            //        }
            //        RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jobinfo.ID, keyValues);
            //    }





            //} 
            #endregion

            return jobinfo;
            #region Redis之前代码
            //var jobbook = new JobBookModel();
            //StringBuilder strSql = new StringBuilder();
            //strSql.AppendFormat("SELECT ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare FROM EI_ExamBook WHERE ID='{0}'", bookID);
            //DataSet ds = MySQLHelper.Query(strSql.ToString());
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    jobbook = ModelConvertHelper<JobBookModel>.ConvertToModel(ds.Tables[0]);
            //}
            //strSql.Clear();
            //strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From EI_EBookRelI where BookID='{0}'", bookID);
            //ds = MySQLHelper.Query(strSql.ToString());
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    jobbook.JBookModelList = ModelConvertHelper<JBookRelIModel>.ConvertToModelList(ds.Tables[0]);
            //}

            //return jobbook;
            #endregion
        }
        #endregion

        #region  修改作业箱信息
        public bool UpdateBookInfo(JobBookModel bookModel)
        {
            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat("Update EI_ExamBook Set Name='{0}',UpdateTime='{1}' where ID='{2}';",
                bookModel.Name,
                DateTime.Now,
                bookModel.ID
                );

            strSql.AppendFormat("delete from EI_EBookRelI where BookID='{0}';", bookModel.ID);
            if (bookModel.JBookModelList.Count() > 0)
            {
                foreach (var item in bookModel.JBookModelList)
                {
                    strSql.Append(@"Insert into EI_EBookRelI(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                       Guid.NewGuid().ToString(),
                        bookModel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }

            }
            SqlList.Add(strSql.ToString());
            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, bookModel.ID);
            }
            else
            {
                return false;
            }
        }

        public bool UpdateBookInfoToCache(JobBookModel bookModel)
        {
            #region 保存主表
            var keys = new List<KeyValuePair<string, string>>()
            {
               new KeyValuePair<string, string>("Name", bookModel.Name),
            };
            #endregion

            #region 保存题目信息
            var jobitems = bookModel.JBookModelList;
            jobitems.ForEach(
                    m => keys.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            #endregion
            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, bookModel.ID, keys);
        }
        #endregion

        #region  保存作业箱信息
        /// <summary>
        /// 保存作业箱信息
        /// </summary>
        /// <returns></returns>
        public bool SaveBookInfo(JobBookModel bookModel)
        {
            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Insert Into EI_ExamBook(ID,Name,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsAssign,IsEdit,IsDel,IsShare,ExamTime)");
            strSql.AppendFormat("values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}');",
                bookModel.ID,
                bookModel.Name,
                bookModel.TID,
                bookModel.StageID,
                bookModel.GradeID,
                bookModel.SubjectID,
                bookModel.CreateTime,
                bookModel.UpdateTime,
                bookModel.IsAssign,
                bookModel.IsEdit,
                bookModel.IsDel,
                bookModel.IsShare,
                bookModel.ExamTime
                );

            if (bookModel.JBookModelList.Count() > 0)
            {
                foreach (var item in bookModel.JBookModelList)
                {
                    strSql.Append(@"Insert into EI_EBookRelI(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        bookModel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }

            }
            SqlList.Add(strSql.ToString());
            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, bookModel.ID);
            }
            else
            {
                return false;
            }
        }

        #endregion


        #region 保存作业布置对象
        /// <summary>
        /// 保存作业布置对象
        /// </summary>
        /// <returns></returns>
        public bool SaveObject(ExamModel exammodel, JobBookModel bookmodel)
        {
            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            var strGuid = Guid.NewGuid().ToString();

            strSql.Append("Insert Into ei_exam(ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,DelFlag,Remark,StageID)");
            strSql.AppendFormat("values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}');",
                strGuid,
                exammodel.Name,
                exammodel.GradeID,
                exammodel.SubjectID,
                Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", exammodel.EndTime) + "  23:59:59"),
                exammodel.ExamTime,
                0,
                exammodel.TID,
                DateTime.Now,
                0,
                "",
                bookmodel.StageID
                );

            if (bookmodel.JBookModelList.Count() > 0)
            {
                foreach (var item in bookmodel.JBookModelList)
                {
                    strSql.Append(@"Insert into ei_ereli(ID,EID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        strGuid,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }
            }

            #region 布置对象
            if (exammodel.ErelsList.Count > 0)
            {
                foreach (var item in exammodel.ErelsList)
                {
                    strSql.AppendFormat(@"insert into ei_erels(EID,SID,StuState)values ('{0}','{1}',{2});", strGuid, item.SID, (int?)StateEnum.NoSubmit);
                }
            }
            SqlList.Add(strSql.ToString());
            #endregion

            #region 添加教学日记
            strSql.Clear();
            strSql.Append(@"insert into EI_TeachDiary(");
            strSql.Append(@"ID,Name,TId,CreateTime,DelFlag,Remark)");
            strSql.Append(@" values (");
            strSql.AppendFormat(@"'{0}','{1}','{2}','{3}','{4}','{5}');", Guid.NewGuid().ToString(), "布置考试【" + exammodel.Name + "】", exammodel.TID, DateTime.Now, 0, "");
            SqlList.Add(strSql.ToString());

            #endregion
            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion


        #region 教师基本功能
        /// <summary>
        /// 获取教师基本功能编辑信息
        /// </summary>
        /// <param name="bookID"></param>
        /// <returns></returns>
        public TeaExamBookModel GetTeaExamBookModel(string bookID)
        {
            #region Redis获取ExamBookModel
            var jobinfo = new TeaExamBookModel();

            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat(
                "SELECT ID,Name,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare,IsEnable FROM ei_tea_exambook WHERE ID='{0}';",
                bookID);
            strSql.AppendFormat(
                "Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From ei_tea_ebookreli where BookID='{0}';",
                bookID);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                jobinfo = ModelConvertHelper<TeaExamBookModel>.ConvertToModel(ds.Tables[0]);
                if (ds.Tables[1].Rows.Count > 0)
                {
                    jobinfo.TeaExamBookRelList =
                        ModelConvertHelper<TeaExamBookRelIModel>.ConvertToModelList(ds.Tables[1]);
                }


            }

            #region old
            //if (RedisDal.ContainsKey(RedisTypeEnum.Jobitem, bookID))
            //{
            //    var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, bookID);
            //    if (dicts.Count > 0)
            //    {

            //        //ID,Name,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare,IsEnable
            //        //job主表
            //        jobinfo.ID = bookID;
            //        jobinfo.Name = dicts["Name"];
            //        jobinfo.ExamTime = string.IsNullOrEmpty(dicts["ExamTime"]) ? 0 : Convert.ToInt32(dicts["ExamTime"]);
            //        jobinfo.TID = dicts["TID"];
            //        jobinfo.StageID = string.IsNullOrEmpty(dicts["StageID"]) ? 0 : Convert.ToInt32(dicts["StageID"]);
            //        jobinfo.GradeID = string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
            //        jobinfo.SubjectID = string.IsNullOrEmpty(dicts["SubjectID"])
            //            ? 0
            //            : Convert.ToInt32(dicts["SubjectID"]);
            //        jobinfo.CreateTime = string.IsNullOrEmpty(dicts["CreateTime"])
            //            ? DateTime.Now
            //            : Convert.ToDateTime(dicts["CreateTime"]);
            //        jobinfo.UpdateTime = string.IsNullOrEmpty(dicts["UpdateTime"])
            //            ? DateTime.Now
            //            : Convert.ToDateTime(dicts["UpdateTime"]);
            //        jobinfo.IsShare = dicts.ContainsKey("IsShare")
            //            ? (string.IsNullOrEmpty(dicts["IsShare"]) ? 0 : Convert.ToInt32(dicts["IsShare"]))
            //            : 0;
            //        jobinfo.IsShare = dicts.ContainsKey("IsEnable")
            //            ? (string.IsNullOrEmpty(dicts["IsEnable"]) ? 0 : Convert.ToInt32(dicts["IsEnable"]))
            //            : 0;
            //        //jobinfo.IsEnable = string.IsNullOrEmpty(dicts["IsEnable"]) ? 0 : Convert.ToInt32(dicts["IsEnable"]);
            //        //作业题目
            //        var jobItems =
            //            dicts.Where(m => m.Key.Contains("Item_"))
            //                .Select(m => m.Value.FromJsonTo<TeaExamBookRelIModel>())
            //                .ToList();
            //        jobinfo.TeaExamBookRelList = jobItems;
            //    }
            //}
            //else
            //{

            //    StringBuilder strSql = new StringBuilder();
            //    strSql.AppendFormat(
            //        "SELECT ID,Name,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare,IsEnable FROM ei_tea_exambook WHERE ID='{0}';",
            //        bookID);
            //    strSql.AppendFormat(
            //        "Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From ei_tea_ebookreli where BookID='{0}';",
            //        bookID);
            //    DataSet ds = MySQLHelper.Query(strSql.ToString());
            //    if (ds.Tables[0].Rows.Count > 0)
            //    {
            //        jobinfo = ModelConvertHelper<TeaExamBookModel>.ConvertToModel(ds.Tables[0]);

            //        var keyValues = new List<KeyValuePair<string, string>>()
            //        {
            //            new KeyValuePair<string, string>("ID", jobinfo.ID),
            //            new KeyValuePair<string, string>("Name", jobinfo.Name),
            //            new KeyValuePair<string, string>("ExamTime", jobinfo.ExamTime.ToString()),
            //            new KeyValuePair<string, string>("TID", jobinfo.TID),
            //            new KeyValuePair<string, string>("StageID", jobinfo.StageID.ToString()),
            //            new KeyValuePair<string, string>("GradeID", jobinfo.GradeID.ToString()),
            //            new KeyValuePair<string, string>("SubjectID", jobinfo.SubjectID.ToString()),
            //            new KeyValuePair<string, string>("CreateTime", jobinfo.CreateTime.ToString()),
            //            new KeyValuePair<string, string>("UpdateTime", jobinfo.UpdateTime.ToString()),
            //            new KeyValuePair<string, string>("IsShare", jobinfo.IsShare.ToString()),
            //            new KeyValuePair<string, string>("IsEnable", jobinfo.IsEnable.ToString())
            //        };
            //        if (ds.Tables[1].Rows.Count > 0)
            //        {
            //            jobinfo.TeaExamBookRelList =
            //                ModelConvertHelper<TeaExamBookRelIModel>.ConvertToModelList(ds.Tables[1]);
            //            jobinfo.TeaExamBookRelList.ForEach(
            //          m => keyValues.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            //        }

            //        RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jobinfo.ID, keyValues);
            //    }




            //} 
            #endregion

            return jobinfo;
            #endregion

            #region Redis之前代码

            //var teaexamBookModel = new TeaExamBookModel();
            //StringBuilder strSql = new StringBuilder();
            //strSql.AppendFormat("SELECT ID,Name,ExamTime,TID,StageID,GradeID,SubjectID,CreateTime,UpdateTime,IsShare,IsEnable FROM ei_tea_exambook WHERE ID='{0}'", bookID);
            //DataSet ds = MySQLHelper.Query(strSql.ToString());
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    teaexamBookModel = ModelConvertHelper<TeaExamBookModel>.ConvertToModel(ds.Tables[0]);
            //}
            //strSql.Clear();
            //strSql.AppendFormat("Select BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID From ei_tea_ebookreli where BookID='{0}'", bookID);
            //ds = MySQLHelper.Query(strSql.ToString());
            //if (ds.Tables[0].Rows.Count > 0)
            //{
            //    teaexamBookModel.TeaExamBookRelList = ModelConvertHelper<TeaExamBookRelIModel>.ConvertToModelList(ds.Tables[0]);
            //}

            //return teaexamBookModel;
            #endregion
        }

        #endregion


        #region  保存作业箱信息 教学基本功
        /// <summary>
        /// 保存作业箱信息
        /// </summary>
        /// <returns></returns>
        public bool SaveTeaExamInfo(TeaExamBookModel teaModel)
        {
            #region 保存在线考试
            var dicts = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Jobitem, teaModel.ID);
            if (dicts.Count > 0)
            {
                //Exam主表
                teaModel.ID = !dicts.ContainsKey("ID") ? string.Empty : dicts["ID"];
                //teaModel.Name = dicts["Name"];
                teaModel.TID = !dicts.ContainsKey("TID") ? string.Empty : dicts["TID"];
                teaModel.StageID = !dicts.ContainsKey("StageID") ? 0 : string.IsNullOrEmpty(dicts["StageID"]) ? 0 : Convert.ToInt32(dicts["StageID"]);
                teaModel.GradeID = !dicts.ContainsKey("GradeID") ? 0 : string.IsNullOrEmpty(dicts["GradeID"]) ? 0 : Convert.ToInt32(dicts["GradeID"]);
                teaModel.SubjectID = !dicts.ContainsKey("SubjectID") ? 0 : string.IsNullOrEmpty(dicts["SubjectID"]) ? 0 : Convert.ToInt32(dicts["SubjectID"]);
                teaModel.ExamTime = !dicts.ContainsKey("ExamTime") ? 0 : string.IsNullOrEmpty(dicts["ExamTime"]) ? 0 : Convert.ToInt32(dicts["ExamTime"]);
                teaModel.CreateTime = DateTime.Now;
                teaModel.UpdateTime = DateTime.Now;
            }
            List<String> SqlList = new List<String>();

            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from ei_tea_exambook where ID=@ID;");
            strSql.Append("insert into ei_tea_exambook( ");
            strSql.Append("ID,Name,TID,StageID,GradeID,SubjectID,ExamTime,CreateTime,UpdateTime,IsEnable )");
            strSql.Append(" values (");
            strSql.Append("@ID,@Name,@TID,@StageID,@GradeID,@SubjectID,@ExamTime,@CreateTime,@UpdateTime,@IsEnable);");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11),
                    new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
                    new MySqlParameter("@ExamTime", MySqlDbType.Int32,40),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@UpdateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@IsEnable", MySqlDbType.Int32,1),
                                          };
            parameters[0].Value = teaModel.ID;
            parameters[1].Value = teaModel.Name;
            parameters[2].Value = teaModel.TID;
            parameters[3].Value = teaModel.StageID;
            parameters[4].Value = teaModel.GradeID;
            parameters[5].Value = teaModel.SubjectID;
            parameters[6].Value = teaModel.ExamTime;
            parameters[7].Value = DateTime.Now;
            parameters[8].Value = DateTime.Now;
            parameters[9].Value = 1;
            sqlParamList.Add(parameters);
            SqlList.Add(strSql.ToString());
            strSql.Clear();
            //题目
            strSql.AppendFormat(@"Delete From ei_tea_ebookreli where BookID='{0}';", teaModel.ID);
            if (teaModel.TeaExamBookRelList.Count() > 0)
            {
                foreach (var item in teaModel.TeaExamBookRelList)
                {
                    strSql.Append(@"Insert into ei_tea_ebookreli(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        teaModel.ID,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }

            }
            SqlList.Add(strSql.ToString());
            sqlParamList.Add(new MySqlParameter[] { });

            if (MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0)
            {
                return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, teaModel.ID);
            }
            else
            {
                return false;
            }

            #endregion
            #region Redis之前代码
            //List<String> SqlList = new List<String>();
            //StringBuilder strSql = new StringBuilder();
            //strSql.AppendFormat(@"Update ei_tea_exambook Set Name='{0}',UpdateTime='{1}',IsEnable='{2}' where ID='{3}';",
            //    teaModel.Name,
            //    teaModel.UpdateTime,
            //    teaModel.IsEnable,
            //    teaModel.ID
            //    );
            //strSql.AppendFormat(@"Delete From ei_tea_ebookreli where BookID='{0}';", teaModel.ID);
            //if (teaModel.TeaExamBookRelList.Count() > 0)
            //{
            //    foreach (var item in teaModel.TeaExamBookRelList)
            //    {
            //        strSql.Append(@"Insert into ei_tea_ebookreli(ID,BookID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
            //        strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
            //            Guid.NewGuid().ToString(),
            //            teaModel.ID,
            //            item.KnowledgeID,
            //            item.KnowledgeName,
            //            item.ItemID,
            //            item.ItemType,
            //            item.ItemSourceType,
            //            item.SequenceID,
            //            item.Score,
            //            item.DiffNum,
            //            item.PID
            //            );
            //    }

            //}
            //SqlList.Add(strSql.ToString());
            //if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            //{
            //    return RedisDal.RemoveKey(RedisTypeEnum.Jobitem, teaModel.ID);
            //}
            //else
            //{
            //    return false;
            //}
            #endregion
        }
        public bool SaveTeaExamInfoToCache(TeaExamBookModel teaModel)
        {
            #region 保存主表
            var keys = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("Name",teaModel.Name), 
            };
            #endregion

            #region 保存题目信息
            var jobitems = teaModel.TeaExamBookRelList;
            jobitems.ForEach(
                    m => keys.Add(new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())));
            #endregion

            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, teaModel.ID, keys);
        }

        #endregion


        #region 保存作业布置对象
        /// <summary>
        /// 保存作业布置对象
        /// </summary>
        /// <returns></returns>
        public bool SaveTeaObject(ExamModel exammodel, TeaExamBookModel bookmodel)
        {
            List<String> SqlList = new List<String>();
            StringBuilder strSql = new StringBuilder();
            var strGuid = Guid.NewGuid().ToString();

            strSql.Append("Insert Into ei_tea_exam(ID,Name,GradeID,SubjectID,EndTime,ExamTime,State,TID,CreateTime,DelFlag,Remark,StageID)");
            strSql.AppendFormat("values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}');",
                strGuid,
                exammodel.Name,
                exammodel.GradeID,
                exammodel.SubjectID,
                Convert.ToDateTime(string.Format("{0:yyyy/MM/dd}", exammodel.EndTime) + "  23:59:59"),
                exammodel.ExamTime,
                0,
                exammodel.TID,
                DateTime.Now,
                0,
                "",
                bookmodel.StageID
                );

            if (bookmodel.TeaExamBookRelList.Count() > 0)
            {
                foreach (var item in bookmodel.TeaExamBookRelList)
                {
                    strSql.Append(@"Insert into ei_tea_ereli(ID,EID,KnowledgeID,KnowledgeName,ItemID,ItemType,ItemSourceType,SequenceID,Score,DiffNum,PID)");
                    strSql.AppendFormat(@"values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');",
                        Guid.NewGuid().ToString(),
                        strGuid,
                        item.KnowledgeID,
                        item.KnowledgeName,
                        item.ItemID,
                        item.ItemType,
                        item.ItemSourceType,
                        item.SequenceID,
                        item.Score,
                        item.DiffNum,
                        item.PID
                        );
                }
            }

            #region 布置对象
            if (exammodel.TeaEreltList.Count > 0)
            {
                foreach (var item in exammodel.TeaEreltList)
                {
                    strSql.AppendFormat(@"insert into ei_tea_erelt(EID,TID,StuState)values ('{0}','{1}',{2});", strGuid, item.TID, (int?)StateEnum.NoSubmit);
                }
            }
            SqlList.Add(strSql.ToString());
            #endregion

            if (MySQLHelper.ExecuteSqlTran(SqlList) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion






    }
}
