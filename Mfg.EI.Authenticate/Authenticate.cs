/*
 * author:肖同林
 * function:Cookie操作类
 * date:2015-04-21
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Mfg.EI.Entity;
using Mfg.EI.Common;

namespace Mfg.EI.Authenticate
{
    public class Authenticate : IAuthenticate
    {
        #region 私有变量
        private const string CookieName = "MfgUser";
        private const string SessionName = "MfgUser_Session";
        private const int SessionTimeOut = 30;//Session过期时间，单位：分
        private const string StuCookie = "Student";
        private const string AppCookie = "App";
        private readonly string _domain = System.Configuration.ConfigurationManager.AppSettings["Domain"];
        #endregion

        #region EI

        /// <summary>
        /// 将登录信息存入cookie
        /// </summary>
        /// <param name="mfg"></param>
        /// <param name="persistent">是否设置过期时间</param>
        public void SetAuthCookie(MfgUser mfg, bool persistent)
        {
            SetAuthCookie(mfg, persistent, 5);
            //HttpCookie cookie = new HttpCookie(CookieName);
            //cookie.Path = "/";
            //if (!string.IsNullOrEmpty(Domain))
            //{
            //    cookie.Domain = Domain;
            //}
            //if (persistent)
            //{
            //    cookie.Expires = DateTime.Now.AddDays(5);
            //}


            //cookie.Values.Add("UserId", CookieEncryptions.EncryptCookie(mfg.UserID.ToString()));
            //cookie.Values.Add("UserName", CookieEncryptions.EncryptCookie(System.Web.HttpUtility.UrlEncode(mfg.UserName)));
            //cookie.Values.Add("OrgID", CookieEncryptions.EncryptCookie(mfg.OrgID.ToString()));
            //cookie.Values.Add("OrgType", CookieEncryptions.EncryptCookie(mfg.OrgType.ToString()));
            //cookie.Values.Add("RoleType", CookieEncryptions.EncryptCookie(mfg.RoleType.ToString()));
            //cookie.Values.Add("LoginAccountNumber", CookieEncryptions.EncryptCookie(mfg.LoginAccountNumber.ToString()));
            //cookie.Values.Add("OrgSkin", CookieEncryptions.EncryptCookie(mfg.OrgSkin));
            //cookie.Values.Add("LogoUrl", CookieEncryptions.EncryptCookie(mfg.LogoUrl));
            //if (mfg.GradeID > 0)
            //{
            //    cookie.Values.Add("GradeID", CookieEncryptions.EncryptCookie(mfg.GradeID.ToString()));
            //}
            //if (!string.IsNullOrEmpty(mfg.BGrade))
            //{
            //    cookie.Values.Add("BGrade", CookieEncryptions.EncryptCookie(mfg.BGrade.ToString()));
            //}
            //HttpContext.Current.Response.AppendCookie(cookie);



            ////记录登录操作、生成Session
            //SetAuthSession(mfg.UserID.ToString());
        }

        private void SetAuthSession(string userID)
        {
            HttpContext.Current.Session.Timeout = SessionTimeOut;
            HttpContext.Current.Session[SessionName] = userID;
        }

        public bool IsSignIn
        {
            get
            {
                var cookie = HttpContext.Current.Request.Cookies[CookieName];
                //if (!string.IsNullOrEmpty(cookie.Values["OrgID"]))
                if (cookie != null)
                {
                    //若Session为空，则重新生成Session且判定当前用户为再次登录
                    if (HttpContext.Current.Session[SessionName] == null)
                    {
                        string UserID = CookieEncryptions.DecryptCookie(cookie["UserId"]);
                        SetAuthSession(UserID);
                    }
                    return true;
                }
                return false;
            }
        }

        public void Signout()
        {
            HttpCookie cookie;
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[CookieName] != null)
            {
                cookie = new HttpCookie(CookieName);
                if (!string.IsNullOrEmpty(_domain))
                {
                    cookie.Domain = _domain;
                }
                cookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
            HttpContext.Current.Session.Abandon();//取消当前Session
        }


        public MfgUser MfgUser
        {
            get
            {
                MfgUser user = null;
                if (HttpContext.Current.Request.Cookies[CookieName] == null) return null;
                try
                {
                    user = new MfgUser();
                    user.UserID = int.Parse(CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["UserId"]));
                    user.UserName = HttpUtility.UrlDecode(CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["UserName"]));
                    user.OrgID = int.Parse(CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["OrgID"]));
                    user.OrgType = int.Parse(CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["OrgType"]));
                    user.LoginAccountNumber = CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["LoginAccountNumber"]);
                    user.OrgSkin = CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["OrgSkin"]);
                    user.LogoUrl = CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["LogoUrl"]);

                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Cookies[CookieName]["GradeID"]))
                    {
                        user.GradeID = int.Parse(CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["GradeID"]));
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Cookies[CookieName]["BGrade"]))
                    {
                        user.BGrade = CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["BGrade"]);
                    }
                    var roleType = CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["RoleType"]);
                    user.RoleType = (UserTypeEnum)System.Enum.Parse(typeof(UserTypeEnum), roleType);

                    //教师魔方格ID 20151108 yangjin
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Cookies[CookieName]["MfgID"]))
                    {
                        user.MfgID = int.Parse(CookieEncryptions.DecryptCookie(HttpContext.Current.Request.Cookies[CookieName]["MfgID"]));
                    }
                }
                catch (Exception ex)
                {
                    return null;
                }
                return user;
            }
        }

        public void SetAuthCookie(MfgUser mfg, bool persistent, int days)
        {
            HttpCookie cookie = new HttpCookie(CookieName);
            cookie.Path = "/";
            if (!string.IsNullOrEmpty(_domain))
            {
                cookie.Domain = _domain;
            }
            if (persistent)
            {
                cookie.Expires = DateTime.Now.AddDays(days);
            }

            cookie.Values.Add("UserId", CookieEncryptions.EncryptCookie(mfg.UserID.ToString()));
            cookie.Values.Add("UserName", CookieEncryptions.EncryptCookie(System.Web.HttpUtility.UrlEncode(mfg.UserName)));
            cookie.Values.Add("OrgID", CookieEncryptions.EncryptCookie(mfg.OrgID.ToString()));
            cookie.Values.Add("OrgType", CookieEncryptions.EncryptCookie(mfg.OrgType.ToString()));
            cookie.Values.Add("RoleType", CookieEncryptions.EncryptCookie(mfg.RoleType.ToString()));
            cookie.Values.Add("LoginAccountNumber", CookieEncryptions.EncryptCookie(mfg.LoginAccountNumber.ToString()));
            cookie.Values.Add("OrgSkin", CookieEncryptions.EncryptCookie(mfg.OrgSkin));
            cookie.Values.Add("LogoUrl", CookieEncryptions.EncryptCookie(mfg.LogoUrl));
            cookie.Values.Add("MfgID", CookieEncryptions.EncryptCookie(mfg.MfgID.ToString()));
            if (mfg.GradeID > 0)
            {
                cookie.Values.Add("GradeID", CookieEncryptions.EncryptCookie(mfg.GradeID.ToString()));
            }
            if (!string.IsNullOrEmpty(mfg.BGrade))
            {
                cookie.Values.Add("BGrade", CookieEncryptions.EncryptCookie(mfg.BGrade.ToString()));
            }
            HttpContext.Current.Response.AppendCookie(cookie);


            //记录登录操作、生成Session
            SetAuthSession(mfg.UserID.ToString());
        }

        #endregion

        #region weixin


        #region 写入微信CookIe

        /// <summary>
        /// 将openid写入微信CookIe
        /// </summary>
        /// <param name="openId"></param>
        public void SetWeiXinCookie(string openId)
        {
            HttpCookie cookie = new HttpCookie(CookieName) { Path = "/" };
            if (!string.IsNullOrEmpty(_domain))
            {
                cookie.Domain = _domain;
            }
            cookie.Expires = DateTime.Now.AddDays(5);
            cookie.Values.Add("WeiXinId", openId);
            HttpContext.Current.Response.AppendCookie(cookie);
            SetAuthSession(openId);
        }

        /// <summary>
        /// 写入魔方格ID存入CookIe
        /// </summary>
        /// <param name="stuId"></param>
        public void SetStudentCookie(string stuId)
        {
            HttpCookie cookie = new HttpCookie(StuCookie) { Path = "/" };
            if (!string.IsNullOrEmpty(_domain))
            {
                cookie.Domain = _domain;
            }
            cookie.Expires = DateTime.Now.AddDays(5);
            cookie.Values.Add("StuID", stuId);
            HttpContext.Current.Response.AppendCookie(cookie);
            HttpContext.Current.Session[StuCookie] = stuId;

        }
        /// <summary>
        /// 将appid存入cookie
        /// </summary>
        /// <param name="appId"></param>
        public void SetAppCookie(string appId)
        {
            HttpCookie cookie = new HttpCookie(AppCookie) { Path = "/" };
            if (!string.IsNullOrEmpty(_domain))
            {
                cookie.Domain = _domain;
            }
            cookie.Expires = DateTime.Now.AddDays(5);
            cookie.Values.Add("AppId", appId);
            HttpContext.Current.Response.AppendCookie(cookie);

        }

        #endregion


        #region 读取微信cookie
        public WeiXinUser WeiXinUser
        {
            get
            {
                try
                {
                    var user = new WeiXinUser();
                    if (HttpContext.Current.Request.Cookies[CookieName] != null)
                    {
                        user.UserID = HttpContext.Current.Request.Cookies[CookieName]["WeiXinId"];
                    }
                    else
                    {
                        user = null;
                    }
                    return user;
                }
                catch (Exception)
                {
                    return null;
                }

            }



        }

        public Student Student
        {
            get
            {
                Student _user = null;
                if (HttpContext.Current.Request.Cookies[StuCookie] != null)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(StuCookie))
                        {
                            _user = new Student();
                            //_user.StuID = HttpContext.Current.Request.Cookies[StuCookie]["StuID"];
                            _user.StuID = HttpContext.Current.Session[StuCookie] as string;
                        }

                    }
                    catch
                    {
                        return null;
                    }
                }
                return _user;
            }


        }

        public AppId AppId
        {
            get
            {
                AppId appid = null;
                if (HttpContext.Current.Request.Cookies[AppCookie] != null)
                {
                    try
                    {
                        appid = new AppId { AppIds = HttpContext.Current.Request.Cookies[AppCookie]["AppId"] };
                    }
                    catch
                    {
                        return null;
                    }
                }
                return appid;

            }
        }
        #endregion
        #endregion


        #region 清除cookie

        /// <summary>
        /// 清除所有cookie
        /// </summary>
        /// <returns></returns>
        public bool ClearAllCookie()
        {
            HttpCookie aCookie;
            string cookieName;
            int limit = HttpContext.Current.Request.Cookies.Count;
            for (int i = 0; i < limit; i++)
            {
                cookieName = HttpContext.Current.Request.Cookies[i].Name;
                aCookie = new HttpCookie(cookieName);
                aCookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies.Add(aCookie);
            }
            return true;
        }

        /// <summary>
        /// 清除指定cookie
        /// </summary>
        /// <returns></returns>
        public bool ClearCookieByName(string cookieName)
        {
            HttpCookie aCookie;
            aCookie = new HttpCookie(cookieName);
            aCookie.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Current.Response.Cookies.Add(aCookie);
            HttpContext.Current.Session.Remove(cookieName);

            return true;
        }

        /// <summary>
        /// 清除学生cookie
        /// </summary>
        public void CleareStudentCookie()
        {
            ClearCookieByName(StuCookie);
        }
        #endregion

    }
    #region 微信model
    public class WeiXinUser
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string UserID { get; set; }

        public string AppId { get; set; }
    }
    public class Student
    {
        /// <summary>
        /// 学生ID
        /// </summary>
        public string StuID { get; set; }
    }
    public class AppId
    {
        public string AppIds { get; set; }
    }
    #endregion 微信model]

    #region EI model
    public class MfgUser
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public int UserID { get; set; }
        /// <summary>
        /// 用户姓名 
        /// </summary>
        public string UserName { get; set; }

        public int OrgID { get; set; }

        public string OrgSkin { get; set; }

        public UserTypeEnum RoleType { get; set; }
        /// <summary>
        /// 登录账号老师t10000000
        /// </summary>
        public string LoginAccountNumber { get; set; }

        /// <summary>
        /// Logo
        /// </summary>
        public string LogoUrl { get; set; }

        /// <summary>
        /// 机构类型，0普通版，1Vip机构
        /// </summary>
        public int OrgType { get; set; }

        /// <summary>
        /// 年级
        /// </summary>
        public int GradeID { get; set; }

        public string BGrade { get; set; }

        /// <summary>
        /// 老师魔方格ID
        /// </summary>
        public int MfgID { get; set; }

    }
    #endregion

}
