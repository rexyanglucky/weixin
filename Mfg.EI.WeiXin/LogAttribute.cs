using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Mfg.EI.Authenticate;
using System.Configuration;
using Mfg.EI.Common;
using Mfg.EI.InterFace.WeiXin;
namespace Mfg.EI.WeiXin
{
    public class LoginAttribute : ActionFilterAttribute
    {
        public void OnActionExecuting1(ActionExecutingContext filterContext)
        {
            try
            {
                var auth = DependencyResolver.Current.GetService<IAuthenticate>();
                var weixin = DependencyResolver.Current.GetService<IWeiXin>();


                var openId = WeiXinHelper.GetOpenId(filterContext.HttpContext);
                var appId = WeiXinHelper.GetAppId(filterContext.HttpContext);
                //#warning 发布时恢复过来
                //#if(DEBUG)

                //                OpenId = "o6Rpgt87b_j30ajib-v7AEcqGkf8";
                //                AppId = "wxc4cad1e99b63d1c0";
                //#endif
                if (auth.WeiXinUser == null)
                {
                    if (string.IsNullOrEmpty(openId))
                    {
                        filterContext.Result = new RedirectResult("/Home/Error.html");
                        return;
                    }
                    auth.SetWeiXinCookie(openId);
                    auth.SetAppCookie(appId);
                    if (!weixin.IsBind(openId, appId))
                    {
                        filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                        return;
                    }
                    auth.SetStudentCookie(weixin.QueryStudentByWeiXin(auth.WeiXinUser.UserID, appId).Mfgid);
                }
                else
                {

                    if (!string.IsNullOrEmpty(openId))
                    {
                        if (openId != auth.WeiXinUser.UserID)
                        {

                            auth.SetWeiXinCookie(openId);

                        }
                    }
                    if (!string.IsNullOrEmpty(appId))
                    {

                        if (auth.AppId == null)
                        {
                            auth.SetAppCookie(appId);
                        }
                        if (appId != auth.AppId.AppIds)
                        {
                            auth.SetAppCookie(appId);
                            var model = weixin.QueryStudentByWeiXin(auth.WeiXinUser.UserID, appId);

                            if (model != null)
                            {
                                auth.SetStudentCookie(model.Mfgid);
                            }
                            else
                            {

                                filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                                return;
                            }
                        }
                    }

                    if (auth.AppId != null)
                    {

                        if (!string.IsNullOrEmpty(auth.AppId.AppIds))
                        {

                            if (!weixin.IsBind(auth.WeiXinUser.UserID, auth.AppId.AppIds))
                            {
                                filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                                return;
                            }
                            else
                            {
                                if (auth.Student == null)
                                {
                                    var model = weixin.QueryStudentByWeiXin(auth.WeiXinUser.UserID, auth.AppId.AppIds);
                                    if (model != null)
                                    {
                                        auth.SetStudentCookie(model.Mfgid);
                                    }
                                    else
                                    {
                                        filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                                        return;
                                    }
                                }
                                else
                                {
                                    if (string.IsNullOrEmpty(auth.Student.StuID))
                                    {
                                        var model = weixin.QueryStudentByWeiXin(auth.WeiXinUser.UserID, auth.AppId.AppIds);
                                        if (model != null)
                                        {
                                            auth.SetStudentCookie(model.Mfgid);
                                        }
                                        else
                                        {
                                            filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                                            return;
                                        }
                                    }
                                }
                            }

                        }
                        else
                        {
                            LogHelperNet.Error("跳转绑定页面 ", null);
                            filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                            return;
                        }
                    }
                    else
                    {
                        LogHelperNet.Error("auth为空", null);
                        filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                        return;
                    }

                }

                base.OnActionExecuting(filterContext);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("Log出错:", ex);
            }

        }


        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                var auth = DependencyResolver.Current.GetService<IAuthenticate>();
                var weixin = DependencyResolver.Current.GetService<IWeiXin>();

                var appId = WeiXinHelper.GetAppId(filterContext.HttpContext);
                string openId;
                // 从微信菜单进入
                if (!string.IsNullOrEmpty(appId))
                {
                    openId = WeiXinHelper.GetOpenId(filterContext.HttpContext);
                    if (string.IsNullOrEmpty(openId))
                    {
                        filterContext.Result = new RedirectResult("/Home/Error.html");
                        return;
                    }
                    auth.SetAppCookie(appId);
                    auth.SetWeiXinCookie(openId);
                    var isbind = weixin.IsBind(openId, appId);
                    if (isbind)
                    {
                        var model = weixin.QueryStudentByWeiXin(openId, appId);
                        auth.SetStudentCookie(model.Mfgid);
                    }
                    else
                    {
                        filterContext.Result = new RedirectResult("/Contact/BindInfo.html");
                        return;
                    }
                }
                else
                {
                    appId = auth.AppId == null ? "" : auth.AppId.AppIds;
                    openId = auth.WeiXinUser == null ? "" : auth.WeiXinUser.UserID;
                    if (string.IsNullOrEmpty(appId) || string.IsNullOrEmpty(openId))
                    {
                        filterContext.Result = new RedirectResult("/Home/Error.html");
                        return;
                    }
                }
                base.OnActionExecuting(filterContext);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("Log出错:", ex);
            }

        }
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
        }
    }
}
