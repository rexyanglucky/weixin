/*
 * author:谢利民;
 * function:知识测评相关功能的接口
 * date:2015-05-12
 * update:205-05-12
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{

    public class AnswerTestModel
    {
        /// <summary>
        /// 是否答题
        /// </summary>
        public bool IsEffect { get; set; }

        public List<AnswerAssessmentModel> list { get; set; }

        public List<QuestionAnswer> questList { get; set; }

    }

    public class AnswerAssessmentModel
    {

        /// <summary>
        /// 大知识点ID
        /// </summary>
        public string KID { get; set; }


        /// <summary>
        /// 试题ID
        /// </summary>
        public int ItemID { get; set; }


        /// <summary>
        /// 困难度
        /// </summary>
        public int DiffNum { get; set; }


        /// <summary>
        /// 序号
        /// </summary>
        public int SequenceID { get; set; }

        //考点ID
        public int PointID { get; set; }

        public int f_Style { get; set; }
    }


    /// <summary>
    /// 知识测评
    /// </summary>
    public class KnowAssessmentSubModel
    {
        public string SubjectID { get; set; }

        public string TAID { get; set; }

        public string SID { get; set; }

        public List<AnswerSubModel> AnswerSub { get; set; }
    }

    public class AnswerSubModel
    {
        public int ItemID { get; set; }

        public int Accuracy { get; set; }

        public string KID { get; set; }

        public string Answer { get; set; }

        public int AnswerTime { get; set; }

        public int PointID { get; set; }

        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 重要程度
        /// </summary>
        public string f_keyordiff { get; set; }

        /// <summary>
        /// 考点等级
        /// </summary>
        public string f_freq { get; set; }

        /// <summary>
        /// 考试大纲预估分值
        /// </summary>
        public double f_percent { get; set; }

        /// <summary>
        /// 难度分值
        /// </summary>
        public int f_difficulty { get; set; }

        public string f_difficultyDesc
        {
            get
            {
                switch (this.f_difficulty)
                {
                    case 1: return "容易";
                    case 2: return "较易";
                    case 3: return "中等";
                    case 4: return "较难";
                    case 5: return "困难";
                    default:
                        return "";
                }
            }
        }

    }

    /// <summary>
    /// 知识测评
    /// </summary>
    public class KnowAssessmentModel
    {

        public string N1 { get; set; }
        /// <summary>
        /// 知识测评ID
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 阶段
        /// </summary>
        public string StageID { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public int? SubjectID { get; set; }
        /// <summary>
        /// 知识测评知识点关联表
        /// </summary>
        public List<TARelKnoModel> tarelknomodelList { get; set; }

        /// <summary>
        /// 知识测评与题目关联表
        /// </summary>
        public List<TARelItemModel> tarelitemmodelList { get; set; }

        /// <summary>
        /// 知识测评答题表【EI_TAnswer】
        /// </summary>
        public List<TAnswerModel> tanswermodelList { get; set; }

        /// <summary>
        /// 知识测评的集合
        /// </summary>
        public List<Mfg.Resouce.Models.Point> pointtimeList { get; set; }

        /// <summary>
        /// 试题集合
        /// </summary>
        public List<Resouce.Models.Question> QuestionAttrModelList { get; set; }

        /// <summary>
        /// 新增试题
        /// </summary>
        public List<KnowQuesModel> knowQuesModelList { get; set; }

        /// <summary>
        /// 整个试题的List
        /// </summary>
        public List<NewQuestModel> newQuesModelList { get; set; }

        public string TestName { get; set; }

        public string N2 { get; set; }
    }

    /// <summary>
    /// 学生临时信息表模型
    /// </summary>
    public class TempStudentInfoModel
    {
        public string Adddress { get; set; }

        public string Text { get; set; }

        public int Index { get; set; }
        public string ID { get; set; }
        public int TID { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public string PhoneG { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateTimeStr { get; set; }

        public string remark { get; set; }

        /// <summary>
        /// 培训目的
        /// </summary>
        public int TrainAim { get; set; }

        // public Int32 StageID { get; set; }

        public string StageIDStr { get; set; }

        public Int32 SubjectID { get; set; }

        public string SubjectIDStr { get; set; }

        /// <summary>
        /// 是否归档
        /// </summary>
        public bool IsFile { get; set; }

        public Int32 MFGID { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public int MaxCount { get; set; }

        /// <summary>
        /// 知识点集合
        /// </summary>
        public List<TARelKnoModel> dto { get; set; }

        public List<TempStudentInfoModel> Data { get; set; }

        public string pageNavigate { get; set; }

        public int ClassHOUR { get; set; }

        public string TAID { get; set; }

        public string School { get; set; }

        public int Age { get; set; }
        public string StrAge { get; set; }

        public int Gender { get; set; }
        public string StrGender { get; set; }

        public int StageID { get; set; }

        public int GradeID { get; set; }

        public Int32 ExamID { get; set; }

        /// <summary>
        /// 预计时间
        /// </summary>
        public float ScheduledTime { get; set; }

        public byte MeasureVersion { get; set; }

        public string ExamName { get; set; }

        public long MeasureID { get; set; }

        /// <summary>
        /// 0为旧数据；2为新数据
        /// </summary>
        public byte MeasureVersionOld { get; set; }




        /// <summary>
        /// 开始时间
        /// </summary>
        public string StarTime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public string EndTime { get; set; }

        /// <summary>
        /// 是否导出
        /// </summary>
        public bool IsExport { get; set; }


        /// <summary>
        /// 纬度ids
        /// </summary>
        public string DimIDs { get; set; }
    }

    //public class TARelKnoModel
    //{
    //    public string TAID { get; set; }

    //    public string KID { get; set; }

    //    public string KnowledgeName { get; set; }

    //    public int ClassHour { get; set; }

    //    public int DiffNum { get; set; }
    //}


    public class TempMeasureModelPara
    {

        public int TID { get; set; }

        public int OrgID { get; set; }

        public string Phone { get; set; }

        public string TName { get; set; }
        public string MfgId { get; set; }
    }

    public class TempMeasureModel
    {
        public string TempID { get; set; }

        public int StageID { get; set; }

        public int SubjectID { get; set; }

        /// <summary>
        /// 0为学科；1为学能
        /// </summary>
        public byte MeasureVersion { get; set; }

        public string ExamName { get; set; }

        /// <summary>
        /// 0 旧数据，2新数据
        /// </summary>
        public int OldVersion { get; set; }

        public string MeasureID { get; set; }
        /// <summary>
        /// 0为旧数据；2为新数据
        /// </summary>
        public byte MeasureVersionOld { get; set; }

        public string SName { get; set; }
        public string SId { get; set; }
    }

    public class TempMeasureStudentModel
    {
        public string TempID { get; set; }

        public int StageID { get; set; }

        public int SubjectID { get; set; }

        /// <summary>
        /// 0为学科；1为学能
        /// </summary>
        public byte MeasureVersion { get; set; }

        public string ExamName { get; set; }

        /// <summary>
        /// 0 旧数据，2新数据
        /// </summary>
        public int OldVersion { get; set; }

        public string MeasureID { get; set; }

        public string SName { get; set; }
        public string SId { get; set; }

        public string Gender { get; set; }
        public string Age { get; set; }
        public string Phone { get; set; }
        public string School { get; set; }
        public string Address { get; set; }


        public DateTime CreateTime { get; set; }
    }

    public class TempTARelModel
    {
        public string TAID { get; set; }
        public int TID { get; set; }
        public List<TARelItemModel> ListA { get; set; }

        public List<TARelKnoModel> ListB { get; set; }

        /// <summary>
        /// 测评试卷 
        /// </summary>
        public string TestName { get; set; }

        public double ScheduledTime { get; set; }
    }


    /// <summary>
    /// 新的试题ViewModel
    /// </summary>
    public class NewQuestModel
    {
        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// 来源类型0普遍1、观察力2、想象力3、意志力
        /// </summary>
        public string ItemSource { get; set; }

        /// <summary>
        /// 试题内容
        /// </summary>
        public string Body { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public string ItemID { get; set; }

        /// <summary>
        /// 选项内容
        /// </summary>
        public string AnswerList { get; set; }

        /// <summary>
        /// 正确答案
        /// </summary>
        public string AnswerOk { get; set; }

        /// <summary>
        /// 答案
        /// </summary>
        public string Answer { get; set; }

        /// <summary>
        /// 选项分值
        /// </summary>
        public string ListSorce { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 知识点解析
        /// </summary>
        public string Fways { get; set; }

        /// <summary>
        /// 试题来源知识点名称
        /// </summary>
        public string f_mainsec1 { get; set; }

        /// <summary>
        /// 大题号
        /// </summary>
        public int QuesNo { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
        {
            set;
            get;
        }

        /// <summary>
        /// 序号
        /// </summary>
        public int SequenceID { get; set; }

    }

    /// <summary>
    /// 试卷打印模型
    /// </summary>
    public class ExampePrintModel
    {
        /// <summary>
        /// 大类型集合
        /// </summary>
        public List<ExampeQuesModel> ExampeQuesModelList { get; set; }
    }

    /// <summary>
    /// 试题集合
    /// </summary>
    public class ExampeQuesModel
    {
        /// 知识点ID
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 大的题号
        /// </summary>
        public string QuesNo { get; set; }

        public int OrderBy { get; set; }
        /// <summary>
        /// 整个试题的List
        /// </summary>
        public List<NewQuestModel> newQuesModelList { get; set; }
    }

}
