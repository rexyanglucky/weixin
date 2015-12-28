using Mfg.EI.WeiXin.ViewModel;
using System;
using Mfg.EI.Common;
using System.Configuration;

namespace Mfg.EI.WeiXin
{
    public class WeiXinHelper
    {
        /// <summary>
        /// 获取微信帐号OpenId
        /// </summary>
        /// <returns></returns>
        public static string GetOpenId(System.Web.HttpContextBase http)
        {

//#warning 发布时恢复过来
//#if (DEBUG)
//            {
//                return "o6Rpgt87b_j30ajib-v7AEcqGkf8";
//            }
//#endif

            try
            {

                var appId = GetUrlParam(http, "Fid") == null ? null : GetUrlParam(http, "Fid").Split('$')[0];
                var secret = GetUrlParam(http, "Fid") == null ? null : EncryptHelper.Decrypt(GetUrlParam(http, "Fid").Split('$')[1].Replace(" ", "+"), ConfigurationManager.AppSettings["MfgKey"]);

                var code = GetUrlParam(http, "code");
                if (string.IsNullOrEmpty(appId) || string.IsNullOrEmpty(secret) || string.IsNullOrEmpty(code))
                {
                    LogHelperNet.Error("appid secret code有一个为空:" + secret, null);
                    LogHelperNet.Error("appId:" + secret, null);
                    LogHelperNet.Error("Secret:" + secret, null);
                    LogHelperNet.Error("Code:" + code, null);
                    LogHelperNet.Error("========================" + secret, null);
                    return null;

                }
                var url = string.Format(@"https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type={3}", appId, secret, code, "authorization_code");

                var msg = WeiXinAPi.RequestInterFace(url);
                return msg.FromJsonTo<WeiXinResult>().openid;
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("获取openid失败", ex);
                return null;
            }
        }
        public static string GetAppId(System.Web.HttpContextBase http)
        {
            try
            {
                return GetUrlParam(http, "Fid") == null ? null : GetUrlParam(http, "Fid").Split('$')[0];
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("", ex);
                return null;
            }
        }
        //public static string OpenId
        //{
        //    get
        //    {
        //        return GetOpenId(GetAppId,GetSecret,GetCode);
        //    }
        //}
        ///// <summary>
        ///// 获取帐号
        ///// </summary>
        ///// <returns></returns>
        //public static string GetAppId
        //{
        //    get
        //    {
        //        if (string.IsNullOrEmpty(GetUrlParam(_http, "Fid"))) return null;
        //        return GetUrlParam(_http,"fid").Split('$')[0];
        //    }
        //}
        ///// <summary>
        ///// 获取密钥
        ///// </summary>
        ///// <returns></returns>
        //public static string GetSecret
        //{
        //    get
        //    {
        //    if (string.IsNullOrEmpty(GetUrlParam(_http,"Fid"))) return null;
        //    return EncryptHelper.Decrypt(GetUrlParam(_http,"fid").Split('$')[1], ConfigurationManager.AppSettings["MfgKey"]);
        //    }
        //}
        //public static string  GetCode
        //{
        //    get
        //    {
        //        if (string.IsNullOrEmpty(GetUrlParam(_http, "code"))) return null;
        //    return GetUrlParam(_http,"code");
        //    }
        //}
        /// <summary>
        /// 根据参数名获取值
        /// </summary>
        /// <param name="http"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static string GetUrlParam(System.Web.HttpContextBase http, string param)
        {
            return http.Request.Params[param];
        }

    }
}
