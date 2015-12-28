using System;
using System.Web.Mvc;
using Mfg.EI.Authenticate;
using Mfg.EI.Common;

namespace Mfg.EI.WeiXin
{
    public class CheckAttribute : ActionFilterAttribute
    {

        public void OnActionExecuting1(ActionExecutingContext filterContext)
        {
            try
            {
                var auth = DependencyResolver.Current.GetService<IAuthenticate>();
                var openId = WeiXinHelper.GetOpenId(filterContext.HttpContext);

                var appId = WeiXinHelper.GetAppId(filterContext.HttpContext);
                //#warning 发布时恢复过来
                //#if (DEBUG)
                //                {
                //                    OpenId = "o6Rpgt87b_j30ajib-v7AEcqGkf8";
                //                    AppId = "wxc4cad1e99b63d1c0";
                //                }
                //#endif

                if (auth.WeiXinUser == null || auth.AppId == null)
                {
                    if (string.IsNullOrEmpty(openId))
                    {
                        filterContext.Result = new RedirectResult("/Home/Error.html");
                        return;
                    }
                    if (!string.IsNullOrEmpty(appId))
                    {
                        auth.SetAppCookie(appId);
                    }
                    auth.SetWeiXinCookie(openId);
                }
                else
                {
                    if (!string.IsNullOrEmpty(appId))
                    {
                        auth.SetAppCookie(appId);
                    }
                }
                base.OnActionExecuting(filterContext);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("check出错:", ex);
            }
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                var auth = DependencyResolver.Current.GetService<IAuthenticate>();
                var appId = WeiXinHelper.GetAppId(filterContext.HttpContext);
                string openId;


                //从微信菜单进入
                if (!string.IsNullOrEmpty(appId))
                {
                    openId = WeiXinHelper.GetOpenId(filterContext.HttpContext);
                    if (string.IsNullOrEmpty(openId))
                    {
                        filterContext.Result = new RedirectResult("/Home/Error.html");
                        return;
                    }
                }
                else//页面跳转
                {
                    appId = auth.AppId == null ? "" : auth.AppId.AppIds;
                    openId = auth.WeiXinUser == null ? "" : auth.WeiXinUser.UserID;
                    if (string.IsNullOrEmpty(appId) || string.IsNullOrEmpty(openId))
                    {
                        filterContext.Result = new RedirectResult("/Home/Error.html");
                        return;
                    }

                }

                auth.SetAppCookie(appId);
                auth.SetWeiXinCookie(openId);





                base.OnActionExecuting(filterContext);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("check出错:", ex);
            }

        }
    }
}
