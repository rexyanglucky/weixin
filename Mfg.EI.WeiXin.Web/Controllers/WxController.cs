using Mfg.EI.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Xml;

namespace Mfg.EI.WeiXin.Web.Controllers
{
    public class WxController : Controller
    {
        //
        // GET: /Wx/

        public ActionResult Index()
        {
            string postString = string.Empty;

            if (Request.HttpMethod.ToUpper() == "POST")
            {
                using (Stream stream = Request.InputStream)
                {
                    Byte[] postBytes = new Byte[stream.Length];
                    stream.Read(postBytes, 0, (Int32)stream.Length);
                    postString = Encoding.UTF8.GetString(postBytes);

                }

                if (!string.IsNullOrEmpty(postString))
                {
                    messageHelp msg = new messageHelp();
                    LogHelperNet.Info(postString, null);
                    var x = new XmlDocument();
                    x.LoadXml(postString);
                    Response.ContentEncoding = Encoding.UTF8;
                    Response.Write(msg.TextHandle(x));
                    Response.End();
                }
            }
            else
            {
                Auth(); //微信接入的测试
            }
            return null;
        }
        private void Auth()
        {
            string token = ConfigurationManager.AppSettings["WeixinToken"];//从配置文件获取Token
            if (string.IsNullOrEmpty(token))
            {
                LogHelperNet.Info("WeixinToken 配置项没有配置！", null);
            }

            string echoString = Request.QueryString["echoStr"];
            string signature = Request.QueryString["signature"];
            string timestamp = Request.QueryString["timestamp"];
            string nonce = Request.QueryString["nonce"];

            if (CheckSignature(token, signature, timestamp, nonce))
            {
                if (!string.IsNullOrEmpty(echoString))
                {
                    Response.Write(echoString);
                    Response.End();
                }
            }
        }
        /// <summary>
        /// 验证微信签名
        /// </summary>
        public bool CheckSignature(string token, string signature, string timestamp, string nonce)
        {
            string[] ArrTmp = { token, timestamp, nonce };

            Array.Sort(ArrTmp);
            string tmpStr = string.Join("", ArrTmp);

            tmpStr = FormsAuthentication.HashPasswordForStoringInConfigFile(tmpStr, "SHA1");
            tmpStr = tmpStr.ToLower();

            if (tmpStr == signature)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        ///// <summary>
        ///// 处理信息并应答
        ///// </summary>
        //private void Handle(string postStr)
        //{
        //    messageHelp help = new messageHelp();
        //    string responseContent = help.ReturnMessage(postStr);

        //    Response.ContentEncoding = Encoding.UTF8;
        //    Response.Write(responseContent);
        //}
    }
}
