/*
 * author:yangjin;
 * function:菜单模块枚举
 * date:2015-04-16
 * version:
 */
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace Mfg.EI.Entity
{
    public enum MenuModulEnum
    {
        //1. 教学任务
        //2. 同步教学
        //3. 电子作业
        //4. 在线考试
        //5. 用户管理
        //6. 知识测评
        //7. 好题好卷

        /// <summary>
        /// 教学任务
        /// </summary>
        [Description("教学任务")]
        TeachTask = 1,
        /// <summary>
        /// 同步教学
        /// </summary>
        [Description("同步教学")]
        Teaching = 2,
        /// <summary>
        /// 电子作业
        /// </summary>
        [Description("电子作业")]
        ElectronicTask = 3,
        /// <summary>
        /// 在线考试
        /// </summary>
        [Description("在线考试")]
        OnlineExam = 4,
        /// <summary>
        /// 用户管理
        /// </summary>
        [Description("用户管理")]
        UserManage = 5,
        /// <summary>
        /// 知识测评
        /// </summary>
        [Description("知识测评")]
        TestAnlya = 6,
        /// <summary>
        /// 好题好卷
        /// </summary>
        [Description("好题好卷")]
        GoodQues = 7

    }

    public enum StudentMenuModulEnum
    {
       

        /// <summary>
        /// 教学任务
        /// </summary>
        [Description("学习任务")]
        StudyTask = 1,
        /// <summary>
        /// 同步教学
        /// </summary>
        [Description("同步学习")]
        Studying = 2,
        /// <summary>
        /// 电子作业
        /// </summary>
        [Description("电子作业")]
        ElectronicTask = 3,
        /// <summary>
        /// 在线考试
        /// </summary>
        [Description("在线考试")]
        OnlineExam = 4,
        /// <summary>
        /// 用户管理
        /// </summary>
        [Description("错题本")]
        WrongBook = 8,
        /// <summary>
        /// 知识测评
        /// </summary>
        [Description("测评分析")]
        TestAnaly= 9


    }
}
