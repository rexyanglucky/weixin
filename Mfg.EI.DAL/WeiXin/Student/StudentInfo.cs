using Mfg.EI.DBHelper;
using MySql.Data.MySqlClient;
using System.Text;
using System.Data;

namespace Mfg.EI.DAL.WeiXin.Student
{
    public class StudentInfo
    {
        //private static log4net.ILog _log = log4net.LogManager.GetLogger("LogFile");
        #region 查询学生信息
        /// <summary>
        /// 通过微信账号查询学生所在机构ID
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public DataSet OrgIDByWeiXin(string WeiXin)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select OrgID from EI_StudentInfo a ");
            strSql.Append(" inner join  ");
            strSql.Append(" EI_FamilyInfo b ");
            strSql.Append(" on a.mfgid=b.sid ");
            strSql.Append(" where b.WeiXin=@WeiXin ");
            strSql.Append(" and b.DelFlag=0 ");
            strSql.Append(" and a.DelFlag=0 ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,200)};
            parameters[0].Value = WeiXin;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 查询学生ID By 微信帐号
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public DataSet StuIDByWeiXin(string WeiXin,string AppId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.SID as Mfgid,b.Name from ei_familyinfo a ");
            strSql.Append(" INNER JOIN ei_studentinfo b ");
            strSql.Append(" on a.SID=b.MfgID  ");
            strSql.Append(" INNER JOIN ei_org c ");
            strSql.Append(" on b.OrgID=c.ID  ");
            strSql.Append(" where a.weixin=@WeiXin ");
            strSql.Append(" and c.weixin=@AppId ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,200),
                new MySqlParameter("@AppId", MySqlDbType.VarChar,200),
                                         };
            parameters[0].Value = WeiXin;
            parameters[1].Value = AppId;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        #endregion

        #region 查询学生的任课老师
        /// <summary>
        /// 通过微信账号查询任课老师
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public DataSet QueryTeacherList(string WeiXin)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT c.`Name` as Tname,c.Phone,c.AccountNumber,c.QQ,c.Postion as Title from EI_FamilyInfo a ");
            strSql.Append(" INNER JOIN EI_MRelS b ");
            strSql.Append(" on a.SID=b.SID ");
            strSql.Append(" INNER JOIN EI_ManagerInfo c ");
            strSql.Append(" on c.AccountNumber=b.TID ");
            strSql.Append("  where a.Weixin=@WeiXin ");
            strSql.Append(" UNION ");
            strSql.Append(" SELECT e.`Name` as Tname,e.Phone,e.AccountNumber,e.QQ,e.Postion as Title from EI_FamilyInfo a ");
            strSql.Append(" INNER JOIN EI_GRelS b ");
            strSql.Append(" on a.SID=b.SID ");
            strSql.Append(" INNER JOIN EI_GroupInfo c ");
            strSql.Append("  on b.GID=c.ID ");
            strSql.Append(" INNER JOIN EI_GRelM d ");
            strSql.Append("  on c.ID=d.GID ");
            strSql.Append(" INNER JOIN EI_ManagerInfo e ");
            strSql.Append("  on d.TID=e.AccountNumber ");
            strSql.Append("where a.Weixin=@WeiXin ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,200)};
            parameters[0].Value = WeiXin;
            
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        #endregion

        #region 查询学生关联科目
        /// <summary>
        /// 查询学生关联科目
        /// </summary>
        /// <param name="SID"></param>
        /// <returns></returns>
        public DataSet QuerySubjectBySID(string SID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select a.SubjectID as ID,b.Subject as SubjectName from ei_sturelmat a ");
            strSql.Append(" inner join ei_subject b on a.SubjectID=b.ID");
            strSql.Append(" where a.SID=@SID");
            strSql.Append(" Order by a.SubjectID");
            MySqlParameter[] parameters ={
                new MySqlParameter("@SID", MySqlDbType.VarChar,100)};
            parameters[0].Value = SID;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        
        #endregion
    }
}
