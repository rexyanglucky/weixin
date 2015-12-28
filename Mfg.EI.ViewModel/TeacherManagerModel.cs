/*
 * author:谢利民;
 * function:教师管理模型
 * adddate:2015-04-20
 * updatedate:2015-04-30
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// TeacherManagerModel：教师管理模型
    /// </summary>
    public class TeacherManagerModel
    {

        /// <summary>
        /// 账号ID
        /// </summary>
        public int AccountNumber { get; set; }
        /// <summary>
        /// 机构
        /// </summary>
        public int? OrgID { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        public int UType { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///账号
        /// </summary>
        public string LoginName { get; set; }

        public string Pwd { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// 身份证号
        /// </summary>
        public string CardNumber { get; set; }

        /// <summary>
        /// QQ号
        /// </summary>
        public string QQ { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 职务
        /// </summary>
        public string Postion { get; set; }

        /// <summary>
        /// 上传图片
        /// </summary>
        public string HeadImg { get; set; }
        /// <summary>
        /// 学制
        /// </summary>
        public int? AcaStru { get; set; }

        /// <summary>
        /// 页面加载的学制
        /// </summary>
        public int? OldAcaStru { get; set; }
        /// <summary>
        /// 角色ID
        /// </summary>
        public int? RoleTypeID { get; set; }

        /// <summary>
        /// 分组
        /// </summary>
        public int GroupID { get; set; }

        public string GroupName { get; set; }
        public string SID { get; set; }
        public string CreateBy { get; set; }



        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? ArtSciences { get; set; }
        /// <summary>
        /// 阶段科目对应关系模型
        /// </summary>
        public List<ManRelStaModel> ManRelStaList
        {
            get;
            set;
        }

        public string ValidateCode { get; set; }


        /// <summary>
        /// 首次登录标识
        /// </summary>
        public int FirstLogin { get; set; }

        /// <summary>
        /// 冻结标识
        /// </summary>
        public int FreezeFlag { get; set; }

        /// <summary>
        /// 学制是否修改
        /// </summary>
        public bool IsCheckAcastru { get; set; }

        /// <summary>
        /// 文理是否修改
        /// </summary>
        public bool IsCheckArtsciences { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int IsTeach { get; set; }


        public int MfgID { get; set; }
    }

    public class TeacherTreeModel
    {
        public int ID { get; set; }
        public string CreateBy { get; set; }
        public string Name { get; set; }
        public bool IsLeaf { get; set; }

        public Int64 Level { get; set; }
    }

}
