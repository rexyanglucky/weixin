/*
 * author:杨礼文;
 * function:操作类型枚举
 * date:2015-04-21
 * version:
 */
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace Mfg.EI.Entity
{
    public enum OperationEnum
    {
        [Description("成功")]
        Success = 1,

        [Description("失败")]
        Failure = 2,

        [Description("异常")]
        Exception = 3
    }
}
