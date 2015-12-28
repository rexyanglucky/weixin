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
    public class DepartmentDal
    {
        #region 获取部门信息
        /// <summary>
        /// 获取部门信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Department> GetDepartmentList(Search model, out int count)
        {



            string strSqlCount = "";
            StringBuilder sbSqlList = new StringBuilder();
            StringBuilder sbWhere = new StringBuilder();
            string strLimit = "";
            string strOrder = "";
            List<MySqlParameter> parameters = new List<MySqlParameter>();



            strSqlCount = " SELECT Count(1) Count from SYS_Department where IsValID=1 ";
            sbSqlList.Append("Select DepartmentID, DepartmentName, DepartmentName_EN, OrderNo, IsValID from SYS_Department where IsValID=1 ");


            if (model != null)
            {

                if (!string.IsNullOrEmpty(model.ID))
                {
                    sbWhere.Append(" And DepartmentID=@DepartmentID");
                    parameters.Add(new MySqlParameter("@DepartmentID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = model.ID });
                }

                if (!string.IsNullOrEmpty(model.Name))
                {
                    sbWhere.Append(" And DepartmentName LIKE @DepartmentName");
                    parameters.Add(new MySqlParameter("@DepartmentName", MySqlDbType.String, 50) { Direction = ParameterDirection.InputOutput, Value = "%" + model.ID + "%" });
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
                        Value = "OrderNo"
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



            List<EI_Department> departmentList = new List<EI_Department>();
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
                                EI_Department dto = new EI_Department()
                                {
                                    DepartmentID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                                    DepartmentName = a.IsDBNull(1) ? "" : a.GetString(1),
                                    DepartmentName_EN = a.IsDBNull(2) ? "" : a.GetString(2),
                                    OrderNo = a.IsDBNull(3) ? -1 : a.GetInt32(3),
                                    IsValID = true,

                                };
                                departmentList.Add(dto);
                            }
                        }
                    }
                },
                parameters);

            count = num;
            return departmentList;
        }
        #endregion


    }
}
