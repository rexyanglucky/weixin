using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.IO;

namespace Mfg.EI.Common
{
    public class CacheHelper
    {

        public static string getCss(string keyName)
        {
            try
            {
                System.Web.Caching.Cache objCache = HttpRuntime.Cache;
                //CacheDependency dependency=null;
                //string txtPath = System.Web.HttpContext.Current.Server.MapPath(ConfigHelper.DependencyFolder) + @"\" + keyName + ".txt";
                if (objCache[keyName] == null)
                {
                    //if (IOHelper.Exists(txtPath))
                    //{
                    //    dependency = new CacheDependency(txtPath);
                    //}
                    //else
                    //{
                    //    if (IOHelper.CreateFile(txtPath))
                    //{
                    //IOHelper.Write(txtPath, "red");
                    //}

                    //}
                    //string txtInfo = IOHelper.Read(txtPath);

                    objCache.Insert(keyName, "red", null, DateTime.Now.AddSeconds(10), TimeSpan.Zero);
                }
                return objCache[keyName].ToString();
            }
            catch
            {

                return "";
            }


        }
    }
}
