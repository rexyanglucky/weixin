/*
 * author:杨礼文;
 * function:用户类型枚举
 * date:2015-04-16
 * version:
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace Mfg.EI.Entity
{

    public enum UserTypeEnum
    {

        //1.普通版超级管理员
        //2.普通版普通管理员
        //3.普通版教师
        //4.普通版学生
        //5.VIP版超级管理员
        //6.VIP版普通管理员
        //7.VIP版教师
        //8.学生标准版
        //9.学生白金版
        //10.学生钻石版
       
        //11.All 最高权限

        #region 普通版超级管理员
        /// <summary>
        /// 普通版超级管理员
        /// </summary>

        [Description("普通版超级管理员")]
        SuperManager = 1,
        #endregion

        #region 普通版普通管理员
        /// <summary>
        /// 普通版普通管理员
        /// </summary>
        [Description("普通版普通管理员")]
        Manager = 2,
        #endregion

        #region 普通版教师
        /// <summary>
        /// 普通版教师
        /// </summary>
         [Description("普通版教师")]
        Teacher = 3,
        #endregion

        #region 普通版学生
        /// <summary>
        /// 普通版学生
        /// </summary>
        [Description("普通版教师")]
        Student = 4,
        #endregion

        #region VIP版超级管理员
        /// <summary>
        /// VIP版超级管理员
        /// </summary>
        [Description("VIP版超级管理员")]
        VIPSuperManager = 5,
        #endregion

        #region VIP版普通管理员
        /// <summary>
        /// VIP版普通管理员
        /// </summary>
        [Description("VIP版超级管理员")]
        VIPManager = 6,
        #endregion

        #region VIP版教师
        /// <summary>
        /// VIP版教师
        /// </summary>
        [Description("VIP版教师")]
        VIPTeacher = 7,
        #endregion

        #region 学生标准版
        /// <summary>
        /// 学生标准版
        /// </summary>
        [Description("学生标准版")]
        StudentStandard = 8,
        #endregion

        #region 学生白金版
        /// <summary>
        /// 学生白金版
        /// </summary>
        [Description("学生标准版")]
        StudentPlatinum = 9,
        #endregion

        #region 学生钻石版
        /// <summary>
        /// 学生钻石版
        /// </summary>
        [Description("学生钻石版")]
        StudentDiamonds = 10,
        #endregion

        #region 最高权限
        /// <summary>
        /// 最高权限
        /// </summary>
       [Description("最高权限")]
        All = 11,

        /// <summary>
       /// 咨询师
        /// </summary>
       [Description("咨询师")]
        TeacherConsultant=12
        #endregion

    }

    public enum OrgTypeEnum
    {
        [Description("普通版机构")]
        Org = 0,
        [Description("VIP版机构")]
        VIPOrg = 1
    }
}
