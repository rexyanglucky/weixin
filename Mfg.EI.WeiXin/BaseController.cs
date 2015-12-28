using Mfg.EI.Authenticate;
using Mfg.EI.InterFace.WeiXin;
using System.Web.Mvc;

namespace Mfg.EI.WeiXin
{
    public class BaseController : Controller
    {
        protected readonly IAuthenticate _auth;
        protected readonly IWeiXin _WeiXin;
        /// <summary>
        /// 基类构造方法
        /// </summary>
        public BaseController(IAuthenticate auth, IWeiXin WeiXin)
        {
            this._auth = auth;
            this._WeiXin = WeiXin;
        }
        /// <summary>
        /// 用户是否登录
        /// </summary>
        public bool IsLogin
        {
            get
            {
                return _auth.IsSignIn;
            }
        }

        /// <summary>
        /// 获取当前登录人的用户编号
        /// </summary>
        public int UserID
        {
            get
            {
                //未登录用户为0
                if (!IsLogin) return 0;
                return MfgUser.UserID;
            }
        }
        /// <summary>
        /// 获取当前登录人的简单信息
        /// </summary>
        public MfgUser MfgUser
        {
            get
            {
                return _auth.MfgUser;
            }
        }
        public WeiXinUser WeiXinUser
        {
            get
            {
                return _auth.WeiXinUser;
            }
        }
        public Student Student
        {
            get
            {
                return _auth.Student;
            }
        }
        /// <summary>
        /// 获取当前登录人的登录名
        /// </summary>
        public string UserName
        {
            get
            {
                if (!IsLogin) return null;
                return MfgUser.UserName;
            }
        }
        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID
        {
            get
            {
                //未登录用户为0
                if (!IsLogin) return 0;
                return MfgUser.OrgID;
            }
        }

        /// <summary>
        /// 跳转页面
        /// </summary>
        /// <returns></returns>
        public ActionResult JumpUrl(string url)
        {
            var href = string.Format("/Contact/Guide?url={0}", url);
            return Redirect(href);
        }
        public ActionResult JumpError()
        {
            return Redirect("/Contact/BindInfo.html");
        }
        public bool WeiXinParam
        {
            get
            {
                if (System.Web.HttpContext.Current.Request.QueryString["Code"] != null && System.Web.HttpContext.Current.Request.QueryString["Fid"] != null) return true;
                return false;
            }
        }
        /// <summary>
        /// 获取浏览器
        /// </summary>
        public string Version
        {
            get
            {
                return System.Web.HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"];
            }
        }
        public bool WeiXin
        {
            get
            {
                return Version.Contains("");
            }
        }
    }
}
