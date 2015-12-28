/*
 * author:谢利民;
 * function:创建教师模型
 * adddate:2015-04-22
 * updatedate:2015-04-22
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class CreateTeacherModel
    {

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 账号
        /// </summary>
        public string LoginName { get; set; }

        /// <summary>
        /// 初始密码
        /// </summary>
        public string Pwd { get; set; }
        
        /// <summary>
        /// 性别
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 职务
        /// </summary>
        public string Postion { get; set; }

        /// <summary>
        /// 学制
        /// </summary>
        public int? AcaStru { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        public int UType { get; set; }

        /// <summary>
        /// 文理
        /// </summary>
        public int? ArtSciences { get; set; }

        public int CreateBy { get; set; }

        /// <summary>
        /// 教研
        /// </summary>
        public int IsTeach { get; set; }
    }
}
