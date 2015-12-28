using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Mfg.EI.WeiXin.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.RouteExistingFiles = false;
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");          
            routes.MapRoute(
                name: "Contact",
                url: "{controller}/{action}.html/{id}",
                defaults: new { controller = "Contact", action = "Teacher", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "Home",
               url: "{controller}/{action}.html/{id}",
               defaults: new { controller = "Home", action = "Menu", id = UrlParameter.Optional }
           );
            routes.MapRoute(
               name: "History",
               url: "{controller}/{action}.html/{id}",
               defaults: new { controller = "History", action = "JobHistory", id = UrlParameter.Optional }
           );
            
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "History", action = "ExamHistory", id = UrlParameter.Optional }//默认配置  
                );  
        }
    }
}