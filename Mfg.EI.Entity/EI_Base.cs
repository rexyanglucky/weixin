

/*
 * author:芦玉海;
 * function:阶段科目对应表【EI_TeachDiary】对应的实体查询
 * adddate:2015-04-27
 * updatedate:2015-04-27
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.Entity
{
    /// <summary>
    /// 传递查询参数类
    /// </summary>
    public class EI_Base
    {
        /// <summary>
        /// 当前时间
        /// </summary>
        public DateTime currentDate { get; set; }

        /// <summary>
        /// 查询条数
        /// </summary>
        public int number { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public int TID { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public Int32 SubjectID { get; set; }

        public string Grade { get; set; }

        public int GradeS { get; set; }
        public int GradeE { get; set; }
    }

    /// <summary>
    /// 传递查询参数类
    /// </summary>
    /// <typeparam name="T">实体参数类</typeparam>
    /// <remarks></remarks>
    public class EI_Base<T> : EI_Base
    {
        public T dto { get; set; }

        
    }
}
