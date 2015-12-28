using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using Mfg.Manager.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL.OrgManger
{

    public class ReportDal
    {
        /// <summary>
        /// 获取机构统计
        /// </summary>
        public List<OrgReportStatistics> GetOrgReportStatisticsList(Search model, out int count)
        {
            string strSqlCount = "";
            StringBuilder sbSqlList = new StringBuilder();
            StringBuilder sbWhere = new StringBuilder();
            string strLimit = "";
            string strOrder = "";
            List<MySqlParameter> parameters = new List<MySqlParameter>();

            strSqlCount = @" SELECT Count(1) Count
                             FROM 
	                            (
	                            SELECT a.ID,a.`Name`,CASE WHEN a.OrgType=0 THEN '普通机构' WHEN a.OrgType=1 THEN 'VIP机构' ELSE '' END as OrgType,
	                            a.Url,a.ExpirTime as ExpirTime,COUNT(b.AccountNumber) as EffectiveMCount
	                            from ei_org as a INNER JOIN ei_managerinfo b on a.ID=b.OrgID
	                            WHERE b.DelFlag=0
	                            GROUP BY a.ID
	                            ) as x

                            LEFT JOIN 
                              (
		                        SELECT m.ID,
		                        max( CASE m.SType WHEN 0 THEN m.MCount ELSE 0 END) as StudentCount ,
		                        max( CASE m.SType WHEN 1 THEN m.MCount ELSE 0 END) as StudentStandardCount ,
		                        max( CASE m.SType WHEN 2 THEN m.MCount ELSE 0 END) as StudentPlatinumCount,
		                        max( CASE m.SType WHEN 3 THEN m.MCount ELSE 0 END) as StudentDiamondsCount 
		                        from (
		                        SELECT a.ID,c.SType,COUNT(c.MfgID) as MCount
		                        from ei_org as a INNER JOIN ei_studentinfo c on a.ID=c.OrgID
		                        WHERE c.DelFlag=0
		                        GROUP BY a.ID,c.SType) as m GROUP BY m.ID
		                        ) 
		                        as y 
		
		                        on x.ID=y.ID 

                             WHERE x.ID>=10 AND x.ID<>24 ";


            sbSqlList.Append(@" SELECT 
                                x.ID, x.Name,x.OrgType,x.Url,x.ExpirTime,x.EffectiveMCount,
                                y.StudentCount,y.StudentStandardCount,y.StudentPlatinumCount,y.StudentDiamondsCount 
                            FROM 
	                            (
	                            SELECT a.ID,a.`Name`,CASE WHEN a.OrgType=0 THEN '普通机构' WHEN a.OrgType=1 THEN 'VIP机构' ELSE '' END as OrgType,
	                            a.Url,a.ExpirTime as ExpirTime,COUNT(b.AccountNumber) as EffectiveMCount
	                            from ei_org as a INNER JOIN ei_managerinfo b on a.ID=b.OrgID
	                            WHERE b.DelFlag=0
	                            GROUP BY a.ID
	                            ) as x

                            LEFT JOIN 
                              (
		                        SELECT m.ID,
		                        max( CASE m.SType WHEN 0 THEN m.MCount ELSE 0 END) as StudentCount ,
		                        max( CASE m.SType WHEN 1 THEN m.MCount ELSE 0 END) as StudentStandardCount ,
		                        max( CASE m.SType WHEN 2 THEN m.MCount ELSE 0 END) as StudentPlatinumCount,
		                        max( CASE m.SType WHEN 3 THEN m.MCount ELSE 0 END) as StudentDiamondsCount 
		                        from (
		                        SELECT a.ID,c.SType,COUNT(c.MfgID) as MCount
		                        from ei_org as a INNER JOIN ei_studentinfo c on a.ID=c.OrgID
		                        WHERE c.DelFlag=0
		                        GROUP BY a.ID,c.SType) as m GROUP BY m.ID
		                        ) 
		                        as y 
		
		                        on x.ID=y.ID 

                             WHERE x.ID>=10 AND x.ID<>24 "
                );





            if (model != null)
            {

                if (!string.IsNullOrEmpty(model.ID))
                {
                    sbWhere.Append(" And x.ID=@ID");
                    parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.ID });
                }

                if (!string.IsNullOrEmpty(model.Name))
                {
                    sbWhere.Append(" And x.Name LIKE @Name");
                    parameters.Add(new MySqlParameter("@Name", MySqlDbType.String, 50) { Direction = ParameterDirection.InputOutput, Value = "%" + model.Name + "%" });
                }


                if (model.PageIndex > 0)
                {
                    model.PageSize = model.PageSize <= 0 ? 10 : model.PageSize;//默认每页10条数据

                    strLimit = " LIMIT @Skip,@Take ";
                    parameters.Add(new MySqlParameter("@Skip", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = (model.PageIndex - 1) * model.PageSize });
                    parameters.Add(new MySqlParameter("@Take", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.PageSize });

                }

                if (!string.IsNullOrEmpty(model.OrderBy))
                {
                    //ORDER BY EndTime DESC , CreateTime DESC
                    strOrder = " ORDER BY @OrderBy";
                    parameters.Add(new MySqlParameter("@OrderBy", MySqlDbType.String, 150)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = model.OrderBy
                    });
                }
                else
                {
                    strOrder = " ORDER BY @OrderBy";
                    parameters.Add(new MySqlParameter("@OrderBy", MySqlDbType.String, 150)
                    {
                        Direction = ParameterDirection.InputOutput,
                        Value = "x.ID"
                    });

                }
            }

            StringBuilder sb = new StringBuilder();
            //总数
            sb.Append(strSqlCount);
            sb.Append(sbWhere);
            sb.Append(";");

            //分页
            sb.Append(sbSqlList);
            sb.Append(sbWhere);
            sb.Append(strOrder);
            sb.Append(strLimit);
            sb.Append(";");



            List<OrgReportStatistics> list = new List<OrgReportStatistics>();
            int num = 0;

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
                                OrgReportStatistics dto = new OrgReportStatistics()
                                {
                                    ID = a.IsDBNull(0) ? "" : a.GetString(0),
                                    Name = a.IsDBNull(1) ? "" : a.GetString(1),
                                    OrgType = a.IsDBNull(2) ? "" : a.GetString(2),
                                    Url = a.IsDBNull(3) ? "" : a.GetString(3),
                                    ExpirTime = a.IsDBNull(4) ? "" : a.GetDateTime(4).ToString("yyyy-MM-dd HH:mm:ss"),
                                    EffectiveMCount = a.IsDBNull(5) ? 0 : a.GetInt32(5),

                                    StudentCount = a.IsDBNull(6) ? 0 : a.GetInt32(6),
                                    StudentStandardCount = a.IsDBNull(7) ? 0 : a.GetInt32(7),
                                    StudentPlatinumCount = a.IsDBNull(8) ? 0 : a.GetInt32(8),
                                    StudentDiamondsCount = a.IsDBNull(9) ? 0 : a.GetInt32(9)

                                };
                                list.Add(dto);
                            }
                        }
                    }
                },
                parameters);

            count = num;
            return list;





        }


    }
}
