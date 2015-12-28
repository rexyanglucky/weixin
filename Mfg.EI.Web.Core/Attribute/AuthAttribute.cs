/*
 * author:杨礼文;
 * function:Filters验证
 * date:2015-04-16
 * version:
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Mfg.EI.Entity;
using Mfg.EI.Authenticate;



namespace Mfg.EI.Web.Core
{
    /// <summary>
    /// 权限验证
    /// </summary>
    public class AuthAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 角色
        /// </summary>
        public UserTypeEnum[] Roles { get; set; }

        /// <summary>
        /// 验证权限（action执行前会先执行这里）
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //获取当前请求参数jobId的值
            //var jobId = filterContext.HttpContext.Request["jobId"];
            //Get,Post确定是那种请求
            //filterContext.HttpContext.Request.HttpMethod == "get"
            // filterContext.HttpContext.Request.Url.Authority;  localhost:16455
            //filterContext.HttpContext.Request.Url.AbsolutePath;  /SyncTeach/Index
            // filterContext.HttpContext.Request.Url.AbsoluteUri http://localhost:16455/SyncTeach/ElementarySchool



            var auth = new Authenticate.Authenticate();
            //如果存在身份信息

            if (!auth.IsSignIn)
            {
                filterContext.Result = new RedirectResult("/Login/Index");
                //filterContext.HttpContext.Response.Redirect("/Login/Index");
                //ContentResult Content = new ContentResult();
                //Content.Content = string.Format("<script type='text/javascript'>alert('请先登录！');window.location.href='{0}';</script>", FormsAuthentication.LoginUrl);
                //filterContext.Result = Content;
                return;
            }
            else
            {
                //UserTypeEnum role = UserTypeEnum.All;//登录用户的角色
                UserTypeEnum role = auth.MfgUser.RoleType;
                if (role == UserTypeEnum.All || Roles.Contains(role) || Roles.Contains(UserTypeEnum.All))//开发（最高权限） 或者验证通过 或者任何人可以访问
                {
                    //to do something
                }
                else//验证不通过
                {
                    filterContext.HttpContext.Response.Redirect("/Login/Index");

                    //ContentResult Content = new ContentResult();
                    //Content.Content = "<script type='text/javascript'>alert('权限验证不通过！');history.go(-1);</script>";
                    //filterContext.Result = Content;
                    return;
                }
            }
            filterContext.HttpContext.Response.AddHeader(@"Access-Control-Allow-Origin", "*");
            base.OnActionExecuting(filterContext);

        }
    }
}
