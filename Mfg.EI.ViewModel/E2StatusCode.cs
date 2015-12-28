/*
 * author:杨礼文;
 * function:操作类型
 * date:2015-04-21
 * version:
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class E2StatusCode
    {
        /// <summary>
        /// 成功
        /// </summary>
        public static string OK = "11-001";
        /// <summary>
        /// 传入内容格式错误
        /// </summary>
        public static string Error_ParWro = "11-002";
        /// <summary>
        /// 传入内容为空
        /// </summary>
        public static string Error_NoData = "11-003";
        /// <summary>
        /// 其他错误
        /// </summary>
        public static string Error_Else = "11-004";
        /// <summary>
        /// 错误
        /// </summary>
        public static string Error_U_NL = "11-005";

        public static string NoPass = "11-006";
    }

}
