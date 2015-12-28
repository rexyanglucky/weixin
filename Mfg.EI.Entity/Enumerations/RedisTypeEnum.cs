using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    public enum RedisTypeEnum
    {
        /// <summary>
        /// 电子作业
        /// </summary>
        [Description("电子作业")]
        Jobitem = 0,

        /// <summary>
        /// 用户信息
        /// </summary>
        [Description("用户信息")]
        Userinfo = 1
    }
}
