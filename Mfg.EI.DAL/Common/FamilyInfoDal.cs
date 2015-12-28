
/*
 * author:杨礼文;
 * function:家庭信息Dal
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public partial class FamilyInfoDal
    {
        public FamilyInfoDal()
        { }
        #region  BasicMethod

        /// <summary>
        /// 得到最大ID
        /// </summary>
        public int GetMaxId()
        {
            return MySQLHelper.GetMaxID("ID", "EI_FamilyInfo");
        }

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_FamilyInfo");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_FamilyInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_FamilyInfo(");
            strSql.Append("SID,Relationship,Name,Company,Phone,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@SID,@Relationship,@Name,@Company,@Phone,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@Relationship", MySqlDbType.VarChar,20),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Company", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.SID;
            parameters[1].Value = model.Relationship;
            parameters[2].Value = model.Name;
            parameters[3].Value = model.Company;
            parameters[4].Value = model.Phone;
            parameters[5].Value = model.CreateTime;
            parameters[6].Value = model.DelFlag;
            parameters[7].Value = model.Remark;

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


        #region 批量导入EI_FamilyInfo汇总
        /// <summary>
        /// 批量导入EI_FamilyInfo汇总
        /// </summary>
        /// <param name="modeList"></param>
        public void BatchAdd(List<ImportAndExportStudent> modeList)
        {
            try
            {
                StringBuilder strSql = new StringBuilder();
                List<MySqlParameter> parameters = new List<MySqlParameter>();

                modeList = modeList.Where(m => m.IsPass == 1).ToList();
                if (modeList.Count <= 0)
                {
                    return;
                }

                strSql.Append("insert into EI_FamilyInfo");
                strSql.Append("(SID,Name,Phone,CreateTime)");
                strSql.Append(" values ");
                int i = 0;

                foreach (var item in modeList)
                {
                    strSql.AppendFormat("(@SID{0},@Name{0},@Phone{0},@CreateTime{0} ),", i);

                    parameters.Add(new MySqlParameter(string.Format("@SID{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.MfgID });
                    parameters.Add(new MySqlParameter(string.Format("@Name{0}", i), MySqlDbType.VarChar, 50) { Direction = ParameterDirection.InputOutput, Value = item.ParentName });
                    parameters.Add(new MySqlParameter(string.Format("@Phone{0}", i), MySqlDbType.VarChar, 20) { Direction = ParameterDirection.InputOutput, Value = item.ParentPhone });
                    parameters.Add(new MySqlParameter(string.Format("@CreateTime{0}", i), MySqlDbType.DateTime) { Direction = ParameterDirection.InputOutput, Value = DateTime.Now });
                    i++;
                }
                MySQLHelper.ExecuteSql(strSql.ToString().TrimEnd(','), parameters.ToArray());
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("批量导入EI_FamilyInfo失败", ex);
            }
        }

        #endregion




        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_FamilyInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_FamilyInfo set ");
            strSql.Append("SID=@SID,");
            strSql.Append("Relationship=@Relationship,");
            strSql.Append("Name=@Name,");
            strSql.Append("Company=@Company,");
            strSql.Append("Phone=@Phone,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@Relationship", MySqlDbType.VarChar,20),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Company", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.Int32,11)};
            parameters[0].Value = model.SID;
            parameters[1].Value = model.Relationship;
            parameters[2].Value = model.Name;
            parameters[3].Value = model.Company;
            parameters[4].Value = model.Phone;
            parameters[5].Value = model.CreateTime;
            parameters[6].Value = model.DelFlag;
            parameters[7].Value = model.Remark;
            parameters[8].Value = model.ID;

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
        /// 判断家长是否存在
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public bool ParentExists(EI_FamilyInfo info)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_FamilyInfo");
            strSql.Append(" where Phone=@Phone");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Phone", MySqlDbType.VarChar),
			};
            parameters[0].Value = info.Phone;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 更新家长信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateParentInfo(EI_FamilyInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_FamilyInfo set ");
            strSql.Append(" Name=@Name,");
            strSql.Append(" Phone=@Phone ");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
					new MySqlParameter("@ID", MySqlDbType.Int32,11)
                                          };
            parameters[0].Value = model.Name;
            parameters[1].Value = model.Phone;
            parameters[2].Value = model.ID;
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
        public bool Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_FamilyInfo ");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
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
            strSql.Append("delete from EI_FamilyInfo ");
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
        public EI_FamilyInfo GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,SID,Relationship,Name,Company,Phone,CreateTime,DelFlag,Remark from EI_FamilyInfo ");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
            parameters[0].Value = ID;

            EI_FamilyInfo model = new EI_FamilyInfo();
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


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public EI_FamilyInfo DataRowToModel(DataRow row)
        {
            EI_FamilyInfo model = new EI_FamilyInfo();
            if (row != null)
            {
                if (row["ID"] != null && row["ID"].ToString() != "")
                {
                    model.ID = int.Parse(row["ID"].ToString());
                }
                if (row["SID"] != null)
                {
                    model.SID = row["SID"].ToString();
                }
                if (row["Relationship"] != null)
                {
                    model.Relationship = row["Relationship"].ToString();
                }
                if (row["Name"] != null)
                {
                    model.Name = row["Name"].ToString();
                }
                if (row["Company"] != null)
                {
                    model.Company = row["Company"].ToString();
                }
                if (row["Phone"] != null)
                {
                    model.Phone = row["Phone"].ToString();
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
            strSql.Append("select ID,SID,Relationship,Name,Company,Phone,Weixin,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_FamilyInfo ");
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
            strSql.Append("select count(1) FROM EI_FamilyInfo ");
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
            strSql.Append(")AS Row, T.*  from EI_FamilyInfo T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }

        /*
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        {
            MySqlParameter[] parameters = {
                    new MySqlParameter("@tblName", MySqlDbType.VarChar, 255),
                    new MySqlParameter("@fldName", MySqlDbType.VarChar, 255),
                    new MySqlParameter("@PageSize", MySqlDbType.Int32),
                    new MySqlParameter("@PageIndex", MySqlDbType.Int32),
                    new MySqlParameter("@IsReCount", MySqlDbType.Bit),
                    new MySqlParameter("@OrderType", MySqlDbType.Bit),
                    new MySqlParameter("@strWhere", MySqlDbType.VarChar,1000),
                    };
            parameters[0].Value = "EI_FamilyInfo";
            parameters[1].Value = "ID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return DbHelperMySQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  BasicMethod
        #region  ExtensionMethod

        #endregion  ExtensionMethod
    }
}
