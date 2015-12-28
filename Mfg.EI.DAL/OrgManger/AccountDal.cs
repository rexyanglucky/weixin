using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using Mfg.Manager.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public class AccountDal
    {
        #region 私有对象
        private BaseDataDal basedata = new BaseDataDal();
        #endregion

        #region 用户登录
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public UserFeedbackStatusEnum UserLogin(ref EI_Account model)
        {
            StringBuilder sbSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            EI_Account userInfo = new EI_Account();

            #region 用户基本信息
            sbSql.Append(@"Select 
                           UserID, Email,Name, Name_EN, Phone, Password, PasswordQuestion, 
                           PasswordAnswer, IsApproved, IsLockedOut, IsVaild 
                           From Sys_User
                           Where Email=@LoginName and IsVaild=1 ;");

            parameters.Add(new MySqlParameter("@LoginName", MySqlDbType.VarChar, 50) { Direction = ParameterDirection.InputOutput, Value = model.Email });
            userInfo = MySQLHelper.ExecuteStatement<EI_Account>(sbSql.ToString(), (a) =>
            {
                return new EI_Account()
                {
                    UserID = a.IsDBNull(0) ? "" : a.GetString(0),
                    Email = a.IsDBNull(1) ? "" : a.GetString(1),
                    Name = a.IsDBNull(2) ? "" : a.GetString(2),
                    Name_EN = a.IsDBNull(3) ? "" : a.GetString(3),
                    Phone = a.IsDBNull(4) ? "" : a.GetString(4),
                    Password = a.IsDBNull(5) ? "" : a.GetString(5),
                    PasswordQuestion = a.IsDBNull(6) ? "" : a.GetString(6),
                    PasswordAnswer = a.IsDBNull(7) ? "" : a.GetString(7),
                    IsApproved = a.IsDBNull(8) ? false : a.GetInt32(8) == 0 ? false : true,
                    IsLockedOut = a.IsDBNull(9) ? false : a.GetInt32(9) == 0 ? false : true,
                    IsVaild = a.IsDBNull(10) ? false : a.GetInt32(10) == 0 ? false : true

                };
            }, parameters).FirstOrDefault();
            #endregion

            //用户不存在
            if (userInfo == null)
            {
                return UserFeedbackStatusEnum.NoneUser;
            }

            //密码错误
            if (userInfo.Password != model.Password)//SecurityHelper.Md5Encode(model.Password)
            {
                return UserFeedbackStatusEnum.InvalidPassword;
            }
            //用户被锁定
            if (userInfo.IsLockedOut)
            {
                return UserFeedbackStatusEnum.LockedOut;
            }
            //用户未激活
            if (!userInfo.IsApproved)
            {
                return UserFeedbackStatusEnum.NoneApproved;

            }


            #region 用户角色
            #region 已封装有方法
            //            sbSql.Clear();
            //            parameters.Clear();
            //            sbSql.Append(@"Select 
            //                           a.RoleID, a.DepartmentID, a.RoleCode, a.RoleName, a.ShowName, a.RoleOrder, a.RoleType, a.IsValID, a.Description  
            //                           from SYS_Roles a
            //                           inner join SYS_User_Roles b  on a.RoleID=b.RoleID
            //                           where a.IsValID=1 and b.UserID=@UserID
            //                            ");

            //            parameters.Add(new MySqlParameter("@UserID", MySqlDbType.String, 40) { Direction = ParameterDirection.InputOutput, Value = userInfo.UserID });

            //            List<EI_Role> roleList = new List<EI_Role>();
            //            roleList.AddRange(MySQLHelper.ExecuteStatement<EI_Role>(sbSql.ToString(), (a) =>
            //            {
            //                EI_Role dto = new EI_Role()
            //                {
            //                    RoleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
            //                    DepartmentID = a.IsDBNull(1) ? -1 : a.GetInt32(1),

            //                    RoleCode = a.IsDBNull(2) ? "" : a.GetString(2),
            //                    RoleName = a.IsDBNull(3) ? "" : a.GetString(3),
            //                    ShowName = a.IsDBNull(4) ? "" : a.GetString(4),
            //                    RoleOrder = a.IsDBNull(5) ? -1 : a.GetInt32(5),
            //                    RoleType = a.IsDBNull(6) ? -1 : a.GetInt32(6),
            //                    IsValID = true,
            //                    Description = a.IsDBNull(7) ? "" : a.GetString(7)
            //                };
            //                return dto;
            //            }, parameters)); 
            #endregion
            userInfo.RoleList = basedata.GetUserRoleList(userInfo.UserID);
            #endregion

            #region 用户模块操作信息
            #region 已封装有方法
            //            sbSql.Clear();
            //            parameters.Clear();
            //            string roleIDs = string.Join(",", userInfo.RoleList.Select(m => m.RoleID));
            //            sbSql.AppendFormat(@" SELECT DISTINCT 
            //                            a.FunID, a.FunCode, a.ModuleID, a.FunName,a.FunURL, a.OrderNo, a.IsShow, a.IsValID,
            //                            b.ModuleID, b.ModuleCode, b.ModuleName,b.StyleURL, b.ModuleBigImg,b.ModuleSmallImg,
            //                            b.OrderNo,b.IsValID
            //                            FROM SYS_Module_Fun  a
            //                            INNER JOIN sys_module b ON b.ModuleID=a.ModuleID
            //                            INNER JOIN SYS_Role_Fun c ON c.FunID=a.FunID
            //                            WHERE FIND_IN_SET (c.RoleID ,'{0}' ) ", roleIDs

            //                );
            //            List<EI_ModuleAndFun> moduleAndFunList = new List<EI_ModuleAndFun>();
            //            moduleAndFunList.AddRange(MySQLHelper.ExecuteStatement<EI_ModuleAndFun>(sbSql.ToString(), (a) =>
            //            {
            //                EI_ModuleAndFun dto = new EI_ModuleAndFun()
            //                {
            //                    #region ModuleFun
            //                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
            //                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
            //                    FModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
            //                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
            //                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
            //                    FOrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
            //                    IsShow = a.IsDBNull(6) ? false : (a.GetInt32(6) == 0 ? false : true),
            //                    FIsValID = a.IsDBNull(7) ? false : (a.GetInt32(7) == 0 ? false : true),
            //                    #endregion

            //                    #region Module
            //                    ModuleID = a.IsDBNull(8) ? -1 : a.GetInt32(8),
            //                    ModuleCode = a.IsDBNull(9) ? "" : a.GetString(9),
            //                    ModuleName = a.IsDBNull(10) ? "" : a.GetString(10),
            //                    StyleURL = a.IsDBNull(11) ? "" : a.GetString(11),
            //                    ModuleBigImg = a.IsDBNull(12) ? "" : a.GetString(12),
            //                    ModuleSmallImg = a.IsDBNull(13) ? "" : a.GetString(13),
            //                    MOrderNo = a.IsDBNull(14) ? -1 : a.GetInt32(14),
            //                    MIsValID = a.IsDBNull(15) ? false : (a.GetInt32(15) == 0 ? false : true),
            //                    #endregion
            //                };
            //                return dto;
            //            }, null)); 
            #endregion
            string roleIDs = string.Join(",", userInfo.RoleList.Select(m => m.RoleID));
            userInfo.ModuleAndFunList = basedata.GetModuleAndFunList(roleIDs);
            #endregion

            model = userInfo;
            return UserFeedbackStatusEnum.Success;
        }

        #endregion

        #region 获取用户信息
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public EI_Account GetUserInfoByID(string userID)
        {
            StringBuilder sbSql = new StringBuilder();
            List<MySqlParameter> parameters = new List<MySqlParameter>();
            EI_Account userInfo = new EI_Account();

            #region 用户基本信息
            sbSql.Append(@"Select 
                           UserID, Email,Name, Name_EN, Phone, Password, PasswordQuestion, 
                           PasswordAnswer, IsApproved, IsLockedOut, IsVaild 
                           From Sys_User
                           Where UserID=@UserID and IsVaild=1 ;");

            parameters.Add(new MySqlParameter("@UserID", MySqlDbType.VarChar, 50) { Direction = ParameterDirection.InputOutput, Value = userID });

            userInfo = MySQLHelper.ExecuteStatement<EI_Account>(sbSql.ToString(), (a) =>
            {
                return new EI_Account()
                {
                    UserID = a.IsDBNull(0) ? "" : a.GetString(0),
                    Email = a.IsDBNull(1) ? "" : a.GetString(1),
                    Name = a.IsDBNull(2) ? "" : a.GetString(2),
                    Name_EN = a.IsDBNull(3) ? "" : a.GetString(3),
                    Phone = a.IsDBNull(4) ? "" : a.GetString(4),
                    Password = a.IsDBNull(5) ? "" : a.GetString(5),
                    PasswordQuestion = a.IsDBNull(6) ? "" : a.GetString(6),
                    PasswordAnswer = a.IsDBNull(7) ? "" : a.GetString(7),
                    IsApproved = a.IsDBNull(8) ? false : a.GetInt32(8) == 0 ? false : true,
                    IsLockedOut = a.IsDBNull(9) ? false : a.GetInt32(9) == 0 ? false : true,
                    IsVaild = a.IsDBNull(10) ? false : a.GetInt32(10) == 0 ? false : true

                };
            }, parameters).FirstOrDefault();
            #endregion

            //用户不存在
            if (userInfo == null)
            {
                return null;
            }

            #region 用户角色
            #region 已封装有方法
            //            sbSql.Clear();
            //            parameters.Clear();
            //            sbSql.Append(@"Select 
            //                           a.RoleID, a.DepartmentID, a.RoleCode, a.RoleName, a.ShowName, a.RoleOrder, a.RoleType, a.IsValID, a.Description  
            //                           from SYS_Roles a
            //                           inner join SYS_User_Roles b  on a.RoleID=b.RoleID
            //                           where a.IsValID=1 and b.UserID=@UserID
            //                            ");

            //            parameters.Add(new MySqlParameter("@UserID", MySqlDbType.String, 40) { Direction = ParameterDirection.InputOutput, Value = userInfo.UserID });

            //            List<EI_Role> roleList = new List<EI_Role>();
            //            roleList.AddRange(MySQLHelper.ExecuteStatement<EI_Role>(sbSql.ToString(), (a) =>
            //            {
            //                EI_Role dto = new EI_Role()
            //                {
            //                    RoleID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
            //                    DepartmentID = a.IsDBNull(1) ? -1 : a.GetInt32(1),

            //                    RoleCode = a.IsDBNull(2) ? "" : a.GetString(2),
            //                    RoleName = a.IsDBNull(3) ? "" : a.GetString(3),
            //                    ShowName = a.IsDBNull(4) ? "" : a.GetString(4),
            //                    RoleOrder = a.IsDBNull(5) ? -1 : a.GetInt32(5),
            //                    RoleType = a.IsDBNull(6) ? -1 : a.GetInt32(6),
            //                    IsValID = true,
            //                    Description = a.IsDBNull(7) ? "" : a.GetString(7)
            //                };
            //                return dto;
            //            }, parameters)); 
            #endregion
            userInfo.RoleList = basedata.GetUserRoleList(userInfo.UserID);
            #endregion

            #region 用户模块操作信息
            #region 已封装有方法
            //            sbSql.Clear();
            //            parameters.Clear();
            //            string roleIDs = string.Join(",", userInfo.RoleList.Select(m => m.RoleID));
            //            sbSql.AppendFormat(@" SELECT DISTINCT 
            //                            a.FunID, a.FunCode, a.ModuleID, a.FunName,a.FunURL, a.OrderNo, a.IsShow, a.IsValID,
            //                            b.ModuleID, b.ModuleCode, b.ModuleName,b.StyleURL, b.ModuleBigImg,b.ModuleSmallImg,
            //                            b.OrderNo,b.IsValID
            //                            FROM SYS_Module_Fun  a
            //                            INNER JOIN sys_module b ON b.ModuleID=a.ModuleID
            //                            INNER JOIN SYS_Role_Fun c ON c.FunID=a.FunID
            //                            WHERE FIND_IN_SET (c.RoleID ,'{0}' ) ", roleIDs

            //                );
            //            List<EI_ModuleAndFun> moduleAndFunList = new List<EI_ModuleAndFun>();
            //            moduleAndFunList.AddRange(MySQLHelper.ExecuteStatement<EI_ModuleAndFun>(sbSql.ToString(), (a) =>
            //            {
            //                EI_ModuleAndFun dto = new EI_ModuleAndFun()
            //                {
            //                    #region ModuleFun
            //                    FunID = a.IsDBNull(0) ? -1 : a.GetInt32(0),
            //                    FunCode = a.IsDBNull(1) ? "" : a.GetString(1),
            //                    FModuleID = a.IsDBNull(2) ? -1 : a.GetInt32(2),
            //                    FunName = a.IsDBNull(3) ? "" : a.GetString(3),
            //                    FunURL = a.IsDBNull(4) ? "" : a.GetString(4),
            //                    FOrderNo = a.IsDBNull(5) ? -1 : a.GetInt32(5),
            //                    IsShow = a.IsDBNull(6) ? false : (a.GetInt32(6) == 0 ? false : true),
            //                    FIsValID = a.IsDBNull(7) ? false : (a.GetInt32(7) == 0 ? false : true),
            //                    #endregion

            //                    #region Module
            //                    ModuleID = a.IsDBNull(8) ? -1 : a.GetInt32(8),
            //                    ModuleCode = a.IsDBNull(9) ? "" : a.GetString(9),
            //                    ModuleName = a.IsDBNull(10) ? "" : a.GetString(10),
            //                    StyleURL = a.IsDBNull(11) ? "" : a.GetString(11),
            //                    ModuleBigImg = a.IsDBNull(12) ? "" : a.GetString(12),
            //                    ModuleSmallImg = a.IsDBNull(13) ? "" : a.GetString(13),
            //                    MOrderNo = a.IsDBNull(14) ? -1 : a.GetInt32(14),
            //                    MIsValID = a.IsDBNull(15) ? false : (a.GetInt32(15) == 0 ? false : true),
            //                    #endregion
            //                };
            //                return dto;
            //            }, null)); 
            #endregion
            string roleIDs = string.Join(",", userInfo.RoleList.Select(m => m.RoleID));
            userInfo.ModuleAndFunList = basedata.GetModuleAndFunList(roleIDs);
            #endregion

            return userInfo;

        }

        #endregion


    }
}
