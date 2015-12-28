
/*
 * author:杨礼文;
 * function:学生Dal
 * date:2015-04-19
 */
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using Microsoft.SqlServer.Server;
using MySql.Data.MySqlClient;
using Mfg.EI.ViewModel;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 数据访问类:EI_StudentInfo
    /// </summary>
    public partial class StudentInfoDal
    {
        #region 私有变量
        private TeachDiaryDal _teachDiaryDal = new TeachDiaryDal();
        #endregion

        public StudentInfoDal()
        { }
        #region  BasicMethod

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string MfgID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_StudentInfo");
            strSql.Append(" where MfgID=@MfgID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = MfgID;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 添加经验值
        /// </summary>
        public bool AddEI_Experience(EI_StudentInfo dto)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"INSERT EI_Experience(ID,SID,ExperNumber,DictID,CreateTime,DelFlag,Remark) VALUES(@ID,@SID,@ExperNumber,@DictID,@CreateTime,@DelFlag,@Remark);");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ExperNumber", MySqlDbType.Int32,11),
                    new MySqlParameter("@DictID", MySqlDbType.Int32,11),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime,-1),
                    new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
                    new MySqlParameter("@Remark", MySqlDbType.VarChar,50)
                                           };
            parameters[0].Value = Guid.NewGuid();
            parameters[1].Value = dto.MfgID;
            parameters[2].Value = 0;
            parameters[3].Value = 1;
            parameters[4].Value = DateTime.Now;
            parameters[5].Value = 0;
            parameters[6].Value = string.Empty;
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
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_StudentInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_StudentInfo(");
            strSql.Append("OrgID,SType,Name,Shool,Class,MasterName,MasterPhone,Gender,GradeID,BirthDate,CardNumber,QQ,Phone,Address,ImgUrl,RoleTypeID,CreateTime,DelFlag,Remark,MfgID,CreateBy,ExpirDate,AcaStru,InitialPassword,ActivationTime )");
            strSql.Append(" values (");
            strSql.Append("@OrgID,@SType,@Name,@Shool,@Class,@MasterName,@MasterPhone,@Gender,@GradeID,@BirthDate,@CardNumber,@QQ,@Phone,@Address,@ImgUrl,@RoleTypeID,@CreateTime,@DelFlag,@Remark,@MfgID,@CreateBy,@ExpirDate,@AcaStru,@InitialPassword,@ActivationTime) ;");


            #region 参数
            MySqlParameter[] parameters = {
                    new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
                    new MySqlParameter("@SType", MySqlDbType.Int32,1),
                    new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@Shool", MySqlDbType.VarChar,50),
                    new MySqlParameter("@Class", MySqlDbType.VarChar,50),
                    new MySqlParameter("@MasterName", MySqlDbType.VarChar,50),
                    new MySqlParameter("@MasterPhone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Gender", MySqlDbType.Int32,1),
                    new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
                    new MySqlParameter("@BirthDate", MySqlDbType.DateTime),
                    new MySqlParameter("@CardNumber", MySqlDbType.VarChar,20),
                    new MySqlParameter("@QQ", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Address", MySqlDbType.VarChar,100),
                    new MySqlParameter("@ImgUrl", MySqlDbType.VarChar,100),
                    new MySqlParameter("@RoleTypeID", MySqlDbType.Int32,1),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
                    new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@MfgID", MySqlDbType.VarChar,50),
                    new MySqlParameter("@CreateBy", MySqlDbType.VarChar,50),
                    new MySqlParameter("@ExpirDate", MySqlDbType.DateTime),
                    new MySqlParameter("@AcaStru", MySqlDbType.Int32,11),
                    new MySqlParameter("@InitialPassword", MySqlDbType.VarChar,11),
                    new MySqlParameter("@ActivationTime", MySqlDbType.DateTime),
                                          };

            parameters[0].Value = model.OrgID;
            parameters[1].Value = model.SType;
            parameters[2].Value = model.Name;
            parameters[3].Value = model.Shool;
            parameters[4].Value = model.Class;
            parameters[5].Value = model.MasterName;
            parameters[6].Value = model.MasterPhone;
            parameters[7].Value = model.Gender;
            parameters[8].Value = model.GradeID;
            parameters[9].Value = model.BirthDate;
            parameters[10].Value = model.CardNumber;
            parameters[11].Value = model.QQ;
            parameters[12].Value = model.Phone;
            parameters[13].Value = model.Address;
            parameters[14].Value = model.ImgUrl;
            parameters[15].Value = model.RoleTypeID;
            parameters[16].Value = model.CreateTime;
            parameters[17].Value = model.DelFlag;
            parameters[18].Value = model.Remark;
            parameters[19].Value = model.MfgID;
            parameters[20].Value = model.CreateBy;
            parameters[21].Value = model.ExpirDate;
            parameters[22].Value = model.AcaStru;
            parameters[23].Value = model.InitialPassword;
            parameters[24].Value = model.ActivationTime;
            #endregion

            strSql.Append(_teachDiaryDal.SaveDiary(string.Format("创建学生账号【{0}】", model.Name), model.CreateBy));


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
        public bool Update(EI_StudentInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_StudentInfo set ");
            strSql.Append("OrgID=@OrgID,");
            strSql.Append("SType=@SType,");
            strSql.Append("Name=@Name,");
            strSql.Append("Shool=@Shool,");
            strSql.Append("Class=@Class,");
            strSql.Append("MasterName=@MasterName,");
            strSql.Append("MasterPhone=@MasterPhone,");
            strSql.Append("Gender=@Gender,");
            strSql.Append("GradeID=@GradeID,");
            strSql.Append("BirthDate=@BirthDate,");
            strSql.Append("CardNumber=@CardNumber,");
            strSql.Append("QQ=@QQ,");
            strSql.Append("Phone=@Phone,");
            strSql.Append("Address=@Address,");
            strSql.Append("ImgUrl=@ImgUrl,");
            strSql.Append("RoleTypeID=@RoleTypeID,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where MfgID=@MfgID ");
            #region 参数
            MySqlParameter[] parameters = {
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
					new MySqlParameter("@SType", MySqlDbType.Int32,1),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Shool", MySqlDbType.VarChar,50),
					new MySqlParameter("@Class", MySqlDbType.VarChar,50),
					new MySqlParameter("@MasterName", MySqlDbType.VarChar,50),
					new MySqlParameter("@MasterPhone", MySqlDbType.VarChar,20),
					new MySqlParameter("@Gender", MySqlDbType.Int32,1),
					new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
					new MySqlParameter("@BirthDate", MySqlDbType.DateTime),
					new MySqlParameter("@CardNumber", MySqlDbType.VarChar,20),
					new MySqlParameter("@QQ", MySqlDbType.VarChar,20),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
					new MySqlParameter("@Address", MySqlDbType.VarChar,100),
					new MySqlParameter("@ImgUrl", MySqlDbType.VarChar,100),
					new MySqlParameter("@RoleTypeID", MySqlDbType.Int32,1),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.OrgID;
            parameters[1].Value = model.SType;
            parameters[2].Value = model.Name;
            parameters[3].Value = model.Shool;
            parameters[4].Value = model.Class;
            parameters[5].Value = model.MasterName;
            parameters[6].Value = model.MasterPhone;
            parameters[7].Value = model.Gender;
            parameters[8].Value = model.GradeID;
            parameters[9].Value = model.BirthDate;
            parameters[10].Value = model.CardNumber;
            parameters[11].Value = model.QQ;
            parameters[12].Value = model.Phone;
            parameters[13].Value = model.Address;
            parameters[14].Value = model.ImgUrl;
            parameters[15].Value = model.RoleTypeID;
            parameters[16].Value = model.CreateTime;
            parameters[17].Value = model.DelFlag;
            parameters[18].Value = model.Remark;
            parameters[19].Value = model.MfgID;
            #endregion

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
        public bool Delete(string MfgID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_StudentInfo ");
            strSql.Append(" where MfgID=@MfgID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = MfgID;

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
        public bool DeleteList(string MfgIDlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_StudentInfo ");
            strSql.Append(" where MfgID in (" + MfgIDlist + ")  ");
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
        public EI_StudentInfo GetModel(string MfgID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.MfgID,a.OrgID,a.SType,d.Value STypeName,a.Name,a.Shool,a.Class,a.MasterName,a.MasterPhone,a.Gender,a.GradeID,a.BirthDate,a.CardNumber,a.QQ,a.Phone,a.Address,a.ImgUrl,a.RoleTypeID,a.FirstLogin,a.CreateTime,a.DelFlag,a.Remark,a.ExpirDate,a.ActivationTime from EI_StudentInfo a ");
            strSql.Append("INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");


            strSql.Append(" where a.MfgID=@MfgID AND a.DelFlag=0 ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = MfgID;

            EI_StudentInfo model = new EI_StudentInfo();
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
        /// 通过姓名和帐号查询
        /// </summary>
        /// <param name="MfgID"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public EI_StudentInfo GetModel(string MfgID, string name)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select *  from EI_StudentInfo  ");
            strSql.Append(" where EI_StudentInfo.MfgID=@MfgID ");
            strSql.Append(" and EI_StudentInfo.Name=@Name ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@MfgID", MySqlDbType.VarChar,40),
	                new MySqlParameter("@Name", MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = MfgID;
            parameters[1].Value = name;
            EI_StudentInfo model = new EI_StudentInfo();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return Mfg.EI.Common.ModelConvertHelper<EI_StudentInfo>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 通过WeiXin帐号查询
        /// </summary>
        /// <param name="MfgID"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public EI_StudentInfo GetModelByWeiXin(string WeiXin)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select *  from EI_StudentInfo inner join EI_Familyinfo on  EI_StudentInfo.MfgID=EI_Familyinfo.SID");
            strSql.Append(" where  EI_Familyinfo.WeiXin=@WeiXin ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@WeiXin", MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = WeiXin;
            EI_StudentInfo model = new EI_StudentInfo();
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
        public EI_StudentInfo DataRowToModel(DataRow row)
        {
            EI_StudentInfo model = new EI_StudentInfo();
            if (row != null)
            {
                if (row["MfgID"] != null)
                {
                    model.MfgID = row["MfgID"].ToString();
                }
                if (row["OrgID"] != null && row["OrgID"].ToString() != "")
                {
                    model.OrgID = int.Parse(row["OrgID"].ToString());
                }
                if (row["SType"] != null && row["SType"].ToString() != "")
                {
                    model.SType = int.Parse(row["SType"].ToString());
                }
                if (row["STypeName"] != null && row["STypeName"].ToString() != "")
                {
                    model.STypeName = row["STypeName"].ToString();
                }
                if (row["Name"] != null)
                {
                    model.Name = row["Name"].ToString();
                }
                if (row["Shool"] != null)
                {
                    model.Shool = row["Shool"].ToString();
                }
                if (row["Class"] != null)
                {
                    model.Class = row["Class"].ToString();
                }
                if (row["MasterName"] != null)
                {
                    model.MasterName = row["MasterName"].ToString();
                }
                if (row["MasterPhone"] != null)
                {
                    model.MasterPhone = row["MasterPhone"].ToString();
                }
                if (row["Gender"] != null && row["Gender"].ToString() != "")
                {
                    model.Gender = int.Parse(row["Gender"].ToString());
                }
                if (row["GradeID"] != null && row["GradeID"].ToString() != "")
                {
                    model.GradeID = int.Parse(row["GradeID"].ToString());
                }
                if (row["BirthDate"] != null && row["BirthDate"].ToString() != "")
                {
                    model.BirthDate = DateTime.Parse(row["BirthDate"].ToString());
                }
                if (row["CardNumber"] != null)
                {
                    model.CardNumber = row["CardNumber"].ToString();
                }
                if (row["QQ"] != null)
                {
                    model.QQ = row["QQ"].ToString();
                }
                if (row["Phone"] != null)
                {
                    model.Phone = row["Phone"].ToString();
                }
                if (row["Address"] != null)
                {
                    model.Address = row["Address"].ToString();
                }
                if (row["ImgUrl"] != null)
                {
                    model.ImgUrl = row["ImgUrl"].ToString();
                }
                if (row["RoleTypeID"] != null && row["RoleTypeID"].ToString() != "")
                {
                    model.RoleTypeID = int.Parse(row["RoleTypeID"].ToString());
                }
                if (row["CreateTime"] != null && row["CreateTime"].ToString() != "")
                {
                    model.CreateTime = DateTime.Parse(row["CreateTime"].ToString());
                }
                if (row["ExpirDate"] != null && row["ExpirDate"].ToString() != "")
                {
                    model.ExpirDate = DateTime.Parse(row["ExpirDate"].ToString());
                }
                if (row["DelFlag"] != null && row["DelFlag"].ToString() != "")
                {
                    model.DelFlag = int.Parse(row["DelFlag"].ToString());
                }
                if (row["Remark"] != null)
                {
                    model.Remark = row["Remark"].ToString();
                }
                if (row["FirstLogin"] != null && row["FirstLogin"].ToString() != "")
                {
                    model.FristLogin = int.Parse(row["FirstLogin"].ToString());
                }
                if (row["ActivationTime"] == null || string.IsNullOrEmpty(row["ActivationTime"].ToString()))
                {
                    model.ActivationTime = null;
                }
                else
                {
                    model.ActivationTime = DateTime.Parse(row["ActivationTime"].ToString());
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
            strSql.Append("select MfgID,OrgID,SType,Name,Shool,Class,MasterName,MasterPhone,Gender,GradeID,BirthDate,CardNumber,QQ,Phone,Address,ImgUrl,RoleTypeID,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_StudentInfo ");
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
            strSql.Append("select count(1) FROM EI_StudentInfo ");
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
                strSql.Append("order by T.MfgID desc");
            }
            strSql.Append(")AS Row, T.*  from EI_StudentInfo T ");
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
            parameters[0].Value = "EI_StudentInfo";
            parameters[1].Value = "MfgID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return MySQLHelper.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  BasicMethod

        #region 该机构下有多少学生
        /// <summary>
        /// 该机构下有多少学生
        /// </summary>
        /// <param name="OrgID">机构ID</param>
        /// <returns></returns>
        public int GetStuCount(int orgID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT COUNT(OrgID) Count FROM EI_StudentInfo   ");
            strSql.Append(" WHERE OrgID=@OrgID AND DelFlag=0 ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                	new MySqlParameter("@OrgID", MySqlDbType.Int32,11)
            };
            parameters[0].Value = orgID;

            var obj = MySQLHelper.GetSingle(strSql.ToString(), parameters);

            return Convert.ToInt32(obj);
        }

        #endregion

        #region 更新备注名
        /// <summary>
        /// 更新备注名
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <param name="reamrkName">备注名</param>
        /// <returns></returns>
        public bool UpdateReamrkName(string mfgID, string reamrkName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_StudentInfo set ");
            strSql.Append("ReamrkName=@ReamrkName ");
            strSql.Append(" where MfgID=@MfgID ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                    new MySqlParameter("@ReamrkName", MySqlDbType.VarChar,50),
                	new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)
            };
            parameters[0].Value = reamrkName;
            parameters[1].Value = mfgID;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        #region 更新学生档案
        /// <summary>
        /// 更新学生档案
        /// </summary>
        /// <param name="ei_StudentInfo">学生信息</param>
        /// <param name="ei_familyList">家庭信息</param>
        /// <param name="ei_EnterScoreList">成绩</param>
        /// <returns></returns>
        public bool UpdateStudentArchives(EI_StudentInfo ei_StudentInfo, List<EI_FamilyInfo> ei_familyList, List<EI_EnterScore> ei_EnterScoreList)
        {
            List<String> SQLStringList = new List<string>();
            List<MySqlParameter[]> SqlParameterList = new List<MySqlParameter[]>();

            #region 学生信息
            StringBuilder strStu = new StringBuilder();
            strStu.Append("update EI_StudentInfo set ");
            strStu.Append("Shool=@Shool,");
            strStu.Append("Class=@Class,");
            strStu.Append("MasterName=@MasterName,");
            strStu.Append("MasterPhone=@MasterPhone,");
            strStu.Append("Name=@Name,");
            strStu.Append("Gender=@Gender,");
            strStu.Append("ImgUrl=@ImgUrl,");
            strStu.Append("CardNumber=@CardNumber,");
            strStu.Append("QQ=@QQ,");
            strStu.Append("Phone=@Phone,");
            strStu.Append("Address=@Address,");
            strStu.Append("BirthDate=@BirthDate,");
            strStu.Append("GradeID=@GradeID, ");
            strStu.Append("AcaStru=@AcaStru ");
            strStu.Append(" where MfgID=@MfgID ;");
            #region 参数
            MySqlParameter[] paramStu = {
                    new MySqlParameter("@Shool", MySqlDbType.VarChar,50),
                    new MySqlParameter("@Class", MySqlDbType.VarChar,50),
                    new MySqlParameter("@MasterName", MySqlDbType.VarChar,50),
                    new MySqlParameter("@MasterPhone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@Gender", MySqlDbType.Int32,1),
                    new MySqlParameter("@ImgUrl", MySqlDbType.VarChar,100),
                    new MySqlParameter("@CardNumber", MySqlDbType.VarChar,20),
                    new MySqlParameter("@QQ", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Address", MySqlDbType.VarChar,100),
                    new MySqlParameter("@BirthDate", MySqlDbType.DateTime),
                    new MySqlParameter("@GradeID", MySqlDbType.Int32,11),
                     new MySqlParameter("@AcaStru", MySqlDbType.Int32,11),
                    new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)};

            paramStu[0].Value = ei_StudentInfo.Shool;
            paramStu[1].Value = ei_StudentInfo.Class;
            paramStu[2].Value = ei_StudentInfo.MasterName;
            paramStu[3].Value = ei_StudentInfo.MasterPhone;
            paramStu[4].Value = ei_StudentInfo.Name;
            paramStu[5].Value = ei_StudentInfo.Gender;
            paramStu[6].Value = ei_StudentInfo.ImgUrl;
            paramStu[7].Value = ei_StudentInfo.CardNumber;
            paramStu[8].Value = ei_StudentInfo.QQ;
            paramStu[9].Value = ei_StudentInfo.Phone;
            paramStu[10].Value = ei_StudentInfo.Address;
            paramStu[11].Value = ei_StudentInfo.BirthDate;
            paramStu[12].Value = ei_StudentInfo.GradeID;
            paramStu[13].Value = ei_StudentInfo.AcaStru;
            paramStu[14].Value = ei_StudentInfo.MfgID;
            #endregion

            SQLStringList.Add(strStu.ToString());
            SqlParameterList.Add(paramStu);
            #endregion

            #region 家庭信息
            StringBuilder strFam = new StringBuilder();
            SQLStringList.Add(" DELETE FROM EI_FamilyInfo WHERE SID=@SID ;");
            SqlParameterList.Add(new MySqlParameter[] { new MySqlParameter("@SID", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = ei_StudentInfo.MfgID } });
            //strFam.Append(" DELETE FROM EI_FamilyInfo WHERE SID=@SID0 ;");
            strFam.Append(" insert into EI_FamilyInfo(SID,Relationship,Name,Company,Phone,CreateTime,Weixin) ");
            strFam.Append(" values ");
            int i = 0;
            bool isAddFam = false;
            //MySqlParameter[] paramFam = new MySqlParameter[ei_familyList.Count * 7];

            List<MySqlParameter> paramFam = new List<MySqlParameter>();

            foreach (var item in ei_familyList)
            {
                if (!string.IsNullOrEmpty(item.Name))
                {
                    strFam.AppendFormat(" (@SID{0},@Relationship{0},@Name{0},@Company{0},@Phone{0},@CreateTime{0},@Weixin{0} ),", i);
                    //paramFam[0 + i * 7] = new MySqlParameter(string.Format("@SID{0}", i), item.SID);
                    //paramFam[1 + i * 7] = new MySqlParameter(string.Format("@Relationship{0}", i), item.Relationship);
                    //paramFam[2 + i * 7] = new MySqlParameter(string.Format("@Name{0}", i), item.Name);
                    //paramFam[3 + i * 7] = new MySqlParameter(string.Format("@Company{0}", i), item.Company);
                    //paramFam[4 + i * 7] = new MySqlParameter(string.Format("@Phone{0}", i), item.Phone);
                    //paramFam[5 + i * 7] = new MySqlParameter(string.Format("@CreateTime{0}", i), DateTime.Now);
                    //paramFam[6 + i * 7] = new MySqlParameter(string.Format("@Weixin{0}", i), item.Weixin);
                    paramFam.Add(new MySqlParameter(string.Format("@SID{0}", i), item.SID));
                    paramFam.Add(new MySqlParameter(string.Format("@Relationship{0}", i), item.Relationship));
                    paramFam.Add(new MySqlParameter(string.Format("@Name{0}", i), item.Name));
                    paramFam.Add(new MySqlParameter(string.Format("@Company{0}", i), item.Company));
                    paramFam.Add(new MySqlParameter(string.Format("@Phone{0}", i), item.Phone));
                    paramFam.Add(new MySqlParameter(string.Format("@CreateTime{0}", i), DateTime.Now));
                    paramFam.Add(new MySqlParameter(string.Format("@Weixin{0}", i), item.WeiXin));


                    isAddFam = true;
                }
                i++;
            }
            if (isAddFam)
            {
                SQLStringList.Add(strFam.ToString().Substring(0, strFam.ToString().Length - 1) + ";");
                SqlParameterList.Add(paramFam.ToArray());
            }


            #endregion

            #region 成绩
            StringBuilder strScore = new StringBuilder();
            strScore.Append(" DELETE FROM EI_EnterScore WHERE StuID=@StuID0 ;");
            strScore.Append(" insert into EI_EnterScore(Total,Score,SubjectID,StuID,CreateTime) ");
            strScore.Append(" values ");
            int j = 0;
            //MySqlParameter[] paramScore = new MySqlParameter[ei_EnterScoreList.Count * 5];
            List<MySqlParameter> paramScore = new List<MySqlParameter>();
            bool isAddScore = false;
            foreach (var item in ei_EnterScoreList)
            {
                strScore.AppendFormat(" (@Total{0},@Score{0},@SubjectID{0},@StuID{0},@CreateTime2{0} ),", j);

                paramScore.Add(new MySqlParameter(string.Format("@Total{0}", j), item.Total));
                paramScore.Add(new MySqlParameter(string.Format("@Score{0}", j), item.Score));
                paramScore.Add(new MySqlParameter(string.Format("@SubjectID{0}", j), item.SubjectID));
                paramScore.Add(new MySqlParameter(string.Format("@StuID{0}", j), item.StuID));
                paramScore.Add(new MySqlParameter(string.Format("@CreateTime2{0}", j), DateTime.Now));

                //paramScore[0 + j * 5] = new MySqlParameter(string.Format("@Total{0}", j), item.Total);
                //paramScore[1 + j * 5] = new MySqlParameter(string.Format("@Score{0}", j), item.Score);
                //paramScore[2 + j * 5] = new MySqlParameter(string.Format("@SubjectID{0}", j), item.SubjectID);
                //paramScore[3 + j * 5] = new MySqlParameter(string.Format("@StuID{0}", j), item.StuID);
                //paramScore[4 + j * 5] = new MySqlParameter(string.Format("@CreateTime2{0}", j), DateTime.Now);

                isAddScore = true;
                j++;
            }

            if (isAddScore)
            {
                SQLStringList.Add(strScore.ToString().Substring(0, strScore.ToString().Length - 1) + ";");
                SqlParameterList.Add(paramScore.ToArray());
            }


            #endregion




            return MySQLHelper.ExecuteSqlTran(SQLStringList, SqlParameterList) > 0;

        }

        #endregion

        #region 续费
        /// <summary>
        /// 续费(到期时间添加一年)
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <returns></returns>
        public bool UpdateExpirDate(string mfgID, string name, string createBy)
        {
            //UPDATE EI_StudentInfo SET ExpirDate=DATE_ADD(ExpirDate, INTERVAL 1 YEAR)
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_StudentInfo set ");
            strSql.Append("ExpirDate=DATE_ADD(ExpirDate, INTERVAL 1 YEAR),RenewTime=SYSDATE() ");
            strSql.Append(" where MfgID=@MfgID ;");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                	new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)
            };
            parameters[0].Value = mfgID;

            strSql.Append(_teachDiaryDal.SaveDiary(string.Format("续费学生账号【{0}】", name), createBy));
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }

        #endregion

        #region 重置密码
        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public void ResetPwr(string name, string createBy)
        {
            MySQLHelper.ExecuteSql(_teachDiaryDal.SaveDiary(string.Format("重置学生密码【{0}】", name), createBy));

        }

        #endregion

        #region 更新首次登录标识
        /// <summary>
        /// 更新登录标识
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public bool UpdateFirstLogin(string mfgID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_StudentInfo set ");
            strSql.Append("FirstLogin=0  "); //首次登录更新状态和过期时间  , ExpirDate=DATE_ADD(SYSDATE(), INTERVAL 1 YEAR)
            strSql.Append(" where MfgID=@MfgID ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                	new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)
            };
            parameters[0].Value = mfgID;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        #region 更改经验值
        /// <summary>
        /// 更改经验值
        /// </summary>
        /// <param name="sID"></param>
        /// <param name="ExperNumber"></param>
        /// <returns>更改经验值的sql</returns>
        public string UpdateExperNumber(string sID, int experNumber)
        {
            StringBuilder strSql = new StringBuilder();

            #region 重置当天累计的经验值
            //重置当天累计的经验值
            strSql.Append(" UPDATE EI_Experience set ");
            strSql.AppendFormat(" DayExperNumber = 0, ");
            strSql.AppendFormat(" CreateTime=SYSDATE() ");
            strSql.AppendFormat(" where SID='{0}' AND TO_DAYS(CreateTime)<TO_DAYS(SYSDATE()) ;", sID);
            #endregion

            #region 更新经验值
            strSql.Append(" UPDATE EI_Experience set ");
            strSql.AppendFormat(" ExperNumber = ExperNumber+{0}, ", experNumber);
            strSql.AppendFormat(" CreateTime=SYSDATE(), ");
            #region DictID 级别
            strSql.Append(" DictID= ");
            strSql.Append(" (CASE WHEN ExperNumber <100 THEN 1 ");
            strSql.Append(" WHEN ExperNumber <500 THEN 2 ");
            strSql.Append(" WHEN ExperNumber <1000 THEN 3 ");
            strSql.Append(" WHEN ExperNumber <2000 THEN 4 ");
            strSql.Append(" WHEN ExperNumber <3500 THEN 5 ");
            strSql.Append(" WHEN ExperNumber <7000 THEN 6 ");
            strSql.Append(" WHEN ExperNumber <10000 THEN 7 ");
            strSql.Append(" ELSE 8 END)  ,");
            #endregion
            strSql.AppendFormat(" DayExperNumber = DayExperNumber+{0} ", experNumber);
            strSql.AppendFormat(" where SID='{0}' AND TO_DAYS(CreateTime)=TO_DAYS(SYSDATE()) AND DayExperNumber<300 ;", sID);
            #endregion

            return strSql.ToString();

        }
        #endregion

        #region 获取EI_Experience
        /// <summary>
        /// 获取EI_Experience
        /// </summary>
        /// <param name="sID"></param>
        /// <returns></returns>
        public DataSet GetEI_Experience(string sID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT a.ID,a.SID,a.ExperNumber,a.DictID,a.Remark,b.Remark LevelName  ");
            strSql.Append(" FROM EI_Experience a ");
            strSql.Append(" INNER JOIN EI_Dict b on a.DictID=b.Code AND b.Type='Exper' ");

            strSql.Append(" WHERE a.SID=@SID ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                	new MySqlParameter("@SID", MySqlDbType.Int32,11){Direction = ParameterDirection.InputOutput,Value = sID}
            };

            return MySQLHelper.Query(strSql.ToString(), parameters);

        }

        #endregion

        #region  ExtensionMethod

        #endregion  ExtensionMethod

        #region 获取ei_studentinfo（分页）
        /// <summary>
        ///  获取ei_studentimportabnormal（分页）
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <param name="createBy"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<ImportAndExportStudent> GetStu(int currentPage, string starTime, string endTime, string createBy, out int count)
        {
            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";

            List<MySqlParameter> parameters = new List<MySqlParameter>();


            strSqlCount = " SELECT Count(1) Count from ei_studentinfo a ";

            //strSqlList.Append(" SELECT Name,Gender,BirthDate,GradeID,SType,Phone,AcaStru,Address,Shool,Class,MfgID,OrgID,CreateBy,CreateTime,ActivationTime,ExpirDate,InitialPassword ");
            //strSqlList.Append(" from ei_studentinfo ");

            strSqlList.Append(" SELECT ");
            strSqlList.Append(" a.Name,a.Gender,a.BirthDate,a.GradeID,a.SType,a.Phone,a.AcaStru,a.Address,a.Shool,a.Class,a.MfgID, ");
            strSqlList.Append(" a.OrgID,a.CreateBy,a.CreateTime,a.ActivationTime,a.ExpirDate,a.InitialPassword, ");
            strSqlList.Append(" b.Name ParentName,  b.Phone ParentPhone ");
            strSqlList.Append(" from ei_studentinfo a ");
            strSqlList.Append(" LEFT JOIN  ei_familyinfo  b on a.MfgID=b.SID ");


            strSqlWhere.AppendFormat(" WHERE a.CreateBy='{0}' ", createBy);


            if (!string.IsNullOrEmpty(starTime))
            {
                strSqlWhere.Append(" AND date(a.CreateTime)>=@starTime ");
                parameters.Add(new MySqlParameter("@starTime", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = starTime });
            }


            if (!string.IsNullOrEmpty(endTime))
            {
                strSqlWhere.Append(" AND date(a.CreateTime)<=@endTime ");
                parameters.Add(new MySqlParameter("@endTime", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = endTime });
            }

            if (currentPage > 0)
            {
                strSqlLimit = string.Format(" LIMIT {0},{1} ", (currentPage - 1) * 10, 10); //Skip 过滤  Take取
            }

            string strGroup = " GROUP BY MfgID ";
            string strOrder = " ORDER BY a.CreateTime DESC ";

            StringBuilder sb = new StringBuilder();

            //总数
            sb.Append(strSqlCount);
            sb.Append(strSqlWhere);
            sb.Append(";");

            //分页
            sb.Append(strSqlList);
            sb.Append(strSqlWhere);
            sb.Append(strGroup);
            sb.Append(strOrder);
            sb.Append(strSqlLimit);
            sb.Append(";");

            List<ImportAndExportStudent> list = new List<ImportAndExportStudent>();
            int num = 0;
            //list.AddRange(  
            MySQLHelper.ExecuteStatementList(sb.ToString(),
                (a) =>
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            num = a.GetInt32(0);
                        }
                    }


                    if (a.NextResult())
                    {
                        if (a.HasRows)
                        {

                            while (a.Read())
                            {

                                ImportAndExportStudent _dto = new ImportAndExportStudent();
                                _dto.Name = a.IsDBNull(0) ? "------" : a.GetString(0);
                                _dto.Gender = a.IsDBNull(1) ? "------" : a.GetInt32(1) == 0 ? "男" : "女";
                                _dto.BirthDate = a.IsDBNull(2) ? "------" : a.GetDateTime(2).ToString("yyyy-MM-dd");


                                //_dto.GradeID = a.IsDBNull(3) ? string.Empty : a.GetInt32(3).ToString();
                                #region 年级
                                switch (a.IsDBNull(3) ? -1 : a.GetInt32(3))
                                {
                                    case -1:
                                        _dto.GradeID = "";
                                        break;
                                    case 1:
                                        _dto.GradeID = "一年级";
                                        break;
                                    case 2:
                                        _dto.GradeID = "二年级";
                                        break;
                                    case 3:
                                        _dto.GradeID = "三年级";
                                        break;
                                    case 4:
                                        _dto.GradeID = "四年级";
                                        break;
                                    case 5:
                                        _dto.GradeID = "五年级";
                                        break;
                                    case 6:
                                        _dto.GradeID = "六年级";
                                        break;
                                    case 7:
                                        _dto.GradeID = "七年级";
                                        break;
                                    case 8:
                                        _dto.GradeID = "八年级";
                                        break;
                                    case 9:
                                        _dto.GradeID = "九年级";
                                        break;
                                    case 10:
                                        _dto.GradeID = "高一";
                                        break;
                                    case 11:
                                        _dto.GradeID = "高二";
                                        break;
                                    case 12:
                                        _dto.GradeID = "高三";
                                        break;
                                    default: //格式不对
                                        _dto.GradeID = "";
                                        break;
                                }
                                #endregion



                                switch (a.IsDBNull(4) ? -1 : a.GetInt32(4)) //学生类型，0普通，1VIP标准，2VIP白金，3VIP钻石   
                                {
                                    case 0:
                                        _dto.SType = "普通版";
                                        break;
                                    case 1:
                                        _dto.SType = "VIP标准版";
                                        break;
                                    case 2:
                                        _dto.SType = "VIP白金版";
                                        break;
                                    case 3:
                                        _dto.SType = "VIP钻石版";
                                        break;
                                    default:
                                        _dto.SType = "";
                                        break;
                                }
                                _dto.Phone = a.IsDBNull(5) ? "------" : a.GetString(5);

                                switch (a.IsDBNull(6) ? -1 : a.GetInt32(6))//学制,0五四制，1六三制，2文科，3理科，4不分文理 
                                {
                                    case 0:
                                        _dto.AcaStru = "五四制";
                                        break;
                                    case 1:
                                        _dto.AcaStru = "六三制";
                                        break;
                                    case 2:
                                        _dto.AcaStru = "文科";
                                        break;
                                    case 3:
                                        _dto.AcaStru = "理科";
                                        break;
                                    case 4:
                                        _dto.AcaStru = "不分文理";
                                        break;
                                    default:
                                        _dto.AcaStru = "";
                                        break;
                                }


                                _dto.Address = a.IsDBNull(7) ? "------" : a.GetString(7) == "" ? "------" : a.GetString(7);
                                _dto.Shool = a.IsDBNull(8) ? "------" : a.GetString(8) == "" ? "------" : a.GetString(8); ;
                                _dto.Class = a.IsDBNull(9) ? "------" : a.GetString(9) == "" ? "------" : a.GetString(9);
                                _dto.MfgID = a.IsDBNull(10) ? "------" : a.GetString(10);

                                _dto.CreateTime = a.IsDBNull(13) ? "------" : a.GetDateTime(13).ToString("yyyy-MM-dd");
                                //_dto.ActivationTime = a.IsDBNull(14) ? "------" : a.GetDateTime(14).ToString("yyyy-MM-dd");
                                _dto.ExpirDate = a.IsDBNull(15) ? "------" : a.GetDateTime(15).ToString("yyyy-MM-dd");


                                if (a.GetDateTime(14) <= DateTime.Now)
                                {
                                    _dto.InitialPassword = "------";
                                    _dto.ActivationTime = a.IsDBNull(14) ? "------" : a.GetDateTime(14).ToString("yyyy-MM-dd");
                                }
                                else
                                {
                                    _dto.InitialPassword = a.IsDBNull(16) ? "------" : a.GetString(16);
                                    _dto.ActivationTime = "------";
                                }



                                _dto.ParentName = a.IsDBNull(17) ? "------" : a.GetString(17);
                                _dto.ParentPhone = a.IsDBNull(18) ? "------" : a.GetString(18);

                                list.Add(_dto);
                            }

                        }
                    }
                },
          parameters)
            ;
            count = num;
            return list;
        }


        #endregion

        #region 批量导入异常汇总
        /// <summary>
        /// 批量导入异常汇总
        /// </summary>
        /// <param name="modeList"></param>
        /// <param name="createBy"></param>
        /// <param name="orgID"></param>
        public void BatchAddStuAbnormal(List<ImportAndExportStudent> modeList, string createBy, int orgID)
        {
            try
            {
                StringBuilder strSql = new StringBuilder();
                List<MySqlParameter> parameters = new List<MySqlParameter>();

                modeList = modeList.Where(m => m.IsPass == 0).ToList();
                if (modeList.Count <= 0)
                {
                    return;
                }

                strSql.Append("insert into ei_studentimportabnormal");
                strSql.Append("(ID,Name,Gender,BirthDate,GradeID,SType,Phone,AcaStru,Address,Shool,Class,OrgID,CreateTime,CreateBy,ParentName,ParentPhone)");
                strSql.Append(" values ");
                int i = 0;

                foreach (var item in modeList)
                {
                    strSql.AppendFormat("('{1}',@Name{0},@Gender{0},@BirthDate{0},@GradeID{0},@SType{0},@Phone{0},@AcaStru{0},@Address{0},@Shool{0},@Class{0},@OrgID{0},@CreateTime{0},@CreateBy{0},@ParentName{0},@ParentPhone{0}),", i, Guid.NewGuid().ToString());

                    parameters.Add(new MySqlParameter(string.Format("@Name{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.Name });
                    parameters.Add(new MySqlParameter(string.Format("@Gender{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.Gender });
                    parameters.Add(new MySqlParameter(string.Format("@BirthDate{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.BirthDate });
                    parameters.Add(new MySqlParameter(string.Format("@GradeID{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.GradeID });
                    parameters.Add(new MySqlParameter(string.Format("@SType{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.SType });
                    parameters.Add(new MySqlParameter(string.Format("@Phone{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.Phone });
                    parameters.Add(new MySqlParameter(string.Format("@AcaStru{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.AcaStru });
                    parameters.Add(new MySqlParameter(string.Format("@Address{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.Address });
                    parameters.Add(new MySqlParameter(string.Format("@Shool{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.Shool });
                    parameters.Add(new MySqlParameter(string.Format("@Class{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = item.Class });
                    parameters.Add(new MySqlParameter(string.Format("@OrgID{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = orgID });
                    parameters.Add(new MySqlParameter(string.Format("@CreateTime{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = DateTime.Now });
                    parameters.Add(new MySqlParameter(string.Format("@CreateBy{0}", i), MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = createBy });


                    parameters.Add(new MySqlParameter(string.Format("@ParentName{0}", i), MySqlDbType.VarChar, 50) { Direction = ParameterDirection.InputOutput, Value = item.ParentName });
                    parameters.Add(new MySqlParameter(string.Format("@ParentPhone{0}", i), MySqlDbType.VarChar, 20) { Direction = ParameterDirection.InputOutput, Value = item.ParentPhone });

                    i++;
                }
                MySQLHelper.ExecuteSql(strSql.ToString().TrimEnd(','), parameters.ToArray());
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("批量导入异常汇总失败", ex);
            }
        }

        #endregion

        #region 获取ei_studentimportabnormal（分页）
        /// <summary>
        ///  获取ei_studentimportabnormal（分页）
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <param name="createBy"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<ImportAndExportStudent> GetStuAbnormal(int currentPage, string starTime, string endTime, string createBy, out int count)
        {
            string strSqlCount = "";
            StringBuilder strSqlList = new StringBuilder();
            StringBuilder strSqlWhere = new StringBuilder();
            string strSqlLimit = "";

            List<MySqlParameter> parameters = new List<MySqlParameter>();


            strSqlCount = " SELECT Count(1) Count from ei_studentimportabnormal ";

            strSqlList.Append(" SELECT ID,Name,Gender,BirthDate,GradeID,SType,Phone,AcaStru,Address,Shool,Class,OrgID,CreateBy,CreateTime, ParentName,ParentPhone");
            strSqlList.Append(" from ei_studentimportabnormal ");

            strSqlWhere.AppendFormat(" WHERE CreateBy='{0}' ", createBy);


            if (!string.IsNullOrEmpty(starTime))
            {
                strSqlWhere.Append(" AND date(CreateTime)>=@starTime ");
                parameters.Add(new MySqlParameter("@starTime", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = starTime });
            }


            if (!string.IsNullOrEmpty(endTime))
            {
                strSqlWhere.Append(" AND date(CreateTime)<=@endTime ");
                parameters.Add(new MySqlParameter("@endTime", MySqlDbType.VarChar, 40) { Direction = ParameterDirection.InputOutput, Value = endTime });
            }

            if (currentPage > 0)
            {
                strSqlLimit = string.Format(" LIMIT {0},{1} ", (currentPage - 1) * 10, 10); //Skip 过滤  Take取
            }

            string strOrder = " ORDER BY CreateTime DESC ";

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

            List<ImportAndExportStudent> list = new List<ImportAndExportStudent>();
            int num = 0;
            //list.AddRange(  
            MySQLHelper.ExecuteStatementList(sb.ToString(),
                (a) =>
                {
                    if (a.HasRows)
                    {
                        while (a.Read())
                        {
                            num = a.GetInt32(0);
                        }
                    }


                    if (a.NextResult())
                    {
                        if (a.HasRows)
                        {

                            while (a.Read())
                            {
                                ImportAndExportStudent _dto = new ImportAndExportStudent();
                                _dto.ID = a.IsDBNull(0) ? "------" : a.GetString(0);
                                _dto.Name = a.IsDBNull(1) ? "------" : a.GetString(1);
                                _dto.Gender = a.IsDBNull(2) ? "------" : a.GetString(2);
                                _dto.BirthDate = a.IsDBNull(3) ? "------" : a.GetString(3);
                                _dto.GradeID = a.IsDBNull(4) ? "------" : a.GetString(4);
                                _dto.SType = a.IsDBNull(5) ? "------" : a.GetString(5);
                                _dto.Phone = a.IsDBNull(6) ? "------" : a.GetString(6);
                                _dto.AcaStru = a.IsDBNull(7) ? "------" : a.GetString(7);
                                _dto.Address = a.IsDBNull(8) ? "------" : a.GetString(8);
                                _dto.Shool = a.IsDBNull(9) ? "------" : a.GetString(9);
                                _dto.Class = a.IsDBNull(10) ? "------" : a.GetString(10);

                                _dto.CreateTime = a.IsDBNull(13) ? "------" : a.GetDateTime(13).ToString("yyyy-MM-dd");
                                _dto.ParentName = a.IsDBNull(14) ? "------" : a.GetString(14);
                                _dto.ParentPhone = a.IsDBNull(15) ? "------" : a.GetString(15);

                                _dto.InitialPassword = "------";


                                list.Add(_dto);
                            }

                        }
                    }
                },
          parameters)
            ;
            count = num;
            return list;
        }


        #endregion

        #region 删除异常汇总
        /// <summary>
        /// 删除异常汇总
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteStuAbnormal(string IDs)
        {

            int rows = 0;

            StringBuilder strSql = new StringBuilder();
            strSql.Append(" DELETE FROM ei_studentimportabnormal WHERE  FIND_IN_SET (ID ,@IDs ) ;");
            MySqlParameter[] parameters = {
					new MySqlParameter("@IDs", MySqlDbType.VarChar,40){Direction = ParameterDirection.InputOutput,Value = IDs}			};

            rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);

            return rows;
        }
        #endregion


        #region 更新激活时间首次登录标识
        /// <summary>
        /// 更新登录标识
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public bool UpdateActivationTimeFirstLogin(string mfgID)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append("update EI_StudentInfo set ");
            //strSql.Append("FirstLogin=0 ,ActivationTime=SYSDATE(), ExpirDate=DATE_ADD(SYSDATE(), INTERVAL 1 YEAR) "); //首次登录更新状态和过期时间
            strSql.AppendFormat("FirstLogin=0 ,ActivationTime='{0}', ExpirDate='{1}' ", DateTime.Now, DateTime.Now.AddYears(1)); //首次登录更新状态和过期时间
            strSql.Append(" where MfgID=@MfgID ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                	new MySqlParameter("@MfgID", MySqlDbType.VarChar,40)
            };
            parameters[0].Value = mfgID;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion



        public List<AnnouncementModel> GetAnnouncement(EI_StudentInfo dto)
        {
            dto = dto ?? new EI_StudentInfo();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT b.ID,b.ContentTitle,b.Content FROM EI_StudentInfo a INNER JOIN EI_Announcement b on a.OrgID=b.OrgID
WHERE a.MfgID=@MfgID AND b.Delflag=0
ORDER BY b.CreateTime DESC LIMIT 10;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@MfgID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.MfgID},
            };
            int i = 0;
            return MySQLHelper.ExecuteStatement<AnnouncementModel>(strSql.ToString(), (a) =>
            {
                return new AnnouncementModel()
                {
                    ID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    ContentTitle = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    Content = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                    Index = ++i
                };
            }, parameters);
        }

        public AnnouncementModel GetFirstAnnouncement(AnnouncementModel p)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT b.ID,b.ContentTitle, b.Content FROM EI_Announcement b
WHERE  b.ID=@ID AND b.DelFlag=0;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@ID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=p.ID},
            };

            return MySQLHelper.ExecuteStatement<AnnouncementModel>(strSql.ToString(), (a) =>
            {
                return new AnnouncementModel()
                {
                    ID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    ContentTitle = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    Content = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                };
            }, parameters).FirstOrDefault();
        }

        public List<StuDiaryModel> GetStudentDiaryList(EI_Base<EI_StuDiary> paraList)
        {
            List<StuDiaryModel> list = new List<StuDiaryModel>();
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@currentDate", MySqlDbType.DateTime,0){ Direction=ParameterDirection.InputOutput, Value=paraList.currentDate},
                new MySqlParameter("@number", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=paraList.number+1},
		        new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=paraList.TID}
            };
            strSql.Append(@" select ID, DiaryName, SId, CreateDay, DelFlag, Remark, TotalNum, DiaryType, RightNum,FormatStr,ViewDiary from( select a.ID, a.DiaryName, a.SId, a.CreateDay, a.DelFlag, a.Remark, a.TotalNum, a.DiaryType, a.RightNum,a.FormatStr,'1' as ViewDiary FROM EI_StuDiary a");
            strSql.Append(@" where a.CreateDay=(select b.CreateDay FROM EI_StuDiary b where b.SId = a.SId and b.CreateDay<date(@currentDate)");
            strSql.Append(@" order by b.CreateDay desc limit 1) and a.SId=@TID order by a.CreateDay desc limit @number) as a1");
            strSql.Append(@" union ");
            strSql.Append(@" select  ID, DiaryName, SId, CreateDay, DelFlag, Remark, TotalNum, DiaryType, RightNum,FormatStr,ViewDiary from( select a.ID, a.DiaryName, a.SId, a.CreateDay, a.DelFlag, a.Remark, a.TotalNum, a.DiaryType, a.RightNum,a.FormatStr,'2' as ViewDiary FROM EI_StuDiary a");
            strSql.Append(@" where a.CreateDay=date(@currentDate) and a.SId=@TID order by a.CreateDay desc limit @number) as a2");
            strSql.Append(@" union ");
            strSql.Append(@" select  ID, DiaryName, SId, CreateDay, DelFlag, Remark, TotalNum, DiaryType, RightNum,FormatStr,ViewDiary from(select a.ID, a.DiaryName, a.SId, a.CreateDay, a.DelFlag, a.Remark, a.TotalNum, a.DiaryType, a.RightNum,a.FormatStr,'3' as ViewDiary FROM EI_StuDiary a");
            strSql.Append(@" where a.CreateDay=date_add(@currentDate,INTERVAL 1 DAY) and a.SId=@TID order by a.CreateDay desc limit @number) as a3;");
            list.AddRange(MySQLHelper.ExecuteStatement<StuDiaryModel>(strSql.ToString(), (a) =>
            {
                StuDiaryModel dto = new StuDiaryModel()
                {
                    ID = a.GetString(0),
                    DiaryName = a.GetString(1),
                    SId = a.GetString(2),
                    CreateDay = a.GetDateTime(3),
                    DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                    Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                    TotalNum = a.IsDBNull(6) ? 0 : a.GetInt32(6),
                    DiaryTtype = a.IsDBNull(7) ? 0 : a.GetInt32(7),
                    RightNum = a.IsDBNull(8) ? "0" : a.GetString(8),
                    FormatStr = a.IsDBNull(9) ? string.Empty : a.GetString(9),
                    ViewDiary = Convert.ToByte(a.GetString(10))
                };
                dto = FormatDto(dto);
                return dto;
            }, parameters));
            if (list.Where(k => k.ViewDiary == 1).Count() == 0)//特殊情况
            {
                list.Add(new StuDiaryModel() { ViewDiary = 1, IsEmpty = true, CreateDay = paraList.currentDate.AddDays(-1) });
            }
            //strSql.Clear();
            //strSql.Append(@" select a.ID, a.DiaryName, a.SId, a.CreateDay, a.DelFlag, a.Remark, a.TotalNum, a.DiaryType, a.RightNum,a.FormatStr FROM EI_StuDiary a");
            //strSql.Append(@" where a.CreateDay=date(@currentDate) and a.SId=@TID order by a.CreateDay desc limit @number");
            //list.AddRange(MySQLHelper.ExecuteStatement<StuDiaryModel>(strSql.ToString(), (a) =>
            //{
            //    StuDiaryModel dto = new StuDiaryModel()
            //    {
            //        ID = a.GetString(0),
            //        DiaryName = a.GetString(1),
            //        SId = a.GetString(2),
            //        CreateDay = a.GetDateTime(3),
            //        DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
            //        Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
            //        TotalNum = a.IsDBNull(6) ? 0 : a.GetInt32(6),
            //        DiaryTtype = a.IsDBNull(7) ? 0 : a.GetInt32(7),
            //        RightNum = a.IsDBNull(8) ? 0 : a.GetInt32(8),
            //        FormatStr = a.IsDBNull(9) ? string.Empty : a.GetString(9),
            //        ViewDiary = 2
            //    };
            //    dto = FormatDto(dto);
            //    return dto;
            //}, parameters));
            if (list.Where(k => k.ViewDiary == 2).Count() == 0)//特殊情况
            {
                list.Add(new StuDiaryModel() { ViewDiary = 2, IsEmpty = true, CreateDay = paraList.currentDate });
            }
            //strSql.Clear();
            //strSql.Append(@" select a.ID, a.DiaryName, a.SId, a.CreateDay, a.DelFlag, a.Remark, a.TotalNum, a.DiaryType, a.RightNum,a.FormatStr FROM EI_StuDiary a");
            //strSql.Append(@" where a.CreateDay=date_add(@currentDate,INTERVAL 1 DAY) and a.SId=@TID order by a.CreateDay desc limit @number;");
            //list.AddRange(MySQLHelper.ExecuteStatement<StuDiaryModel>(strSql.ToString(), (a) =>
            //{
            //    StuDiaryModel dto = new StuDiaryModel()
            //    {
            //        ID = a.GetString(0),
            //        DiaryName = a.GetString(1),
            //        SId = a.GetString(2),
            //        CreateDay = a.GetDateTime(3),
            //        DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
            //        Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
            //        TotalNum = a.IsDBNull(6) ? 0 : a.GetInt32(6),
            //        DiaryTtype = a.IsDBNull(7) ? 0 : a.GetInt32(7),
            //        RightNum = a.IsDBNull(8) ? 0 : a.GetInt32(8),
            //        FormatStr = a.IsDBNull(9) ? string.Empty : a.GetString(9),
            //        ViewDiary = 3
            //    };
            //    dto = FormatDto(dto);
            //    return dto;
            //}, parameters));
            if (list.Where(k => k.ViewDiary == 3).Count() == 0)//特殊情况
            {
                list.Add(new StuDiaryModel() { ViewDiary = 3, IsEmpty = true, CreateDay = paraList.currentDate.AddDays(1) });
            }
            return list;
        }

        private StuDiaryModel FormatDto(StuDiaryModel dto)
        {
            switch (dto.DiaryTtype)
            {
                case 0: dto.Name = string.Format(@"完成《{0}-{1}》同步练习", dto.FormatStr, dto.DiaryName); dto.RightNumStr = Math.Ceiling(Convert.ToDouble(dto.RightNum) * 100.0 / ((dto.TotalNum <= 0) ? 1 : dto.TotalNum)).ToString() + "%"; break;
                case 1: dto.Name = string.Format(@"完成《{0}-{1}》弱项提分训练", dto.FormatStr, dto.DiaryName); dto.RightNumStr = Math.Ceiling(Convert.ToDouble(dto.RightNum) * 100.0 / ((dto.TotalNum <= 0) ? 1 : dto.TotalNum)).ToString() + "%"; break;
                case 2: dto.Name = string.Format(@"完成{0}的《{1}》作业", dto.FormatStr, dto.DiaryName); dto.RightNumStr = dto.RightNum.ToString(); break;
                case 3: dto.Name = string.Format(@"完成{0}的《{1}》考试", dto.FormatStr, dto.DiaryName); dto.RightNumStr = dto.RightNum.ToString(); break;
                case 4: dto.Name = string.Format(@"完成《{0}》错题重练", dto.FormatStr); dto.RightNumStr = Math.Ceiling(Convert.ToDouble(dto.RightNum) * 100.0 / ((dto.TotalNum <= 0) ? 1 : dto.TotalNum)).ToString() + "%"; break;
                default:
                    break;
            }
            return dto;
        }


        public List<StuDiaryModel> GetStudentDiaryDetails(EI_Base<EI_StuDiary> paraList)
        {
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@currentDate", MySqlDbType.DateTime,0){ Direction=ParameterDirection.InputOutput, Value=paraList.currentDate},
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=paraList.TID}
            };
            strSql.Append(@" select a.ID, a.DiaryName, a.SId, a.CreateDay, a.DelFlag, a.Remark, a.TotalNum, a.DiaryType, a.RightNum,a.FormatStr FROM EI_StuDiary a");
            strSql.Append(@" where a.CreateDay=date(@currentDate) and a.SId=@TID order by a.CreateDay desc ");
            return MySQLHelper.ExecuteStatement<StuDiaryModel>(strSql.ToString(), (a) =>
            {
                StuDiaryModel dto = new StuDiaryModel()
                 {
                     ID = a.GetString(0),
                     DiaryName = a.GetString(1),
                     SId = a.GetString(2),
                     CreateDay = a.GetDateTime(3),
                     DelFlag = a.IsDBNull(4) ? 0 : a.GetInt32(4),
                     Remark = a.IsDBNull(5) ? string.Empty : a.GetString(5),
                     TotalNum = a.IsDBNull(6) ? 0 : a.GetInt32(6),
                     DiaryTtype = a.IsDBNull(7) ? 0 : a.GetInt32(7),
                     RightNum = a.IsDBNull(8) ? "0" : a.GetString(8),
                     FormatStr = a.IsDBNull(9) ? string.Empty : a.GetString(9),
                 };
                dto = FormatDto(dto);
                return dto;
            }, parameters);
        }

        public StuInitModel GetInitData(EI_Base<EI_StuDiary> p)
        {
            StuInitModel dto = new StuInitModel();
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@currentDate", MySqlDbType.DateTime,-1){ Direction=ParameterDirection.InputOutput, Value=p.currentDate},
                new MySqlParameter("@number", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=p.number},
                new MySqlParameter("@SubjectID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=p.SubjectID},
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=p.TID},
                new MySqlParameter("@StageID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=Convert.ToInt32(p.Grade)},
                //new MySqlParameter("@row", MySqlDbType.Int32,4){ Direction=ParameterDirection.Output},
                //new MySqlParameter("@tag", MySqlDbType.VarChar,50){ Direction=ParameterDirection.Output},
            };
            dto.SyncJobsA = new List<SyncJobModel>();
            dto.SyncJobsB = new List<SyncJobModel>();
            dto.Jobs = new List<JobModel>();
            dto.Wrongs = new List<WrongModel>();

            //SELECT t.knowledgeID,t.KnowledgeName,SUM(t.Accuracy) as Accuracy,SUM(t.ASum) as ASum FROM(
            //SELECT c.knowledgeID,c.KnowledgeName,SUM(a.Accuracy) as Accuracy,COUNT(1) as ASum,a.CreateTime FROM EI_EAnswer a INNER JOIN EI_Exam b on a.EID=b.ID INNER JOIN EI_ERelI c on a.EID=c.EID AND a.ItemID=c.ItemID
            //inner join EI_ERelS as d on a.EID=d.EID AND a.SID=d.SID and d.StuState=2
            //WHERE b.DelFlag=0 AND b.StageID=@StageID AND b.SubjectID=@SubjectID AND a.SID=@TID 
            //GROUP BY c.KnowledgeID
            //LIMIT 6
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,SUM(a.Accuracy),COUNT(1),a.CreateTime FROM EI_JAnswer a INNER JOIN EI_Job b on a.JID=b.ID INNER JOIN EI_JRelI c on a.JID=c.JID AND a.ItemID=c.ItemID
            //inner join EI_JRelS as d on a.JID=d.JID and a.SID=d.SID and d.StuState=2
            //WHERE b.DelFlag=0 AND b.StageID=@StageID AND b.SubjectID=@SubjectID AND a.SID=@TID
            //GROUP BY c.KnowledgeID
            //LIMIT 6
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,SUM(a.Accuracy),COUNT(1),a.CreateTime FROM EI_SyncJAnswer a INNER JOIN EI_SyncJob b on a.JID=b.ID INNER JOIN EI_SyncJRelI c on a.JID=c.JID AND a.ItemID=c.ItemID
            //WHERE b.DelFlag=0 AND b.StageID=@StageID AND b.SubjectID=@SubjectID AND b.SID=@TID 
            //GROUP BY c.KnowledgeID
            //LIMIT 6) as t
            //GROUP BY t.knowledgeID
            //ORDER BY t.CreateTime DESC


            //SET @row:=0;
            //SET @tag:='';
            //SELECT r.KnowledgeID,r.KnowledgeName,SUM(r.Accuracy) from (
            //SELECT m.KnowledgeID,m.KnowledgeName,n.Accuracy,n.CreateTime,CASE WHEN @tag=m.KnowledgeID THEN @row:=@row+1 else @row:=1 end as rowNum,@tag:=m.KnowledgeID 
            //FROM (
            //SELECT k.KnowledgeID,k.KnowledgeName from (
            //SELECT t.KnowledgeID,t.KnowledgeName,t.CreateTime  FROM (
            //SELECT c.KnowledgeID,c.KnowledgeName,b.Accuracy,b.CreateTime from ei_syncjob a INNER JOIN ei_syncjanswer b on a.ID=b.JID AND a.SID=b.SID
            //INNER JOIN ei_syncjreli c on a.ID=c.JID
            //WHERE a.DelFlag=0  AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND a.SID=@TID 
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_exam a INNER JOIN ei_erels b on a.ID=b.EID
            //INNER JOIN ei_ereli c on a.ID=c.EID
            //INNER JOIN ei_eanswer d on b.EID=d.EID AND b.SID=d.SID
            //WHERE a.DelFlag=0  AND b.StuState=2 AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND b.SID=@TID
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_job a INNER JOIN ei_jrels b on a.ID=b.JID
            //INNER JOIN ei_jreli c on a.ID=c.JID
            //INNER JOIN ei_janswer d on b.JID=d.JID AND b.SID=d.SID
            //WHERE a.DelFlag=0 AND b.StuState=2 AND a.StageID=@StageID and a.SubjectID=@SubjectID AND b.SID=@TID
            //) as t  ORDER BY t.CreateTime DESC) as k
            //GROUP BY k.KnowledgeID
            //ORDER BY k.createTime desc
            //LIMIT 6 ) as m INNER JOIN (
            //SELECT c.KnowledgeID,b.Accuracy,b.CreateTime from ei_syncjob a INNER JOIN ei_syncjanswer b on a.ID=b.JID AND a.SID=b.SID
            //INNER JOIN ei_syncjreli c on a.ID=c.JID
            //WHERE a.DelFlag=0   AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND a.SID=@TID 
            //UNION ALL
            //SELECT c.KnowledgeID,d.Accuracy,d.CreateTime from ei_exam a INNER JOIN ei_erels b on a.ID=b.EID
            //INNER JOIN ei_ereli c on a.ID=c.EID
            //INNER JOIN ei_eanswer d on b.EID=d.EID AND b.SID=d.SID
            //WHERE a.DelFlag=0  AND b.StuState=2 AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND b.SID=@TID
            //UNION ALL
            //SELECT c.KnowledgeID,d.Accuracy,d.CreateTime from ei_job a INNER JOIN ei_jrels b on a.ID=b.JID
            //INNER JOIN ei_jreli c on a.ID=c.JID
            //INNER JOIN ei_janswer d on b.JID=d.JID AND b.SID=d.SID
            //WHERE a.DelFlag=0 AND b.StuState=2 AND a.StageID=@StageID and a.SubjectID=@SubjectID AND b.SID=@TID
            //) as n on m.KnowledgeID=n.KnowledgeID ) as r 
            //WHERE r.rowNum<=30
            //GROUP BY r.KnowledgeID;

            //            set @num:=0;
            //set @tag:='';
            //SELECT m.KnowledgeID,m.KnowledgeName,ROUND((SUM(m.Accuracy)*100)/count(1),0) from (
            //SELECT t.KnowledgeID,t.KnowledgeName,t.Accuracy, t.CreateTime,CASE WHEN @tag=t.KnowledgeID THEN @num:=@num+1 ELSE @num:=1 END as Num,@tag:=t.KnowledgeID  FROM (
            //SELECT c.KnowledgeID,c.KnowledgeName,b.Accuracy,b.CreateTime from ei_syncjob a INNER JOIN ei_syncjanswer b on a.ID=b.JID AND a.SID=b.SID
            //INNER JOIN ei_syncjreli c on a.ID=c.JID
            //WHERE a.DelFlag=0  AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND a.SID=@TID
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_exam a INNER JOIN ei_erels b on a.ID=b.EID
            //INNER JOIN ei_ereli c on a.ID=c.EID
            //INNER JOIN ei_eanswer d on b.EID=d.EID AND b.SID=d.SID
            //WHERE a.DelFlag=0  AND b.StuState=2 AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND b.SID=@TID
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_job a INNER JOIN ei_jrels b on a.ID=b.JID
            //INNER JOIN ei_jreli c on a.ID=c.JID
            //INNER JOIN ei_janswer d on b.JID=d.JID AND b.SID=d.SID
            //WHERE a.DelFlag=0 AND b.StuState=2 AND a.StageID=@StageID and a.SubjectID=@SubjectID AND b.SID=@TID
            //) as t ORDER BY t.KnowledgeID, t.CreateTime DESC) as m WHERE m.Num<=30
            //GROUP BY m.KnowledgeID ORDER BY SUM(m.Accuracy)/Count(1) LIMIT 6;

            MySQLHelper.ExecuteStatementList<StuInitModel>(@"select ID, KnowledgeID, KnowledgeName, MAX(TropNumber) as TropNumber ,RuleType,KnowledgeDetialID FROM EI_SyncJob WHERE DelFlag=0 and StageID=@StageID and RuleType=0 AND SubjectID=@SubjectID AND SID=@TID GROUP by KnowledgeID ORDER BY createtime DESC LIMIT @number;

SELECT c.ID,c.`Name`,c.EndTime,c.P FROM(
select a.ID,a.Name,a.EndTime,0 as P FROM EI_Job a inner join EI_JRelS b on a.ID=b.JID
where a.StageID=@StageID and b.SID=@TID AND a.SubjectID=@SubjectID and a.DelFlag=0 and b.StuState=0 and a.EndTime>now()
UNION ALL
select a.ID,a.Name,a.EndTime,1 as P FROM EI_Exam a inner join EI_ERelS b on a.ID=b.EID
where a.StageID=@StageID and b.SID=@TID AND a.SubjectID=@SubjectID and a.DelFlag=0 and b.StuState=0 and a.EndTime>now()
) as c ORDER BY c.EndTime LIMIT @number;

select KnowledgeID, KnowledgeName ,count(KnowledgeID) as Num FROM EI_Wrong where SID=@TID and StageID=@StageID and SubjectID=@SubjectID GROUP BY KnowledgeID,KnowledgeName DESC LIMIT @number;

set @num:=0;
set @tag:='';
SELECT * from (
SELECT m.KnowledgeID,m.KnowledgeName,ROUND((SUM(m.Accuracy)*100)/count(1),0) as tCount from (

SELECT t.KnowledgeID,t.KnowledgeName,t.Accuracy, t.CreateTime,

CASE WHEN @tag=t.KnowledgeID THEN @num:=@num+1 ELSE @num:=1 END as Num,@tag:=t.KnowledgeID  

FROM (

SELECT c.KnowledgeID,c.KnowledgeName,b.Accuracy,b.CreateTime 
from ei_syncjob a 
INNER JOIN ei_syncjreli c on a.ID=c.JID
INNER JOIN ei_syncjanswer b on a.ID=b.JID AND a.SID=b.SID  AND b.ItemID=c.ItemID
WHERE a.DelFlag=0  AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND a.SID=@TID

UNION ALL

SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_exam a INNER JOIN ei_erels b on a.ID=b.EID
INNER JOIN ei_ereli c on a.ID=c.EID
INNER JOIN ei_eanswer d on b.EID=d.EID AND b.SID=d.SID AND c.ItemID=d.ItemID
WHERE a.DelFlag=0  AND b.StuState=2 AND a.StageID=@StageID AND a.SubjectID=@SubjectID AND b.SID=@TID

UNION ALL

SELECT c.KnowledgeID,c.KnowledgeName,d.Accuracy,d.CreateTime from ei_job a INNER JOIN ei_jrels b on a.ID=b.JID
INNER JOIN ei_jreli c on a.ID=c.JID
INNER JOIN ei_janswer d on b.JID=d.JID AND b.SID=d.SID AND c.ItemID=d.ItemID
WHERE a.DelFlag=0 AND b.StuState=2 AND a.StageID=@StageID and a.SubjectID=@SubjectID AND b.SID=@TID

) as t ORDER BY t.KnowledgeID, t.CreateTime DESC) as m WHERE m.Num<=30
GROUP BY m.KnowledgeID  ) as q ORDER BY q.tCount LIMIT 6;

", (a) =>
            {
                if (a.HasRows)//同步学习
                {
                    while (a.Read())
                    {
                        dto.SyncJobsA.Add(new SyncJobModel()
                        {
                            ID = a.GetString(0),
                            KnowledgeID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                            KnowledgeName = a.IsDBNull(2) ? string.Empty : a.GetString(2),
                            TropNumber = a.IsDBNull(3) ? 0 : a.GetInt32(3),
                            RuleType = a.IsDBNull(4) ? 0 : a.GetInt32(4),//0代表同步学习; 3代表弱项提分
                            KnowledgeDetialID = a.IsDBNull(5) ? string.Empty : a.GetString(5)
                        });
                    }
                }
                if (a.NextResult())
                {
                    while (a.Read())
                    {
                        dto.Jobs.Add(new JobModel()//老师布置
                        {
                            ID = a.GetString(0),
                            Name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                            EndTime = a.IsDBNull(2) ? DateTime.MinValue : a.GetDateTime(2),
                            T = (a.IsDBNull(2) ? DateTime.MinValue : a.GetDateTime(2)).ToShortDateString(),
                            Redirect = a.GetInt32(3)
                        });
                    }
                }
                if (a.NextResult())
                {
                    while (a.Read())
                    {
                        dto.Wrongs.Add(new WrongModel()//错题 
                        {
                            KnowledgeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                            KnowledgeName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                            Tag = a.IsDBNull(2) ? 0 : a.GetInt32(2)//错题数
                        });
                    }
                }
                if (a.NextResult())
                {
                    while (a.Read())//弱项提分
                    {
                        SyncJobModel m = new SyncJobModel();
                        m.KnowledgeID = a.IsDBNull(0) ? 0 : a.GetInt32(0);
                        m.KnowledgeName = a.IsDBNull(1) ? string.Empty : a.GetString(1);
                        m.MasterRateStr = (a.IsDBNull(2) ? 0 : a.GetDouble(2)).ToString() + "%";
                        //m.Accuracy = a.IsDBNull(2) ? 0 : a.GetDouble(2);
                        //m.MasterRateStr = Convert.ToInt32(m.Accuracy * 100 / 30).ToString() + "%";
                        //m.ASum = a.IsDBNull(3) ? 0 : a.GetInt32(3);
                        //m.MasterRateStr = Convert.ToInt32(m.Accuracy * 100 / m.ASum).ToString() + "%";
                        dto.SyncJobsB.Add(m);
                    }
                }
                return dto;
            }, parameters);
            return dto;


            //            strSql.Append(@"select ID, KnowledgeID, KnowledgeName, MAX(TropNumber) as TropNumber ,RuleType FROM EI_SyncJob WHERE DelFlag=0 and StageID=@StageID and RuleType=0 AND SubjectID=@SubjectID AND SID=@TID GROUP by KnowledgeID ORDER BY createtime DESC LIMIT @number;");
            //            dto.SyncJobsA.AddRange(MySQLHelper.ExecuteStatement<SyncJobModel>(strSql.ToString(), (a) =>
            //            {
            //                return new SyncJobModel()
            //                {
            //                    ID = a.GetString(0),
            //                    KnowledgeID = a.IsDBNull(1) ? 0 : a.GetInt32(1),
            //                    KnowledgeName = a.IsDBNull(2) ? string.Empty : a.GetString(2),
            //                    TropNumber = a.IsDBNull(3) ? 0 : a.GetInt32(3),
            //                    RuleType = a.IsDBNull(4) ? 0 : a.GetInt32(4)//0代表同步学习; 3代表弱项提分
            //                };
            //            }, parameters));
            //            strSql.Clear();
            //            strSql.Append(@"SELECT c.ID,c.`Name`,c.EndTime,c.P FROM(
            //select a.ID,a.Name,a.EndTime,0 as P FROM EI_Job a inner join EI_JRelS b on a.ID=b.JID
            //where a.StageID=@StageID and b.SID=@TID AND a.SubjectID=@SubjectID and a.DelFlag=0 and b.StuState=0 and a.EndTime>now()
            //UNION ALL
            //select a.ID,a.Name,a.EndTime,1 as P FROM EI_Exam a inner join EI_ERelS b on a.ID=b.EID
            //where a.StageID=@StageID and b.SID=@TID AND a.SubjectID=@SubjectID and a.DelFlag=0 and b.StuState=0 and a.EndTime>now()
            //) as c ORDER BY c.EndTime LIMIT @number");
            //            dto.Jobs.AddRange(MySQLHelper.ExecuteStatement<JobModel>(strSql.ToString(), (a) =>
            //            {
            //                return new JobModel()
            //                {
            //                    ID = a.GetString(0),
            //                    Name = a.IsDBNull(1) ? string.Empty : a.GetString(1),
            //                    EndTime = a.IsDBNull(2) ? DateTime.MinValue : a.GetDateTime(2),
            //                    T = (a.IsDBNull(2) ? DateTime.MinValue : a.GetDateTime(2)).ToShortDateString(),
            //                    Redirect = a.GetInt32(3)
            //                };
            //            }, parameters));
            //            strSql.Clear();
            //            strSql.Append(@"select KnowledgeID, KnowledgeName ,count(KnowledgeID) as Num FROM EI_Wrong");
            //            strSql.Append(@" where SID=@TID and StageID=@StageID and SubjectID=@SubjectID GROUP BY KnowledgeID,KnowledgeName DESC LIMIT @number;");
            //            dto.Wrongs.AddRange(MySQLHelper.ExecuteStatement<WrongModel>(strSql.ToString(), (a) =>
            //            {
            //                return new WrongModel()
            //                {
            //                    KnowledgeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
            //                    KnowledgeName = a.IsDBNull(1) ? string.Empty : a.GetString(1),
            //                    Tag = a.IsDBNull(2) ? 0 : a.GetInt32(2)//错题数
            //                };
            //            }, parameters));
            //            strSql.Clear();
            //            strSql.Append(@"SELECT t.knowledgeID,t.KnowledgeName,SUM(t.Accuracy) as Accuracy,SUM(t.ASum) as ASum FROM(
            //SELECT c.knowledgeID,c.KnowledgeName,SUM(a.Accuracy) as Accuracy,COUNT(1) as ASum,a.CreateTime FROM EI_EAnswer a INNER JOIN EI_Exam b on a.EID=b.ID INNER JOIN EI_ERelI c on a.EID=c.EID AND a.ItemID=c.ItemID
            //WHERE b.DelFlag=0 AND b.StageID=@StageID AND b.SubjectID=@SubjectID AND a.SID=@TID 
            //GROUP BY c.KnowledgeID
            //LIMIT 6
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,SUM(a.Accuracy),COUNT(1),a.CreateTime FROM EI_JAnswer a INNER JOIN EI_Job b on a.JID=b.ID INNER JOIN EI_JRelI c on a.JID=c.JID AND a.ItemID=c.ItemID
            //WHERE b.DelFlag=0 AND b.StageID=@StageID AND b.SubjectID=@SubjectID AND a.SID=@TID
            //GROUP BY c.KnowledgeID
            //LIMIT 6
            //UNION ALL
            //SELECT c.KnowledgeID,c.KnowledgeName,SUM(a.Accuracy),COUNT(1),a.CreateTime FROM EI_SyncJAnswer a INNER JOIN EI_SyncJob b on a.JID=b.ID INNER JOIN EI_SyncJRelI c on a.JID=c.JID AND a.ItemID=c.ItemID
            //WHERE b.DelFlag=0 AND b.StageID=@StageID AND b.SubjectID=@SubjectID AND b.SID=@TID 
            //GROUP BY c.KnowledgeID
            //LIMIT 6) as t
            //GROUP BY t.knowledgeID
            //ORDER BY t.CreateTime DESC
            //LIMIT 6;");
            //            //
            //            dto.SyncJobsB.AddRange(MySQLHelper.ExecuteStatement<SyncJobModel>(strSql.ToString(), (a) =>
            //            {
            //                SyncJobModel m = new SyncJobModel();
            //                m.KnowledgeID = a.IsDBNull(0) ? 0 : a.GetInt32(0);
            //                m.KnowledgeName = a.IsDBNull(1) ? string.Empty : a.GetString(1);
            //                m.Accuracy = a.IsDBNull(2) ? 0 : a.GetDouble(2);
            //                m.ASum = a.IsDBNull(3) ? 0 : a.GetInt32(3);
            //                m.MasterRateStr = Convert.ToInt32(m.Accuracy * 100 / m.ASum).ToString() + "%";
            //                return m;
            //            }, parameters));
            //            return dto;
        }

        public StudentExperienceModel GetStudentData(EI_Base<EI_StuDiary> para)
        {
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@TID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.TID}
            };
            strSql.Append(@" SELECT a.ExpirDate,b.ExperNumber,c.`Value` as ValueMax ,c.Remark,
CASE WHEN c.`Value` is NULL or c.`Value`='' THEN (SELECT MAX(CAST(e.`Value` AS signed)) FROM EI_Dict e WHERE e.type='Exper')
ELSE (SELECT d.`Value` FROM EI_Dict d WHERE d.Type='Exper' AND CAST(d.`Value` AS signed) < CAST(c.`Value` as  signed) AND d.`Value` is NOT NULL  ORDER BY CAST(d.`Value` AS signed) DESC LIMIT 1) END
as ValueMin
FROM EI_StudentInfo a INNER JOIN EI_Experience b on a.MfgID=b.SID
INNER JOIN EI_Dict c on c.Code=b.DictID");
            strSql.Append(@" WHERE a.MfgID=@TID and c.Type='Exper'; ");
            return MySQLHelper.ExecuteStatement<StudentExperienceModel>(strSql.ToString(), (a) =>
            {
                return new StudentExperienceModel()
                {
                    ExpirDate = a.IsDBNull(0) ? DateTime.Now : a.GetDateTime(0),
                    ExperNumber = a.IsDBNull(1) ? 0 : a.GetInt32(1),
                    MaxValue = a.IsDBNull(2) ? "0" : a.GetString(2),
                    Remark = a.IsDBNull(3) ? string.Empty : a.GetString(3),
                    MinValue = a.IsDBNull(4) ? "0" : a.GetString(4)
                };
            }, parameters).FirstOrDefault();
        }
        #region 保存学霸日记

        //        /// <summary>
        //        /// 学霸日记
        //        /// </summary>
        //        /// <param name="SID">学生ID</param>
        //        /// <param name="DiaryType">类型:0代表同步学习；1代表弱项提分；2电子作业；3在线考试 4错题重练  </param>
        //        /// <param name="DiaryName">类型0和1时为知识点名称，类型2为作业名称，类型3时为考试名称；类型4为空</param>
        //        /// <param name="FormatStr">类型0、1和4时为科目名称，类型2和3为教师名称；</param>
        //        /// <param name="TotalNum">类型0、1和4为总题数;类型为2和3为总分数；</param>
        //        /// <param name="RightNum">类型0、1和4为答对多少题；类型为2和3为成绩</param>
        //        /// <param name="SourceID">类型0、1为知识点ID；类型2为作业ID；类型3为考试ID；类型4为空</param>
        //        /// <returns>
        //        /// </returns>
        //        public string SaveDiary(string SID, byte DiaryType, string DiaryName, string FormatStr, int TotalNum, int RightNum, string SourceID)
        //        {
        //            switch (DiaryType)
        //            {
        //                case 0: break;
        //                case 1: DiaryType = 2; break;
        //                case 2: DiaryType = 3; break;
        //                case 3: DiaryType = 1; break;
        //                case 4: break;
        //                default:
        //                    break;
        //            }

        //            MySqlParameter[] parameters = {
        //                    new MySqlParameter("@ID",MySqlDbType.VarChar,40),
        //                    new MySqlParameter("@SID", MySqlDbType.VarChar,40),
        //                    new MySqlParameter("@DiaryName", MySqlDbType.VarChar,200),
        //                    new MySqlParameter("@FormatStr", MySqlDbType.VarChar,200),
        //                    new MySqlParameter("@TotalNum", MySqlDbType.Int32,11),
        //                    new MySqlParameter("@DiaryType", MySqlDbType.Int32,11),
        //                    new MySqlParameter("@RightNum", MySqlDbType.VarChar,10),
        //                    new MySqlParameter("@SourceID", MySqlDbType.VarChar,40)
        //                                           };
        //            parameters[0].Value = Guid.NewGuid();
        //            parameters[1].Value = SID.Trim();
        //            parameters[2].Value = DiaryName.Trim();
        //            parameters[3].Value = FormatStr.Trim();
        //            parameters[4].Value = TotalNum;
        //            parameters[5].Value = DiaryType;
        //            parameters[6].Value = RightNum;
        //            parameters[7].Value = SourceID;
        //            StringBuilder sql = new StringBuilder();
        //            StringBuilder sqlInner = new StringBuilder();
        //            switch (DiaryType)
        //            {
        //                //同步学习
        //                case 0:
        //                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID AND CreateDay=DATE(now()) and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
        //                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
        //                    {
        //                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum=TotalNum+{0},RightNum=RightNum+{1} where SId='{2}' and CreateDay=DATE(now()) and SourceID='{3}' and FormatStr='{4}' and DiaryType={5};",
        //                            TotalNum, RightNum, SID, SourceID, FormatStr, DiaryType);
        //                    }
        //                    else
        //                    {
        //                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
        //(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
        //VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
        //                     Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
        //                    }
        //                    break;
        //                //弱项提分
        //                case 1:
        //                    sqlInner.Clear();
        //                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID AND CreateDay=DATE(now()) and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
        //                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
        //                    {
        //                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum=TotalNum+{0},RightNum=RightNum+{1} where SId='{2}' and CreateDay=DATE(now()) and SourceID='{3}' and FormatStr='{4}' and DiaryType={5};",
        //                          TotalNum, RightNum, SID, SourceID, FormatStr, SourceID);
        //                    }
        //                    else
        //                    {
        //                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
        //(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
        //VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
        //                     Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
        //                    }
        //                    break;
        //                //电子作业
        //                case 2:
        //                    sqlInner.Clear();
        //                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
        //                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
        //                    {
        //                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum={0},RightNum={1} where SId='{2}' and FormatStr='{3}' and SourceID='{4}' and DiaryType={5};",
        //                            TotalNum, RightNum, SID, FormatStr, SourceID, DiaryType);
        //                    }
        //                    else
        //                    {
        //                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
        //(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
        //VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
        //                      Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
        //                    }
        //                    break;
        //                //在线考试
        //                case 3:
        //                    sqlInner.Clear();
        //                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
        //                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
        //                    {
        //                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum={0},RightNum={1} where SId='{2}' and FormatStr='{3}' and SourceID='{4}' and DiaryType={5};",
        //                           TotalNum, RightNum, SID, FormatStr, SourceID, DiaryType);
        //                    }
        //                    else
        //                    {
        //                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
        //(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
        //VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
        //                     Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
        //                    }
        //                    break;
        //                //错题重练
        //                case 4:
        //                    sqlInner.Clear();
        //                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID AND CreateDay=DATE(now()) and FormatStr=@FormatStr and DiaryType=@DiaryType;");
        //                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
        //                    {
        //                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum={0},RightNum={1} where SId='{2}' AND CreateDay=DATE(now()) and FormatStr='{3}' and DiaryType={4};",
        //                           TotalNum, RightNum, SID, FormatStr, DiaryType);
        //                    }
        //                    else
        //                    {
        //                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
        //(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
        //VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
        //                      Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
        //                    }
        //                    break;
        //                default:
        //                    break;
        //            }
        //            return sql.ToString();
        //        }


        /// <summary>
        /// 学霸日记
        /// </summary>
        /// <param name="SID">学生ID</param>
        /// <param name="DiaryType">类型:0代表同步学习；1代表弱项提分；2电子作业；3在线考试 4错题重练  </param>
        /// <param name="DiaryName">类型0和1时为知识点名称，类型2为作业名称，类型3时为考试名称；类型4为空</param>
        /// <param name="FormatStr">类型0、1和4时为科目名称，类型2和3为教师名称；</param>
        /// <param name="TotalNum">类型0、1和4为总题数;类型为2和3为总分数；</param>
        /// <param name="RightNum">类型0、1和4为答对多少题；类型为2和3为成绩</param>
        /// <param name="SourceID">类型0、1为知识点ID；类型2为作业ID；类型3为考试ID；类型4为空</param>
        /// <returns>
        /// </returns>
        public string SaveDiary(string SID, byte DiaryType, string DiaryName, string FormatStr, int TotalNum, string RightNum, string SourceID)
        {
            switch (DiaryType)
            {
                case 0: break;
                case 1: DiaryType = 2; break;
                case 2: DiaryType = 3; break;
                case 3: DiaryType = 1; break;
                case 4: break;
                default:
                    break;
            }

            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID",MySqlDbType.VarChar,40),
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@DiaryName", MySqlDbType.VarChar,200),
                    new MySqlParameter("@FormatStr", MySqlDbType.VarChar,200),
                    new MySqlParameter("@TotalNum", MySqlDbType.Int32,11),
                    new MySqlParameter("@DiaryType", MySqlDbType.Int32,11),
                    new MySqlParameter("@RightNum", MySqlDbType.VarChar,10),
                    new MySqlParameter("@SourceID", MySqlDbType.VarChar,40)
                                           };
            parameters[0].Value = Guid.NewGuid();
            parameters[1].Value = SID.Trim();
            parameters[2].Value = DiaryName.Trim();
            parameters[3].Value = FormatStr.Trim();
            parameters[4].Value = TotalNum;
            parameters[5].Value = DiaryType;
            parameters[6].Value = RightNum;
            parameters[7].Value = SourceID;
            StringBuilder sql = new StringBuilder();
            StringBuilder sqlInner = new StringBuilder();
            switch (DiaryType)
            {
                //同步学习
                case 0:
                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID AND CreateDay=DATE(now()) and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
                    {
                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum=TotalNum+{0},RightNum=RightNum+{1} where SId='{2}' and CreateDay=DATE(now()) and SourceID='{3}' and FormatStr='{4}' and DiaryType={5};",
                            TotalNum, RightNum, SID, SourceID, FormatStr, DiaryType);
                    }
                    else
                    {
                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
                     Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
                    }
                    break;
                //弱项提分
                case 1:
                    sqlInner.Clear();
                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID AND CreateDay=DATE(now()) and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
                    {
                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum=TotalNum+{0},RightNum=RightNum+{1} where SId='{2}' and CreateDay=DATE(now()) and SourceID='{3}' and FormatStr='{4}' and DiaryType={5};",
                          TotalNum, RightNum, SID, SourceID, FormatStr, SourceID);
                    }
                    else
                    {
                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
                     Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
                    }
                    break;
                //电子作业
                case 2:
                    sqlInner.Clear();
                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
                    {
                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum={0},RightNum={1} where SId='{2}' and FormatStr='{3}' and SourceID='{4}' and DiaryType={5};",
                            TotalNum, RightNum, SID, FormatStr, SourceID, DiaryType);
                    }
                    else
                    {
                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
                      Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
                    }
                    break;
                //在线考试
                case 3:
                    sqlInner.Clear();
                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID and SourceID=@SourceID and FormatStr=@FormatStr and DiaryType=@DiaryType;");
                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
                    {
                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum={0},RightNum={1} where SId='{2}' and FormatStr='{3}' and SourceID='{4}' and DiaryType={5};",
                           TotalNum, RightNum, SID, FormatStr, SourceID, DiaryType);
                    }
                    else
                    {
                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
                     Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
                    }
                    break;
                //错题重练
                case 4:
                    sqlInner.Clear();
                    sqlInner.Append(@"SELECT COUNT(1) FROM EI_StuDiary WHERE SId=@SID AND CreateDay=DATE(now()) and FormatStr=@FormatStr and DiaryType=@DiaryType;");
                    if (MySQLHelper.GetSingle(sqlInner.ToString(), parameters).ToString() != "0")
                    {
                        sql.AppendFormat(@"UPDATE EI_StuDiary set TotalNum={0},RightNum={1} where SId='{2}' AND CreateDay=DATE(now()) and FormatStr='{3}' and DiaryType={4};",
                           TotalNum, RightNum, SID, FormatStr, DiaryType);
                    }
                    else
                    {
                        sql.AppendFormat(@"INSERT INTO EI_StuDiary
(ID, DiaryName, FormatStr, SId, CreateDay, CreateTime, DelFlag, Remark, TotalNum, DiaryType, RightNum, SourceID, EditTime) 
VALUES('{0}','{1}','{2}','{3}',now(),now(),0,'',{4},{5},{6},'{7}',now());",
                      Guid.NewGuid(), DiaryName, FormatStr, SID, TotalNum, DiaryType, RightNum, SourceID);
                    }
                    break;
                default:
                    break;
            }
            return sql.ToString();
        }
        #endregion

        public EI_StudentInfo GetSingleUser(EI_StudentInfo dto)
        {
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@MfgID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.MfgID},
                new MySqlParameter("@OrgID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.OrgID}
            };
            strSql.Append(@" SELECT OrgID,Phone,Shool FROM EI_StudentInfo  WHERE MfgID=@MfgID AND OrgID=@OrgID;");
            return MySQLHelper.ExecuteStatement<EI_StudentInfo>(strSql.ToString(), (a) =>
            {

                dto.OrgID = a.IsDBNull(0) ? 0 : a.GetInt32(0);
                dto.Phone = a.IsDBNull(1) ? string.Empty : a.GetString(1);
                dto.Shool = a.IsDBNull(2) ? string.Empty : a.GetString(2);

                return dto;
            }, parameters).FirstOrDefault();
        }
    }
}
