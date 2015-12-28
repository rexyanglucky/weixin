using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{

    public partial class PlanParaViewModel
    {
        public int OrgID { get; set; }

        public bool IsFinish { get; set; }

        public string SourceName { get; set; }
        public int TID { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }
        public int StageID { get; set; }
        public byte SourceType { get; set; }

        public string SouceID { get; set; }
        public long PlanID { get; set; }

        public long PlanIndexID { get; set; }

        public long NewPlanID { get; set; }
    }


    public partial class PlanIndexUpViewModel
    {
        public long PlanIndexID { get; set; }

        public string NumberName { get; set; }
    }

    public partial class PlanPointItemViewModel
    {
        public byte CurrentLever { get; set; }
        public bool IsHas { get; set; }
        public bool IsLeaf { get; set; }
        public bool IsRoot { get; set; }
        public bool IsShow { get; set; }
        public long ParentID { get; set; }
        public long PlanPointsID { get; set; }
        public string PointID { get; set; }
        public int PointIndex { get; set; }
        public string PointName { get; set; }
    }

    public class PlanItemViewModel
    {
        public long DetailID { get; set; }
        public int ItemID { get; set; }
        public int ItemIndex { get; set; }
        public long PlanPointsID { get; set; }
        public byte PointType { get; set; }
        public string T { get; set; }
    }

    public partial class PlanPointViewModel
    {
        public List<PlanItemViewModel> Items { get; set; }
        public List<PlanPointItemViewModel> List { get; set; }
        public string DiffMark { get; set; }
        public string FirstMark { get; set; }
        public bool IsDiff { get; set; }
        public bool IsFirst { get; set; }
        public bool IsSummary { get; set; }
        public bool IsTarget { get; set; }
        public bool IsTeach { get; set; }
        public bool IsTitle { get; set; }
        public string SummaryMark { get; set; }
        public string TargetMark { get; set; }
        public string TitleName { get; set; }
    }

    public partial class PlanIndexViewModel
    {
        public string SubjectIDStr { get; set; }

        public int GradeID { get; set; }

        public int SubjectID { get; set; }

        public string PlanName { get; set; }

        public long PlanID { get; set; }

        public Int16 PlanNumber { get; set; }

        public List<PlanIndexUpViewModel> List { get; set; }
        public int StageID { get; set; }
        public string SouceID { get; set; }
        public byte SourceType { get; set; }
        public long MappingID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string SourceName { get; set; }
        public string StartTimeStr { get; set; }
        public string EndTimeStr { get; set; }
        public byte TeachSituation { get; set; }



        public long PlanIndexID { get; set; }
        /// <summary>
        /// 教案难度；容易题1；较易题2；中等题3；较难题4；困难题5
        /// </summary>
        public byte DiffLever { get; set; }

        /// <summary>
        /// 题数设置
        /// </summary>
        public int ItemNumber { get; set; }
        /// <summary>
        /// 讲练比例；多讲型1；多练型2；中间型3；
        /// </summary>
        public byte PlanLever { get; set; }

        /// <summary>
        /// 课程侧重；1突出重点; 2全面周到; 3二者兼顾
        /// </summary>
        public byte CourseLever { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int IsInit { get; set; }


    }

    public partial class PlanViewModel
    {
        public int MaxCount { get; set; }

        public string pageNavigate { get; set; }

        public List<PlanListViewModel> List { get; set; }

    }

    public partial class PlanListViewModel
    {
        public int Index;
        public string SubjectIDStr;

        public string CreateName { get; set; }
        public short CurrentNumber { get; set; }
        public int GradeID { get; set; }
        public DateTime LastUpdateTime { get; set; }

        public string LastUpdateTimeStr { get; set; }

        public long MappingID { get; set; }
        public long PlanID { get; set; }
        public string PlanName { get; set; }
        public short PlanNumber { get; set; }
        public string SouceID { get; set; }
        public string SourceName { get; set; }
        public byte SourceType { get; set; }
        public int StageID { get; set; }
        public int SubjectID { get; set; }
        public int TeachSituation { get; set; }
    }


    public partial class PlanGroup
    {
        public string GID { get; set; }

        public string GName { get; set; }

        /// <summary>
        /// 1为学生 2为组；
        /// </summary>
        public int SourceType { get; set; }

        public string T { get; set; }
    }



}
