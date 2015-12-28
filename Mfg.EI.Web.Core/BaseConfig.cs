using Mfg.EI.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using Mfg.EI.Entity;
using Mfg.EI.InterFace;
using Autofac;
using Autofac.Integration.Mvc;
using System.Reflection;
using System.Web.Mvc;
using Mfg.EI.DAL;
namespace Mfg.EI.Web.Core
{
    public class BaseConfig
    {
        private static Object LockHelper = new Object();
        /// <summary>
        /// JsUrl
        /// </summary>
        public static string JsUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["JsUrl"];
            }
        }

        public static string ImageServiceUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["ImageServiceUrl"];
            }
        }

        public static string CssUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["CssUrl"];
            }
        }

        public static string ImgUrl
        {
            get
            {
                var img = ImgUrl;
                if (img == null)
                {
                    lock (LockHelper)
                    {
                        img = ConfigurationManager.AppSettings["ImgUrl"];
                    }
                }
                return img;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public static string PhotoUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["PhotoUrl"];
            }
        }
        /// <summary>
        /// Css模板以及Logo
        /// </summary>
        public static EI_Org CssTemplate
        {
            get
            {
                System.Web.Caching.Cache objCache = HttpRuntime.Cache;
                Mfg.EI.InterFace.IOrgManger _IOrgManger = new OrgManger();
                if (objCache[HttpHelper.DomainName] == null)
                {
                    lock (LockHelper)
                    {
                        //string href = BaseConfig.CssUrl + "/" + (BaseConfig.CssTemplate == "" ? "skin1" : BaseConfig.CssTemplate) + ".css";
                        //@(ViewBag.LogoUrl == "" ? "/Content/public/logo.png" : ViewBag.LogoUrl)
                        EI_Org model = _IOrgManger.GetModel(HttpHelper.DomainName);
                        if (model != null)
                        {
                            model.OrgTemplate = model.OrgTemplate == "" ? "skin1" : model.OrgTemplate;
                            model.LogoUrl = model.LogoUrl == "" ? "/Content/public/logo.png" : model.LogoUrl;
                            model.BannerImgUrls = string.IsNullOrEmpty(model.BannerImgUrls)
                                ? "/Content/public/01.jpg|/Content/public/02.jpg|/Content/public/03.jpg"
                                : model.BannerImgUrls;
                        }
                        else
                        {
                            model = new EI_Org()
                            {
                                OrgTemplate = "skin1",
                                LogoUrl = "/Content/public/logo.png",
                                BannerImgUrls = "/Content/public/01.jpg|/Content/public/02.jpg|/Content/public/03.jpg",
                                FootFragment = ""
                            };
                        }

                        objCache.Insert(HttpHelper.DomainName, model, null, DateTime.Now.AddMinutes(20), TimeSpan.Zero);
                    }
                }
                return objCache[HttpHelper.DomainName] as EI_Org;
            }
        }

        public static void RemoveCache()
        {
            HttpRuntime.Cache.Remove(HttpHelper.DomainName);

        }

    }
}
