/*
 * author:谢利民;
 * function:教师班级关联表【EI_GRelM】操作的功能
 * adddate:2015-04-20
 * updatedate:2015-04-20
 */
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Text;
using System.Linq;
using System;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 获取教师的教学日记类
    /// </summary>
    public class TeachDiaryDal
    {
        /// <summary>
        /// 获取教师教学日记
        /// </summary>
        /// <param name="paraList">查询参数类</param>
        /// <returns></returns>
        public List<TeachDiaryModel> GetTechDiaryList(EI_Base<EI_TeachDiary> paraList)
        {
            List<TeachDiaryModel> list = new List<TeachDiaryModel>();
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@currentDate", MySqlDbType.DateTime,0){ Direction=ParameterDirection.InputOutput, Value=paraList.currentDate},
                new MySqlParameter("@number", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=paraList.number+1},
		        new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=paraList.TID}
            };
            List<TeachDiaryModel> InitList = new List<TeachDiaryModel>();

            //strSql.Append(@" select ID, `Name`, TId, CreateTime, DelFlag, Remark,ViewDiary from( SELECT a.ID, a.`Name`, a.TId, a.CreateTime, a.DelFlag, a.Remark,'1' as ViewDiary FROM EI_TeachDiary a WHERE DATE(a.CreateTime)=");
            //strSql.Append(@" (SELECT DATE(b.CreateTime) FROM EI_TeachDiary b WHERE DATE(b.CreateTime)<DATE(@currentDate) AND a.TId=b.TID ORDER BY b.CreateTime DESC LIMIT 1)");
            //strSql.Append(@" AND a.TId=@TID ORDER BY a.CreateTime DESC LIMIT @number) as a1");

            strSql.Append(@" select ID, `Name`, TId, CreateTime, DelFlag, Remark,ViewDiary from( SELECT a.ID, a.`Name`, a.TId, a.CreateTime, a.DelFlag, a.Remark,'1' as ViewDiary FROM EI_TeachDiary a WHERE DATE(a.CreateTime)<");
            strSql.Append(@" DATE(@currentDate)");
            strSql.Append(@" AND a.TId=@TID ORDER BY a.CreateTime DESC LIMIT @number) as a1");

            strSql.Append(@" union ");
            strSql.Append(@"select ID, `Name`, TId, CreateTime, DelFlag, Remark,ViewDiary from( SELECT  a.ID, a.`Name`, a.TId, a.CreateTime, a.DelFlag, a.Remark,'2' as ViewDiary FROM EI_TeachDiary a");
            strSql.Append(@" WHERE a.TId=@TID AND DATE(a.CreateTime)=DATE(@currentDate) ORDER BY a.CreateTime DESC LIMIT @number) as a2");
            strSql.Append(@" union ");
            strSql.Append(@" select ID, `Name`, TId, CreateTime, DelFlag, Remark, ViewDiary from( SELECT  ID, `Name`, TId, CreateTime, DelFlag, Remark,'3' as ViewDiary FROM EI_TeachDiary");
            strSql.Append(@" WHERE TId=@TID AND DATE(CreateTime)=DATE_ADD(@currentDate, INTERVAL 1 DAY) ORDER BY CreateTime DESC LIMIT @number) as a3;");
            list.AddRange(MySQLHelper.ExecuteStatement<TeachDiaryModel>(strSql.ToString(), (a) =>
            {
                return new TeachDiaryModel()
                {
                    ID = a.GetString(0),
                    Name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    TId = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    CreateTime = a.IsDBNull(3) ? DateTime.MinValue : a.GetDateTime(3),
                    DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                    ViewDiary = Convert.ToByte(a.GetString(6))
                };
            }, parameters));
            if (list.Where(a => a.ViewDiary == 1).Count() == 0)
            {
                list.Add(new TeachDiaryModel() { ViewDiary = 1, IsEmpty = true, CreateTime = paraList.currentDate.AddDays(-1) });
            }
            if (list.Where(k => k.ViewDiary == 2).Count() == 0)//特殊情况
            {
                list.Add(new TeachDiaryModel() { ViewDiary = 2, IsEmpty = true, CreateTime = paraList.currentDate });
            }
            if (list.Where(k => k.ViewDiary == 3).Count() == 0)//特殊情况
            {
                list.Add(new TeachDiaryModel() { ViewDiary = 3, IsEmpty = true, CreateTime = paraList.currentDate.AddDays(1) });
            }

            if (list.Where(a => a.ViewDiary == 1).Count() > 1)//去无效数据
            {
                var _t = list.Where(a => a.ViewDiary == 1).First().CreateTime.Value.ToShortDateString();
                list.RemoveAll(a => a.ViewDiary == 1 && a.CreateTime.Value.ToShortDateString() != _t);

            }

            //if (list.Count == 0)//特殊情况
            //{
            //    list.Add(new TeachDiaryModel() { ViewDiary = 1, IsEmpty = true, CreateTime = paraList.currentDate.AddDays(-1) });
            //}
            //strSql.Clear();
            //strSql.Append(@" SELECT  a.ID, a.`Name`, a.TId, a.CreateTime, a.DelFlag, a.Remark FROM EI_TeachDiary a");
            //strSql.Append(@" WHERE a.TId=@TID AND DATE(a.CreateTime)=DATE(@currentDate) ORDER BY a.CreateTime DESC LIMIT @number");
            //list.AddRange(MySQLHelper.ExecuteStatement<TeachDiaryModel>(strSql.ToString(), (a) =>
            //{
            //    return new TeachDiaryModel()
            //    {
            //        ID = a.GetString(0),
            //        Name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
            //        TId = a.IsDBNull(2) ? string.Empty : a.GetString(2),
            //        CreateTime = a.IsDBNull(3) ? DateTime.MinValue : a.GetDateTime(3),
            //        DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
            //        Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
            //        ViewDiary = 2
            //    };
            //}, parameters));
            //if (list.Where(k => k.ViewDiary == 2).Count() == 0)//特殊情况
            //{
            //    list.Add(new TeachDiaryModel() { ViewDiary = 2, IsEmpty = true, CreateTime = paraList.currentDate });
            //}
            //strSql.Clear();
            //strSql.Append(@" SELECT  ID, `Name`, TId, CreateTime, DelFlag, Remark FROM EI_TeachDiary");
            //strSql.Append(@" WHERE TId=@TID AND DATE(CreateTime)=DATE_ADD(@currentDate, INTERVAL 1 DAY) ORDER BY CreateTime DESC LIMIT @number");
            //list.AddRange(MySQLHelper.ExecuteStatement<TeachDiaryModel>(strSql.ToString(), (a) =>
            //{
            //    return new TeachDiaryModel()
            //    {
            //        ID = a.GetString(0),
            //        Name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
            //        TId = a.IsDBNull(2) ? string.Empty : a.GetString(2),
            //        CreateTime = a.IsDBNull(3) ? DateTime.MinValue : a.GetDateTime(3),
            //        DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
            //        Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
            //        ViewDiary = 3
            //    };
            //}, parameters));
            //if (list.Where(k => k.ViewDiary == 3).Count() == 0)//特殊情况
            //{
            //    list.Add(new TeachDiaryModel() { ViewDiary = 3, IsEmpty = true, CreateTime = paraList.currentDate.AddDays(1) });
            //}
            return list;
        }


        /// <summary>
        /// 教学日记明细
        /// </summary>
        /// <param name="paraList">查询参数类</param>
        /// <returns></returns>
        public List<TeachDiaryModel> GetTechDiaryDetailsList(EI_Base<EI_TeachDiary> paraList)
        {
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@currentDate", MySqlDbType.DateTime,0){ Direction=ParameterDirection.InputOutput, Value=paraList.currentDate},
                 new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=paraList.TID}
            };
            strSql.Append(@" SELECT  ID, `Name`, TId, CreateTime, DelFlag, Remark FROM EI_TeachDiary");
            strSql.Append(@" WHERE DATE(CreateTime)=DATE(@currentDate) AND TId=@TID ORDER BY CreateTime DESC ");
            return MySQLHelper.ExecuteStatement<TeachDiaryModel>(strSql.ToString(), (a) =>
             {
                 return new TeachDiaryModel()
                 {
                     ID = a.GetString(0),
                     Name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                     TId = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                     CreateTime = a.IsDBNull(3) ? DateTime.MinValue : a.GetDateTime(3),
                     DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                     Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                 };
             }, parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_TeachDiary model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_TeachDiary(");
            strSql.Append("ID,Name,TId,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@ID,@Name,@TId,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@Name", MySqlDbType.VarChar,200),
					new MySqlParameter("@TId", MySqlDbType.VarChar,40),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.Name;
            parameters[2].Value = model.TId;
            parameters[3].Value = model.CreateTime;
            parameters[4].Value = model.DelFlag;
            parameters[5].Value = model.Remark;

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
        public bool Update(EI_TeachDiary model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_TeachDiary set ");
            strSql.Append("Name=@Name,");
            strSql.Append("TId=@TId,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,200),
					new MySqlParameter("@TId", MySqlDbType.VarChar,40),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.Name;
            parameters[1].Value = model.TId;
            parameters[2].Value = model.CreateTime;
            parameters[3].Value = model.DelFlag;
            parameters[4].Value = model.Remark;
            parameters[5].Value = model.ID;

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


        #region 教学日志
        /// <summary>
        /// 教学日志
        /// </summary>
        /// <param name="DiaryName"></param>
        /// <param name="TID"></param>
        /// <returns></returns>
        public string SaveDiary(string DiaryName, string TID) //async Task<string>
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(@"INSERT into EI_TeachDiary(ID,Name,Tid,CreateTime,DelFlag,Remark) VALUES('{0}','{1}','{2}','{3}',0,'');", Guid.NewGuid(), DiaryName, TID, DateTime.Now);
            return sql.ToString();
        }
        #endregion




 
    

    }
}
