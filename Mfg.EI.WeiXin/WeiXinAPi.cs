using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin
{
    public class WeiXinAPi
    {
        /// <summary>
        /// 请求接口
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string RequestInterFace(string url)
        {
            var request = WebRequest.Create(url);
            //超时时间为：5秒
            request.Timeout = 5000;
            request.Credentials = CredentialCache.DefaultCredentials;
            var response = request.GetResponse();
            var stream = response.GetResponseStream();
            if (stream == null) return "";
            using (var reader = new StreamReader(stream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
