using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace Mfg.EI.Common
{
    public static class ConfigHelper
    {
        /// <summary>
        /// 依赖项存放文件夹
        /// </summary>
        public static string DependencyFolder
        {
            get
            {
                return ConfigurationManager.AppSettings["DependencyFolder"];

            }
        }
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


    }
}
