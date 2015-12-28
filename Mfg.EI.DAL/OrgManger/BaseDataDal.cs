using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using Mfg.Manager.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public class BaseDataDal
    {
        #region 获取部门信息
        /// <summary>
        /// 获取部门信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Department> GetDepartmentList()
        {
            List<EI_Department> departmentList = new List<EI_Department>();
            string strSql = "Select DepartmentID, DepartmentName, DepartmentName_EN, OrderNo, IsValID from SYS_Department where IsValID=1 ";
            departmentList.AddRange(MySQLHelper.ExecuteStatement<EI_Department>(strSql.ToString(), (a) =>
            {
                EI_Department dto = new EI_Department()
                {
                    DepartmentID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    DepartmentName = a.IsDBNull(1) ? "" : a.GetString(1),
                    DepartmentName_EN = a.IsDBNull(2) ? "" : a.GetString(2),
                    OrderNo = a.IsDBNull(3) ? -1 : a.GetInt32(3),
                    IsValID = true,

                };
                return dto;
            }, null));
            return departmentList;
        }
        #endregion

        #region 根据ID获取部门信息
        /// <summary>
        /// 根据ID获取部门信息
        /// </summary>
        /// <param name="departmentID"></param>
        /// <returns></returns>
        public EI_Department GetDepartment(int departmentID)
        {
            EI_Department department = new EI_Department();
            string strSql = "Select DepartmentID, DepartmentName, DepartmentName_EN, OrderNo, IsValID from SYS_Department where IsValID=1 and DepartmentID=@DepartmentID ";

            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@DepartmentID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = departmentID });

            department = MySQLHelper.ExecuteStatement<EI_Department>(strSql.ToString(), (a) =>
             {
                 EI_Department dto = new EI_Department()
                 {
                     DepartmentID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                     DepartmentName = a.IsDBNull(1) ? "" : a.GetString(1),
                     DepartmentName_EN = a.IsDBNull(2) ? "" : a.GetString(2),
                     OrderNo = a.IsDBNull(3) ? -1 : a.GetInt32(3),
                     IsValID = true,
                 };
                 return dto;
             }, parameters).FirstOrDefault();
            return department;
        }
        #endregion

        #region 获取模块信息
        /// <summary>
        /// 获取模块信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Module> GetModuleList()
        {

            List<EI_Module> moduleList = new List<EI_Module>();

            string strSql = "Select ModuleID, ModuleCode, ModuleName,StyleURL, ModuleBigImg, ModuleSmallImg, OrderNo, IsValID from dbo.SYS_Module where IsValID=1 ";
            moduleList.AddRange(MySQLHelper.ExecuteStatement<EI_Module>(strSql.ToString(), (a) =>
            {
                EI_Module dto = new EI_Module()
                {
                    ModuleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    ModuleCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    ModuleName = a.IsDBNull(2) ? "" : a.GetString(2),
                    StyleURL = a.IsDBNull(3) ? "" : a.GetString(3),

                    ModuleBigImg = a.IsDBNull(4) ? "" : a.GetString(4),
                    ModuleSmallImg = a.IsDBNull(5) ? "" : a.GetString(5),
                    OrderNo = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                    IsValID = true

                };
                return dto;
            }, null));

            return moduleList;
        }
        #endregion

        #region 根据ID获取模块信息
        /// <summary>
        /// 根据ID获取模块信息
        /// </summary>
        /// <param name="moduleID"></param>
        /// <returns></returns>
        public EI_Module GetModuleInfo(int moduleID)
        {

            EI_Module module = new EI_Module();

            string strSql = "Select ModuleID, ModuleCode, ModuleName,StyleURL, ModuleBigImg, ModuleSmallImg, OrderNo, IsValID from SYS_Module where IsValID=1 and ModuleID=@ModuleID";

            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@ModuleID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = moduleID });

            module = MySQLHelper.ExecuteStatement<EI_Module>(strSql.ToString(), (a) =>
              {
                  return new EI_Module()
                  {
                      ModuleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                      ModuleCode = a.IsDBNull(1) ? "" : a.GetString(1),
                      ModuleName = a.IsDBNull(2) ? "" : a.GetString(2),
                      StyleURL = a.IsDBNull(3) ? "" : a.GetString(3),
                      ModuleBigImg = a.IsDBNull(4) ? "" : a.GetString(4),
                      ModuleSmallImg = a.IsDBNull(5) ? "" : a.GetString(5),
                      OrderNo = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                      IsValID = true
                  };
              }, parameters).FirstOrDefault();
            return module;

        }
        #endregion

        #region 根据ID获取所有模块信息
        /// <summary>
        /// 根据ID获取模块信息
        /// </summary>
        /// <param name="moduleIDs">moduleIDs</param>
        /// <returns></returns>
        public List<EI_Module> GetModuleInfo(string moduleIDs)
        {
            List<EI_Module> moduleList = new List<EI_Module>();

            string strSql = string.Format("Select DISTINCT ModuleID, ModuleCode, ModuleName,StyleURL, ModuleBigImg, ModuleSmallImg, OrderNo, IsValID from SYS_Module where IsValID=1 and FIND_IN_SET (ModuleID ,'{0}' )", moduleIDs);

            moduleList.AddRange(MySQLHelper.ExecuteStatement<EI_Module>(strSql.ToString(), (a) =>
            {
                return new EI_Module()
                {
                    ModuleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    ModuleCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    ModuleName = a.IsDBNull(2) ? "" : a.GetString(2),
                    StyleURL = a.IsDBNull(3) ? "" : a.GetString(3),
                    ModuleBigImg = a.IsDBNull(4) ? "" : a.GetString(4),
                    ModuleSmallImg = a.IsDBNull(5) ? "" : a.GetString(5),
                    OrderNo = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                    IsValID = true
                };
            }, null));
            return moduleList;

        }
        #endregion

        #region 获取模块操作信息
        /// <summary>
        /// 获取模块操作信息
        /// </summary>
        /// <returns></returns>
        public List<EI_ModuleFun> GetModuleFunList()
        {

            List<EI_ModuleFun> moduleFunList = new List<EI_ModuleFun>();
            string strSql = "Select FunID, FunCode, ModuleID, FunName,FunURL, OrderNo, IsValID from SYS_Module_Fun where IsValID=1 ";
            moduleFunList.AddRange(MySQLHelper.ExecuteStatement<EI_ModuleFun>(strSql.ToString(), (a) =>
            {
                EI_ModuleFun dto = new EI_ModuleFun()
                {
                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    ModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
                    OrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    IsValID = true,
                };
                return dto;
            }, null));
            return moduleFunList;

        }
        #endregion

        #region 根据ID获取模块操作信息
        /// <summary>
        /// 根据ID获取模块操作信息
        /// </summary>
        /// <returns></returns>
        public EI_ModuleFun GetModuleFunInfo(int funID)
        {
            EI_ModuleFun moduleFun = new EI_ModuleFun();
            string strSql = "Select FunID, FunCode, ModuleID, FunName,FunURL, OrderNo, IsValID from SYS_Module_Fun where IsValID=1 and FunID=@FunID";

            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@FunID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = funID });

            moduleFun = MySQLHelper.ExecuteStatement<EI_ModuleFun>(strSql.ToString(), (a) =>
            {
                EI_ModuleFun dto = new EI_ModuleFun()
                {
                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    ModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
                    OrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    IsValID = true,
                };
                return dto;
            }, parameters).FirstOrDefault();


            return moduleFun;
        }
        #endregion

        #region 根据ID获取角色所有模块操作信息
        /// <summary>
        /// 根据ID获取角色所有模块操作信息
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        public List<EI_ModuleFun> GetRoleModuleFunList(int roleID)
        {
            List<EI_ModuleFun> moduleFunList = new List<EI_ModuleFun>();

            StringBuilder sbSql = new StringBuilder();
            sbSql.Append(" Select a.FunID, a.FunCode, a.ModuleID, a.FunName,a.FunURL, a.OrderNo, a.IsValID ");
            sbSql.Append(" from SYS_Module_Fun a ");
            sbSql.Append(" inner join SYS_Role_Fun b ");
            sbSql.Append(" on a.FunID=b.FunID ");
            sbSql.Append(" where a.IsValID=1 and b.RoleID=@RoleID  ");

            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@RoleID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = roleID });

            moduleFunList.AddRange(MySQLHelper.ExecuteStatement<EI_ModuleFun>(sbSql.ToString(), (a) =>
            {
                EI_ModuleFun dto = new EI_ModuleFun()
                {
                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    ModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
                    OrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    IsValID = true,
                };
                return dto;
            }, parameters));
            return moduleFunList;
        }
        #endregion

        #region 根据IDs获取角色所有模块操作信息
        /// <summary>
        /// 根据IDs获取角色所有模块操作信息
        /// </summary>
        /// <param name="roleIDs">roleIDs</param>
        /// <returns></returns>
        public List<EI_ModuleFun> GetRoleModuleFunList(string roleIDs)
        {
            List<EI_ModuleFun> moduleFunList = new List<EI_ModuleFun>();

            StringBuilder sbSql = new StringBuilder();
            sbSql.Append(" Select DISTINCT a.FunID, a.FunCode, a.ModuleID, a.FunName,a.FunURL, a.OrderNo, a.IsValID ");
            sbSql.Append(" from SYS_Module_Fun a ");
            sbSql.Append(" inner join SYS_Role_Fun b ");
            sbSql.Append(" on a.FunID=b.FunID ");
            sbSql.AppendFormat(" where a.IsValID=1  and FIND_IN_SET (b.RoleID ,'{0}' )  ", roleIDs);

            moduleFunList.AddRange(MySQLHelper.ExecuteStatement<EI_ModuleFun>(sbSql.ToString(), (a) =>
            {
                EI_ModuleFun dto = new EI_ModuleFun()
                {
                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    ModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
                    OrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    IsValID = true,
                };
                return dto;
            }, null));
            return moduleFunList;
        }
        #endregion

        #region 获取角色所有模块信息
        /// <summary>
        /// 获取角色所有模块操作信息
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        public List<EI_Module> GetRoleModuleList(int roleID)
        {

            List<EI_Module> moduleList = new List<EI_Module>();
            List<EI_ModuleFun> moduleFunList = GetRoleModuleFunList(roleID);

            string moduleIDs = string.Join(",", moduleFunList.GroupBy(m => m.ModuleID).Select(m => m.Key));

            moduleList = GetModuleInfo(moduleIDs);
            return moduleList.OrderBy(m => m.OrderNo).ToList();

        }
        #endregion

        #region 获取角色所有模块信息
        /// <summary>
        /// 获取角色所有模块信息
        /// </summary>
        /// <param name="roleIDs"></param>
        /// <returns></returns>
        public List<EI_Module> GetRoleModuleList(string roleIDs)
        {

            List<EI_Module> moduleList = new List<EI_Module>();
            List<EI_ModuleFun> moduleFunList = GetRoleModuleFunList(roleIDs);

            string moduleIDs = string.Join(",", moduleFunList.GroupBy(m => m.ModuleID).Select(m => m.Key));

            moduleList = GetModuleInfo(moduleIDs);
            return moduleList.OrderBy(m => m.OrderNo).ToList();

        }
        #endregion

        #region 获取角色信息
        /// <summary>
        /// 获取角色信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Role> GetRoleList()
        {
            List<EI_Role> roleList = new List<EI_Role>();

            string strSql = "Select RoleID, DepartmentID, RoleCode, RoleName, ShowName, RoleOrder, RoleType, IsValID, Description from SYS_Roles where IsValID=1 ";

            roleList.AddRange(MySQLHelper.ExecuteStatement<EI_Role>(strSql.ToString(), (a) =>
            {
                EI_Role dto = new EI_Role()
                {
                    RoleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    DepartmentID = a.IsDBNull(1) ? -1 : a.GetInt32(1),

                    RoleCode = a.IsDBNull(2) ? "" : a.GetString(2),
                    RoleName = a.IsDBNull(3) ? "" : a.GetString(3),
                    ShowName = a.IsDBNull(4) ? "" : a.GetString(4),
                    RoleOrder = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    RoleType = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                    IsValID = true,
                    Description = a.IsDBNull(7) ? "" : a.GetString(7)

                };
                return dto;
            }, null));
            return roleList;
        }
        #endregion

        #region 根据ID获取角色信息
        /// <summary>
        /// 获取角色信息
        /// </summary>
        /// <returns></returns>
        public EI_Role GetRoleInfo(int roleID)
        {

            EI_Role role = new EI_Role();

            string strSql = "Select RoleID, DepartmentID, RoleCode, RoleName, ShowName, RoleOrder, RoleType, IsValID, Description from dbo.SYS_Roles where IsValID=1 and RoleID=@RoleID";

            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@RoleID", MySqlDbType.Int32, 11) { Direction = ParameterDirection.InputOutput, Value = roleID });

            role = MySQLHelper.ExecuteStatement<EI_Role>(strSql.ToString(), (a) =>
            {
                EI_Role dto = new EI_Role()
                {
                    RoleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    DepartmentID = a.IsDBNull(1) ? -1 : a.GetInt32(1),

                    RoleCode = a.IsDBNull(2) ? "" : a.GetString(2),
                    RoleName = a.IsDBNull(3) ? "" : a.GetString(3),
                    ShowName = a.IsDBNull(4) ? "" : a.GetString(4),
                    RoleOrder = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    RoleType = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                    IsValID = true,
                    Description = a.IsDBNull(7) ? "" : a.GetString(7)

                };
                return dto;
            }, parameters).FirstOrDefault();
            return role;

        }
        #endregion






        #region 根据用户ID获取用户角色信息
        /// <summary>
        /// 获取用户角色信息
        /// </summary>
        /// <returns></returns>
        public List<EI_Role> GetUserRoleList(string userID)
        {
            List<EI_Role> roleList = new List<EI_Role>();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            StringBuilder sbSql = new StringBuilder();

            sbSql.Append(@"Select 
                           a.RoleID, a.DepartmentID, a.RoleCode, a.RoleName, a.ShowName, a.RoleOrder, a.RoleType, a.IsValID, a.Description  
                           from SYS_Roles a
                           inner join SYS_User_Roles b  on a.RoleID=b.RoleID
                           where a.IsValID=1 and b.UserID=@UserID
                            ");

            parameters.Add(new MySqlParameter("@UserID", MySqlDbType.String, 40) { Direction = ParameterDirection.InputOutput, Value = userID });
            roleList.AddRange(MySQLHelper.ExecuteStatement<EI_Role>(sbSql.ToString(), (a) =>
            {
                EI_Role dto = new EI_Role()
                {
                    RoleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    DepartmentID = a.IsDBNull(1) ? -1 : a.GetInt32(1),

                    RoleCode = a.IsDBNull(2) ? "" : a.GetString(2),
                    RoleName = a.IsDBNull(3) ? "" : a.GetString(3),
                    ShowName = a.IsDBNull(4) ? "" : a.GetString(4),
                    RoleOrder = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    RoleType = a.IsDBNull(6) ? -1 : a.GetInt32(6),
                    IsValID = true,
                    Description = a.IsDBNull(7) ? "" : a.GetString(7)
                };
                return dto;
            }, parameters));
            return roleList;
        }
        #endregion

        #region 根据角色IDs获取用户模块操作信息
        /// <summary>
        /// 根据角色IDs获取用户模块操作信息
        /// </summary>
        /// <param name="roleIDs"></param>
        /// <returns></returns>
        public List<EI_ModuleAndFun> GetModuleAndFunList(string roleIDs)
        {
            List<EI_ModuleAndFun> moduleAndFunList = new List<EI_ModuleAndFun>();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            StringBuilder sbSql = new StringBuilder();

            sbSql.AppendFormat(@" SELECT DISTINCT 
                            a.FunID, a.FunCode, a.ModuleID, a.FunName,a.FunURL, a.OrderNo, a.IsShow, a.IsValID,
                            b.ModuleID, b.ModuleCode, b.ModuleName,b.StyleURL, b.ModuleBigImg,b.ModuleSmallImg,
                            b.OrderNo,b.IsValID
                            FROM SYS_Module_Fun  a
                            INNER JOIN sys_module b ON b.ModuleID=a.ModuleID
                            INNER JOIN SYS_Role_Fun c ON c.FunID=a.FunID
                            WHERE FIND_IN_SET (c.RoleID ,'{0}' ) ", roleIDs

               );
            moduleAndFunList.AddRange(MySQLHelper.ExecuteStatement<EI_ModuleAndFun>(sbSql.ToString(), (a) =>
            {
                EI_ModuleAndFun dto = new EI_ModuleAndFun()
                {
                    #region ModuleFun
                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
                    FModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
                    FOrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
                    IsShow = a.IsDBNull(6) ? false : (a.GetInt32(6) == 0 ? false : true),
                    FIsValID = a.IsDBNull(7) ? false : (a.GetInt32(7) == 0 ? false : true),
                    #endregion

                    #region Module
                    ModuleID = a.IsDBNull(8) ? -1 : a.GetInt32(8),
                    ModuleCode = a.IsDBNull(9) ? "" : a.GetString(9),
                    ModuleName = a.IsDBNull(10) ? "" : a.GetString(10),
                    StyleURL = a.IsDBNull(11) ? "" : a.GetString(11),
                    ModuleBigImg = a.IsDBNull(12) ? "" : a.GetString(12),
                    ModuleSmallImg = a.IsDBNull(13) ? "" : a.GetString(13),
                    MOrderNo = a.IsDBNull(14) ? -1 : a.GetInt32(14),
                    MIsValID = a.IsDBNull(15) ? false : (a.GetInt32(15) == 0 ? false : true),
                    #endregion
                };
                return dto;
            }, null));

            return moduleAndFunList;

        }


        #endregion








    }
}
