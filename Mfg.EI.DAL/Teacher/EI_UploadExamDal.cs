using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL.Teacher
{
    public class EI_UploadExamDal
    {
        #region 私有变量
        private TeachDiaryDal _teachDiaryDal = new TeachDiaryDal();//日志
        #endregion

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_UploadExam model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_UploadExam(");
            strSql.Append("ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount,DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark,FromArea)");
            strSql.Append(" values (");
            strSql.Append("@ID,@Name,@Year,@Grade,@SubjectID,@ExamType,@ExamVersion,@ShareSet,@PreviewCount,@DownloadCount,@Uri,@OrgID,@CreateBy,@CreateTime,@DelFlag,@Remark,@FromArea) ;");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@Name", MySqlDbType.VarChar,200),
					new MySqlParameter("@Year", MySqlDbType.VarChar,10),
					new MySqlParameter("@Grade", MySqlDbType.Int32),
                    new MySqlParameter("@SubjectID", MySqlDbType.Int32),
                    new MySqlParameter("@ExamType", MySqlDbType.Int32),
                    new MySqlParameter("@ExamVersion", MySqlDbType.VarChar,50),
                    new MySqlParameter("@ShareSet", MySqlDbType.Int32),
                    new MySqlParameter("@PreviewCount", MySqlDbType.Int32),
                    new MySqlParameter("@DownloadCount", MySqlDbType.Int32),
                    new MySqlParameter("@Uri", MySqlDbType.VarChar,500),
                    new MySqlParameter("@OrgID", MySqlDbType.Int32),
                    new MySqlParameter("@CreateBy", MySqlDbType.VarChar,50),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Bit,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@FromArea", MySqlDbType.VarChar,500)};
            parameters[0].Value = Guid.NewGuid().ToString();
            parameters[1].Value = model.Name;
            parameters[2].Value = model.Year;
            parameters[3].Value = model.Grade;
            parameters[4].Value = model.SubjectID;
            parameters[5].Value = model.ExamType;
            parameters[6].Value = model.ExamVersion;
            parameters[7].Value = model.ShareSet;
            parameters[8].Value = model.PreviewCount;
            parameters[9].Value = model.DownloadCount;
            parameters[10].Value = model.Uri;
            parameters[11].Value = model.OrgID;
            parameters[12].Value = model.CreateBy;
            parameters[13].Value = model.CreateTime;
            parameters[14].Value = model.DelFlag;
            parameters[15].Value = model.Remark;
            parameters[16].Value = model.FromArea;

            string diarySql = _teachDiaryDal.SaveDiary(string.Format("上传好卷【{0}】", model.Name), model.CreateBy);//添加上传好卷日志

            int rows = MySQLHelper.ExecuteSql(strSql.ToString() + diarySql, parameters);
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
        /// 查询出所有共享试卷数据
        /// </summary>
        /// <returns></returns>
        public List<EI_UploadExam> ExamShare()
        {
            StringBuilder strSql = new StringBuilder();
            //select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,
            //PreviewCount,DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark  
            //from EI_UploadExam where 
            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount,DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where ShareSet=1");
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 查询出我的上传
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public List<EI_UploadExam> MyUpExamPaper(int orgId)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where OrgID=" + orgId);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 查看我的收藏
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public List<EI_UploadExam> MyCollect(int orgId)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append("select eu.ID,eu.Name from EI_UploadExam as eu INNER JOIN EI_Favorite as ef");
            strSql.Append("where eu.ID=ef.ItemID and eu.OrgID=" + orgId);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        public DataSet MyCollect(string createBy, string subjectID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT EI_Favorite.ID,EI_Favorite.TID,EI_Favorite.ItemID,EI_Favorite.FType,EI_Favorite.TagID,EI_Favorite.CreateTime,EI_Favorite.DelFlag,EI_Favorite.Remark");
            strSql.AppendFormat(" FROM EI_Favorite where TID='{0}'", createBy);
            strSql.AppendFormat(" and subjectID='{0}'", subjectID);

            DataSet ds = MySQLHelper.Query(strSql.ToString());
            return ds;
        }

        /// <summary>
        /// 查询所有数据
        /// </summary>
        /// <returns></returns>
        public List<EI_UploadExam> GetAllData()
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where DelFlag=0");
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 根据年级搜索
        /// </summary>
        /// <param name="grade"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetGrade(int grade)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where DelFlag=0 and Grade=" + grade);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 适用版本
        /// </summary>
        /// <param name="version"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetExamVersion(int version)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where DelFlag=0 and ExamVersion=" + version);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 适用类型
        /// </summary>
        /// <param name="examType"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetExamType(string examType)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where DelFlag=0 and ExamType=" + examType);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 根据文件名字进行搜索
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetName(int name)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where DelFlag=0 and Name=" + name);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 排序
        /// </summary>
        /// <param name="orderBy"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetOrderBy(string orderBy)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam order by CreateTime " + orderBy);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }

        /// <summary>
        /// 人气最热
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<EI_UploadExam> GetPreviewCount(int count)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where PreviewCount=" + count);
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }


        public List<EI_UploadExam> GetWhere(
            string grade,
            string examType,
            string examVersion,
            string name,
            string menuType,
            string subjectId,
            string createBy,
            string orderByName,
            string orderByType, string orgid = "")
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"select EU.FromArea as Source, ED.`Value` AS ExamTypeName,EM.`Name` as TName, EU.ID,EU.Name,EU.Year,EU.Grade,EU.SubjectID,EU.ExamType,EU.ExamVersion,EU.ShareSet,EU.PreviewCount,EU.DownloadCount,EU.Uri,EU.OrgID,EU.CreateBy,EU.CreateTime,
EU.DelFlag,EU.Remark,EF.ID ,CASE  WHEN ISNULL(EF.ID) THEN 0 WHEN NOT ISNULL(EF.ID)  then 1 END as ShouCang,EF.FType
from EI_UploadExam as EU left JOIN EI_Favorite as EF on EU.ID=EF.ItemID and EF.FType=1 AND EF.TID='" + createBy +
     "'inner JOIN EI_Dict ED ON EU.ExamType=ED.`Code`  and ED.Type='PaperType' inner join EI_ManagerInfo EM on EU.CreateBy=EM.AccountNumber where EU.DelFlag=0 ");
            //年级
            if (!string.IsNullOrEmpty(grade))
            {
                if (grade == "x")
                {
                    strSql.Append(
                        " and ( EU.Grade=1 or EU.Grade=2 or EU.Grade=3 or EU.Grade=4 or EU.Grade=5 or EU.Grade=6)");
                }
                else if (grade == "c")
                {
                    strSql.Append(
                        " and ( EU.Grade=7 or EU.Grade=8 or EU.Grade=9 )");
                }
                else if (grade == "g")
                {
                    strSql.Append(
                        " and ( EU.Grade=10 or EU.Grade=11 or EU.Grade=12 )");
                }
                else
                {
                    strSql.Append(" and EU.Grade= " + grade);
                }
            }
            //年级
            if (!string.IsNullOrEmpty(subjectId))
            {
                strSql.Append(" and EU.SubjectID= " + subjectId);
            }

            //试卷类型
            if (!string.IsNullOrEmpty(examType))
            {
                strSql.Append(" and EU.ExamType= " + examType);
                //strSql.Append(" ED.`Value`=" + examType);
            }
            //试卷版本
            if (!string.IsNullOrEmpty(examVersion))
            {
                strSql.Append(" and EU.ExamVersion= " + examVersion);
            }
            //菜单项 我的收藏，我的上传，共享试卷
            if (!string.IsNullOrEmpty(menuType))
            {
                //共享试卷和当前机构所有老师上传的试卷
                if (menuType == "shareSet")
                {
                    strSql.AppendFormat(" and (EU.ShareSet= {0} OR EU.OrgID={1})", 1, orgid);

                }
                else if (menuType == "createBy")
                {
                    strSql.Append(" and EU.CreateBy= " + createBy);
                }
                else if (menuType == "collect")
                {
                    strSql.Append(" and  NOT ISNULL(EF.ID) ");
                }

            }
            //试卷搜索
            if (!string.IsNullOrEmpty(name))
            {
                strSql.Append(" and EU.Name like '%" + name + "%'");
            }
            //热度，时间排序
            if (!string.IsNullOrEmpty(orderByName))
            {
                strSql.Append(" order by " + orderByName + orderByType);
            }
            //默认时间升序排列
            else
            {
                strSql.Append(" order by year asc ");
            }

            DataSet ds = MySQLHelper.Query(strSql.ToString());

            List<EI_UploadExam> list = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModelList(ds.Tables[0]);
            return list;
        }
        /// <summary>
        /// 添加试卷点击次数
        /// </summary>
        /// <returns></returns>
        public EI_UploadExam AddClickCount(string id)
        {
            StringBuilder strSql = new StringBuilder();


            strSql.Append(@"select ID,Name,Year,Grade,SubjectID,ExamType,ExamVersion,ShareSet,PreviewCount");
            strSql.Append(",DownloadCount,Uri,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_UploadExam where DelFlag=0 and ID=@ID;");

            strSql.Append("update EI_UploadExam set PreviewCount=(PreviewCount+1) WHERE ID=@ID;");
            MySqlParameter[] sqlPara = new MySqlParameter[] { new MySqlParameter("@ID", MySqlDbType.VarChar, 40) };
            sqlPara[0].Value = id;
            var ds = MySQLHelper.Query(strSql.ToString(), sqlPara);
            var examPaerModel = Mfg.EI.Common.ModelConvertHelper<EI_UploadExam>.ConvertToModel(ds.Tables[0]);
            return examPaerModel;

        }
        /// <summary>
        /// 删除试卷
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeletePaper(string id)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append("update EI_UploadExam set DelFlag=1 WHERE ID=@ID;");
            strSql.Append("delete from EI_Favorite where ItemID =@ID");
            MySqlParameter[] sqlPara = new MySqlParameter[] { new MySqlParameter("@ID", MySqlDbType.VarChar, 40) };
            sqlPara[0].Value = id;
            return MySQLHelper.ExecuteSql(strSql.ToString(), sqlPara) > 0;

        }
    }
}
