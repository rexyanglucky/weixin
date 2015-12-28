using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.Entity;
using Mfg.Manage.ViewModel;
using Mfg.Manager.Entity;

namespace Mfg.EI.InterFace
{
    public class Account : IAccount
    {
        #region 私有对象
        AccountDal dal = new AccountDal();
        #endregion

        #region 用户登录
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        public UserFeedbackStatusEnum UserLogin(LoginModel model, out EI_Account account)
        {
            account = new EI_Account()
           {
               Email = model.Email,
               Password = model.Password
           };
            UserFeedbackStatusEnum feedStatus = dal.UserLogin(ref account);

            if (feedStatus == UserFeedbackStatusEnum.Success)
            {
                if (IsOnlin(account.UserID))//是否已经登陆
                {
                    feedStatus = UserFeedbackStatusEnum.Login;
                }
                else
                {
                    if (model.IsKeppPwd)//记住密码
                    {
                        CookieHelper.SetCookie("LoginUserID", CookieEncryptions.EncryptCookie(account.UserID), DateTime.Now.AddDays(7));
                    }
                    else
                    {
                        CookieHelper.SetCookie("LoginUserID", CookieEncryptions.EncryptCookie(account.UserID));
                    }
                    HttpContext.Current.Session["LoginUser"] = account;
                    UpdateOnLine();//更新登陆状态
                }
            }
            return feedStatus;
        }
        #endregion

        #region 用户退出
        /// <summary>
        /// 用户退出
        /// </summary>
        public void UserSignOut()
        {
            HttpContext.Current.Session.Abandon();
            string loginUserID = CookieHelper.GetCookieValue("LoginUserID");
            if (!string.IsNullOrEmpty(loginUserID))
            {
                loginUserID = CookieEncryptions.DecryptCookie(loginUserID);
                if (RedisDal.ContainsKey(RedisTypeEnum.Userinfo, "onLine_" + loginUserID))
                {
                    RedisDal.RemoveKey(RedisTypeEnum.Userinfo, "onLine_" + loginUserID);
                }
                HttpContext.Current.Session.Abandon();
                //HttpContext.Current.Session.Remove("LoginUser");
            }
            CookieHelper.ClearCookie("LoginUserID");
        }

        #endregion

        #region 是否已登陆
        /// <summary>
        /// 是否已登陆
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public bool IsOnlin(string userID)
        {

            if (RedisDal.ContainsKey(RedisTypeEnum.Userinfo, "onLine_" + userID))
            {
                var dic = RedisDal.GetAllEntriesFromHash(RedisTypeEnum.Userinfo, "onLine_" + userID);
                if (dic.Count > 0)
                {
                    DateTime LoginTime = string.IsNullOrEmpty(dic["LoginTime"]) ? DateTime.Now : Convert.ToDateTime(dic["LoginTime"]); ;
                    string LoginIP = dic["LoginIP"];

                    if (LoginIP != HttpHelper.GetExtranetIP())
                    {
                        if ((DateTime.Now - LoginTime).Minutes < 20)
                        {
                            return true;
                        }

                    }
                }
            }
            UpdateOnLine();//更新登陆状态


            return false;
        }

        #endregion

        #region 清除登录状态
        /// <summary>
        /// 清除登录状态
        /// </summary>
        public void ClearOnLine()
        {
            string loginUserID = CookieHelper.GetCookieValue("LoginUserID");
            if (!string.IsNullOrEmpty(loginUserID))
            {
                loginUserID = CookieEncryptions.DecryptCookie(loginUserID);
                if (RedisDal.ContainsKey(RedisTypeEnum.Userinfo, "onLine_" + loginUserID))
                {
                    RedisDal.RemoveKey(RedisTypeEnum.Userinfo, "onLine_" + loginUserID);
                }
            }
        }
        #endregion

        #region 更新登录状态
        /// <summary>
        /// 更新登录状态
        /// </summary>
        public void UpdateOnLine()
        {
            string loginUserID = CookieHelper.GetCookieValue("LoginUserID");
            if (!string.IsNullOrEmpty(loginUserID))
            {
                loginUserID = CookieEncryptions.DecryptCookie(loginUserID);
                var keyValues = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("LoginTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                        new KeyValuePair<string, string>("LoginIP", HttpHelper.GetExtranetIP())
                    };
                RedisDal.SetRangeInHash(RedisTypeEnum.Userinfo, "onLine_" + loginUserID, keyValues);
            }
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
            return dal.GetUserInfoByID(userID);
        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userID">加密后的userID</param>
        /// <returns></returns>
        public EI_Account GetUserInfoByDecryptCookieID(string userID)
        {
            return GetUserInfoByID(CookieEncryptions.DecryptCookie(userID));
        }

        #endregion


    }
}
