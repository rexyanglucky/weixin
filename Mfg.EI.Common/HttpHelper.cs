using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;

namespace Mfg.EI.Common
{
    public class HttpHelper
    {
        public static string DomainName
        {
            get
            {
                return System.Web.HttpContext.Current.Request.Url.Host.ToString();
            }
        }


        public static string Port
        {
            get
            {
                return System.Web.HttpContext.Current.Request.Url.Port.ToString();
            }

        }

        #region 获取外网ip
        /// <summary>
        /// 获取外网ip
        /// </summary>
        /// <returns></returns>
        public static string GetExtranetIP()
        {
            string ip = "";
            try
            {
                ip = System.Web.HttpContext.Current.Request.UserHostAddress;
                ip = string.IsNullOrEmpty(ip) ? "127.0.1.1" : ip;
            }
            catch (Exception ex)
            {
                ip = "127.0.1.1";
            }

            #region
            //string strUrl = "http://www.ip138.com/ip2city.asp";     //获得IP的网址
            //Uri uri = new Uri(strUrl);
            //WebRequest webreq = WebRequest.Create(uri);
            //Stream s = webreq.GetResponse().GetResponseStream();
            //StreamReader sr = new StreamReader(s, Encoding.Default);
            //string all = sr.ReadToEnd();         //读取网站返回的数据  格式：您的IP地址是：[x.x.x.x]
            //int i = all.IndexOf("[") + 1;
            //string tempip = all.Substring(i, 15);
            //string ip = tempip.Replace("]", "").Replace(" ", "").Replace("<", "");     //去除杂项找出ip 
            #endregion

            return ip;
        } 


        #endregion



    }
}
