using Mfg.EI.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class LoginModel
    {
        /// <summary>
        ///账号
        /// </summary>
        public string LoginName { get; set; }
        /// <summary>
        /// 名字
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }

        /// <summary>
        /// 学生类型，0普通，1VIP标准，2VIP白金，3VIP钻石
        /// </summary>
        public int? SType { get; set; }
        public string Pwd { get; set; }



        public string ValidateCode { get; set; }

        /// <summary>
        /// 首次登录标识 0 否，1是
        /// </summary>
        public int FirstLogin { get; set; }

        /// <summary>
        /// 是否记住密码
        /// </summary>
        public bool IsKeppPwd { get; set; }
        /// <summary>
        /// 年级
        /// </summary>
        public int GradeID { get; set; }

        public string BGrade { get; set; }

        public bool IsActivate { get; set; }
    }
}
