using System.Configuration;
namespace Mfg.EI.WeiXin
{
    public class WeiXinConfig
    {
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

        public static string CssUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["CssUrl"];
            }
        }
    }
}
