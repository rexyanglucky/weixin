using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.Manage.ViewModel;
using Mfg.Manager.Entity;

namespace Mfg.EI.InterFace
{
    public interface IAccount
    {
        #region 用户登录
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        UserFeedbackStatusEnum UserLogin(LoginModel model, out EI_Account userInfo);

        #endregion

        #region 用户退出
        /// <summary>
        /// 用户退出
        /// </summary>
        void UserSignOut();
        #endregion

        #region 是否已登陆
        /// <summary>
        /// 是否已登陆
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        bool IsOnlin(string userID);
        #endregion

        #region 清除登录状态

        /// <summary>
        /// 清除登录状态
        /// </summary>
        void ClearOnLine();
        #endregion

        #region 更新登录状态

        /// <summary>
        /// 更新登录状态
        /// </summary>
        void UpdateOnLine();
        #endregion

        #region 获取用户信息
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        EI_Account GetUserInfoByID(string userID);

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userID">加密后的userID</param>
        /// <returns></returns>
        EI_Account GetUserInfoByDecryptCookieID(string userID);
        #endregion
    }
}
