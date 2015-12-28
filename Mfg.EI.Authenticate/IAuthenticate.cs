using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.Authenticate
{
    public interface IAuthenticate
    {

        /// <summary>
        /// 将登录信息存入cookie
        /// </summary>
        /// <param name="mfg"></param>
        /// <param name="persistent">是否设置过期时间</param>
        void SetAuthCookie(MfgUser mfg, bool persistent);
        void SetAuthCookie(MfgUser mfg, bool persistent, int days
            );
        /// <summary>
        /// 是否登录
        /// </summary>
        /// <returns></returns>
        bool IsSignIn { get; }

        /// <summary>
        /// 退出登录状态
        /// </summary>
        void Signout();

        /// <summary>
        /// 获取登录用户简单对象信息
        /// </summary>
        /// <returns></returns>
        MfgUser MfgUser { get; }
        /// <summary>
        /// 微信用户
        /// </summary>
        WeiXinUser WeiXinUser { get; }

        Student Student { get; }
        AppId AppId { get; }
        /// <summary>
        /// 写入微信CookIe
        /// </summary>
        /// <param name="OpenId"></param>
        /// <param name="Bind"></param>
        void SetStudentCookie(string stuId);
        /// <summary>
        /// 写入微信CookIe
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="Bind"></param>
        void SetWeiXinCookie(string openId);

        void SetAppCookie(string appId);

        void CleareStudentCookie();
        bool ClearAllCookie();
    }
}
