using Autofac;
using Autofac.Integration.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Mfg.EI.WeiXin.Web
{
    // 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    // 请访问 http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {

            AreaRegistration.RegisterAllAreas();
            //WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();
            IocRegister();

        }
        /// <summary>
        /// IOC
        /// </summary>
        public void IocRegister()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).AsImplementedInterfaces();

            #region 注册接口对象
            builder.RegisterType<Mfg.EI.InterFace.User>().As<Mfg.EI.InterFace.IUser>();
            builder.RegisterType<Mfg.EI.InterFace.FamilyInfo>().As<Mfg.EI.InterFace.IFamilyInfo>();
            builder.RegisterType<Mfg.EI.InterFace.Student>().As<Mfg.EI.InterFace.IStudent>();
            builder.RegisterType<Mfg.EI.InterFace.WeiXin.WeiXin>().As<Mfg.EI.InterFace.WeiXin.IWeiXin>();
            builder.RegisterType<Mfg.EI.Authenticate.Authenticate>().As<Mfg.EI.Authenticate.IAuthenticate>();
            builder.RegisterType<Mfg.EI.InterFace.HomeWork>().As<Mfg.EI.InterFace.IHomeWork>();
            builder.RegisterType<Mfg.EI.InterFace.Question>().As<Mfg.EI.InterFace.IQuestion>();
            builder.RegisterType<Mfg.EI.InterFace.ExamOnline>().As<Mfg.EI.InterFace.IExamOnline>();
            builder.RegisterType<Mfg.EI.InterFace.Wrong>().As<Mfg.EI.InterFace.IWrong>();
            builder.RegisterType<Mfg.EI.InterFace.TestAnalysis>().As<Mfg.EI.InterFace.ITestAnalysis>();
            #endregion

            IContainer container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}