using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class FirstStepModel
    {
        public Int64 PlanID { get; set; }
        public int PlanVersion { get; set; }
        public string PlanName { get; set; }
        public Int16 PlanNumber { get; set; }
        /// <summary>
        /// 教学情境：1同步教学；2综合复习；
        /// </summary>
        public byte TeachSituation { get; set; }
        public int StageID { get; set; }
        public int GradeID { get; set; }
        public int SubjectID { get; set; }
        public string MaterialID { get; set; }
        public string MaterialName { get; set; }

        public string BookID { get; set; }
        public string BookName { get; set; }

        public string Remarks { get; set; }
        public DateTime CreateTime { get; set; }
        public string StrCreateTime { get; set; }


        #region MyRegion
        /// <summary>
        /// 0为模板；1为学生；2为组
        /// </summary>
        public Int16 SourceType { get; set; }
        /// <summary>
        /// 用户ID或组ID
        /// </summary>
        public string SouceID { get; set; }
        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }

        public int TID { get; set; }

        /// <summary>
        /// 是否有测评数据：1有；0无
        /// </summary>
        public int IsTest { get; set; }


        /// <summary>
        /// 是否处于编辑状态：1是；0否
        /// </summary>
        public int IsEdit { get; set; }

        public int IsEffect { get; set; }

        #endregion
    }




    public class SecondStepModel
    {
        //a.PlanIndexID,a.PlanID,a.NumberName,a.INumber,
        //b.PlanPointsID,b.PointID,b.PointName,b.PointIndex



        public Int64 PlanIndexID { get; set; }

        public Int64 PlanID { get; set; }

        public string NumberName { get; set; }

        public Int16 INumber { get; set; }

        public Int64 PlanPointsID { get; set; }

        public string PointID { get; set; }

        public string PointName { get; set; }

        public int PointIndex { get; set; }

        public int IsRoot { get; set; }

        public Int64? ParentID { get; set; }

        public int StageID { get; set; }
        public int GradeID { get; set; }
        public int SubjectID { get; set; }
        /// <summary>
        /// 0为模板；1为学生；2为组；
        /// </summary>
        public byte SourceType { get; set; }

        /// <summary>
        /// 用户ID或组ID
        /// </summary>
        public string SouceID { get; set; }



        /// <summary>
        /// 状态：0末开始；1进行中；2已完成
        /// </summary>
        public byte IndexStatus { get; set; }


        /// <summary>
        /// 标识   T:1为新增；0为删除；2为排序变化
        /// </summary>
        public int T { get; set; }


        public int TID { get; set; }
        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }

        /// <summary>
        /// 是否处于编辑状态：1是；0否
        /// </summary>
        public int IsEdit { get; set; }
        /// <summary>
        /// ei_plan_mapping 的IsEffect
        /// </summary>
        public int IsEffect { get; set; }

        /// <summary>
        /// ei_plan_points_draft 的IsEffect
        /// </summary>
        public int P_IsEffect { get; set; }


        /// <summary>
        /// 数据来源 1：接口 0：库
        /// </summary>
        public int DataSource { get; set; }

        /// <summary>
        /// 教学情境：1同步教学；2综合复习；
        /// </summary>
        public byte TeachSituation { get; set; }


        public string BookID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int IsInit { get; set; }
        /// <summary>
        /// 当前层级
        /// </summary>
        public byte CurrentLever { get; set; }
    }


}
