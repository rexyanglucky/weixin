using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public partial class KnowledgeCustomerPoint
    {
        public string PointID { get; set; }

        public int SubjectID { get; set; }

        public int KnowledgeId { get; set; }

        /// <summary>
        /// 1修改学习目标属性；2为修改讲解；3为启用编辑；4为禁用编辑；5为启动向其它机构公开；6为禁用向其它机构公开；7为启用有效；8为禁用有效；9修改例题；10修改课后作业
        /// </summary>
        public byte ActionState { get; set; }

        public KnowledgeCustomerPointValue PointValue { get; set; }

       

        public string TID { get; set; }

        public Int32 OrgID { get; set; }
    }


    public partial class KnowledgeCustomerPointValue
    {
        public string LearningTarget { get; set; }

        public string LearningDescription { get; set; }

        public int EditDescriptionCount { get; set; }

        public int EditTargetCount { get; set; }

        public int EditExampleCount { get; set; }

        public int EditWorkCount { get; set; }

        public bool IsEditExample { get; set; }

        public bool IsEditWork { get; set; }

        public List<KnowledgePointList> EGValue { get; set; }

        public string EGValueStr { get; set; }

        public List<KnowledgePointList> EGWorkValue { get; set; }


        public string EVGWorkValueStr { get; set; }
    }

    public partial class KnowledgePoint
    {

        public int KnowledgeId { get; set; }

        public string PointID { get; set; }


        public int OrgID { get; set; }


        public string PointName { get; set; }

        public string TID { get; set; }

        public string LastTID { get; set; }

        public DateTime LastEditTime { get; set; }

        public DateTime CreateTime { get; set; }


        public bool IsEdit { get; set; }

        public bool IsEnable { get; set; }

        public bool IsOpen { get; set; }

        public string IsUpDown { get; set; }

        public int StageID { get; set; }

        public int GradeID { get; set; }

        public int SubjectID { get; set; }

        public byte Acastru { get; set; }

        public byte Artsciences { get; set; }

        public string Edition { get; set; }

        public string LearningTarget { get; set; }

        public string LearningDescription { get; set; }


        public int EditTargetCount { get; set; }

        public int EditDescriptionCount { get; set; }

        public int EditExampleCount { get; set; }


        public int EditWorkCount { get; set; }

        /// <summary>
        /// 1修改学习目标属性；2为修改讲解；3为启用编辑；4为禁用编辑；5为启动向其它机构公开；6为禁用向其它机构公开；7为启用有效；8为禁用有效；9修改例题；10修改课后作业
        /// </summary>
        public byte ActionStaus { get; set; }


        public bool IsEditExample { get; set; }

        public bool IsEditWork { get; set; }

        public long WorkID { get; set; }
    }


    public partial class KnowledgePointItem : KnowledgePoint
    {

        public string ListID { get; set; }

    }


    public class PaperBasketModel
    {

        public string PID { get; set; }

        public int PType { get; set; }

        public int SubjectID { get; set; }

        public string PaperName { get; set; }

        public int StageID { get; set; }

        public bool IsShare { get; set; }


        public int GradeID { get; set; }

        public int TID { get; set; }
        public int BigGrade { get; set; }
    }




    public partial class KnowledgePointList
    {
        public string PID { get; set; }

        public string T { get; set; }

        public Int64 WorkID { get; set; }

        public int ItemID { get; set; }

        public Int16 ItemIndex { get; set; }

        public byte ActionStaus { get; set; }

        /// <summary>
        /// 选择1、填空2、解答3
        /// </summary>
        public Int16 ItemType { get; set; }

        public bool IsAddOrDel { get; set; }

    }

    public partial class QuestionSearch
    {

        public int allCount { get; set; }

        public int pageCount { get; set; }

        public string SearchText { get; set; }

        public string SubjectID { get; set; }

        public int CurrentIndex { get; set; }

    }
}
