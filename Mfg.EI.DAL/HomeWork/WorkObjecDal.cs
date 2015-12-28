/*
 * author:谢利民;
 * function:管理人员信息表【EI_ManagerInfo】操作的功能
 * adddate:2015-05-02
 * updatedate:2015-05-02
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    /// 布置对象的操作类
    /// </summary>
    public class WorkObjecDal
    {
        public List<TreeModel> GetObjectModelList(string tid, int orgid)
        {
            List<TreeModel> treemodelList = new List<TreeModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@" SELECT GID,TID,GroupName,SID,`Name` FROM ( (SELECT A.GID,A.TID,C.`Name` AS GroupName,B.SID,S.MfgID,S.`Name` FROM EI_GRelM A  ");
            strSql.Append(" LEFT JOIN EI_GRelS B ON A.GID=B.GID ");
            strSql.Append(" LEFT JOIN EI_GroupInfo C ON A.GID=C.ID");
            strSql.Append(" LEFT JOIN EI_StudentInfo S ON S.MfgID=B.SID WHERE S.OrgID=@OrgID)");
            strSql.Append(" UNION ALL");
            strSql.Append(" ( ");
            strSql.Append(" SELECT '0' AS GID,ER.TID,'' as GroupName,ER.SID,ES.MfgID,ES.`Name` FROM EI_MRelS ER ");
            strSql.Append(" LEFT JOIN  EI_StudentInfo ES");
            strSql.Append("  ON ER.SID=ES.MfgID");
            strSql.Append(" ))V WHERE SID IS NOT NULL and TID=@TID ");
            strSql.Append(" GROUP BY GID DESC,TID,SID ");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@OrgID",MySqlDbType.Int32,40)
                                        };
            parameters[0].Value = tid;
            parameters[1].Value = orgid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                string GroupName = string.Empty;
                var ListWork = ModelConvertHelper<WorkObjectModel>.ConvertToModelList(ds.Tables[0]);
                var GroupList = ListWork.GroupBy(x => x.GID).ToList();
                foreach (var item in GroupList)
                {

                    var FilterList = ListWork.Where(x => x.GID == item.Key).ToList();
                    foreach (var filter in FilterList)
                    {
                        TreeModel treemodel = new TreeModel();
                        //判断分组名称是否为空
                        if (filter.GroupName == string.Empty)
                        {
                            if (filter.Name != null)
                            {
                                treemodel.id = filter.SID;
                                treemodel.pId = filter.GID == "0" ? "x000" : filter.GID;
                                treemodel.name = filter.Name;
                                treemodelList.Add(treemodel);
                            }

                        }
                        else
                        {
                            if (GroupName != filter.GroupName)
                            {
                                treemodel = new TreeModel();
                                treemodel.id = filter.GID;
                                treemodel.pId = "0";
                                treemodel.name = filter.GroupName;
                                treemodelList.Add(treemodel);
                                GroupName = filter.GroupName;
                            }
                            treemodel = new TreeModel();
                            treemodel.id = filter.SID;
                            treemodel.pId = filter.GID;
                            treemodel.name = filter.Name;
                            treemodelList.Add(treemodel);
                        }
                    }

                }
                return treemodelList;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取教师布置对象树
        /// </summary>
        /// <param name="tid"></param>
        /// <param name="orgid"></param>
        /// <returns></returns>
        public List<TreeModel> GetTeaTreeList(string tid, int orgid)
        {
            List<TreeModel> treemodelList = new List<TreeModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT DISTINCT T.GID as GID ,T.TID as TID,T.TeaName as `name` FROM ");
            strSql.Append("(SELECT G1.ID AS GID,V1.TID,G1.`Name` AS TeaName  from ei_groupinfo G1 INNER JOIN");
            strSql.Append("(");
            strSql.Append(" SELECT G.GID as GID,V.TID AS TID,M.`Name` AS TeaName FROM ei_grelm G INNER JOIN ");
            strSql.Append(" (SELECT ID,'0' as TID ,A.`Name` FROM ei_groupinfo A LEFT JOIN ei_grelm B ON A.ID=B.GID WHERE B.TID=@TID)V ");
            strSql.Append(" ON G.GID=V.ID ");
            strSql.Append(" INNER JOIN ei_managerinfo m on G.TID=M.AccountNumber");
            strSql.Append("  WHERE G.TID<>@TID AND M.OrgID=@OrgID  AND M.UType<>3)V1  ON G1.ID=V1.GID");
            strSql.Append(" UNION ALL");
            strSql.Append(" SELECT G.GID as GID,G.TID AS TID,M.`Name` AS TeaName FROM ei_grelm G INNER JOIN ");
            strSql.Append(" (SELECT ID,'0' as TID ,A.`Name` FROM ei_groupinfo A LEFT JOIN ei_grelm B ON A.ID=B.GID WHERE B.TID=@TID)V");
            strSql.Append(" ON G.GID=V.ID ");
            strSql.Append("INNER JOIN ei_managerinfo m on G.TID=M.AccountNumber");
            strSql.Append(" WHERE G.TID<>@TID AND M.OrgID=@OrgID  AND M.UType<>3)T ORDER BY T.GID");

            MySqlParameter[] parameters = {
                    new MySqlParameter("@TID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@OrgID",MySqlDbType.Int32,40)
                                        };
            parameters[0].Value = tid;
            parameters[1].Value = orgid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                var ListData = ModelConvertHelper<TeachGroupModel>.ConvertToModelList(ds.Tables[0]);
                var GroupList = ListData.GroupBy(x => x.gid).ToList();
                foreach (var item in GroupList)
                {
                    var FilterList = ListData.Where(x => x.gid == item.Key).ToList();
                    foreach (var data in FilterList)
                    {
                        if (item.Key == data.gid && data.tid == "0")
                        {
                            TreeModel treemodel = new TreeModel();
                            treemodel.pId = "0";
                            treemodel.id = data.gid.ToString();
                            treemodel.name = data.name;
                            treemodelList.Add(treemodel);
                        }
                        else
                        {
                            TreeModel treemodel = new TreeModel();
                            treemodel.pId =data.gid.ToString();
                            treemodel.id = data.tid.ToString();
                            treemodel.name = data.name;
                            treemodelList.Add(treemodel);
                        }
                    }
                }
                return treemodelList;
            }
            else
            {

                return null;
            }

        }
    }
}
