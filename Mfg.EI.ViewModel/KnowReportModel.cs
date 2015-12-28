using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 知识测评结果模型
    /// </summary>
   public class KnowReportModel
    {
       /// <summary>
       /// 
       /// </summary>
       public string Taid { get; set; }
       /// <summary>
       /// 姓名
       /// </summary>
       public string Name { get; set; }

       /// <summary>
       /// 0 提分；30 冲刺/竞赛
       /// </summary>
       public string TrainAim { get; set; }

       /// <summary>
       /// 阶段
       /// </summary>
       public string StageID { get; set; }

       /// <summary>
       /// 手机
       /// </summary>
       public string Phone { get; set; }
       /// <summary>
       /// 科目
       /// </summary>
       public string SubjectID { get; set; }

       /// <summary>
       /// 学生ID
       /// </summary>
       public string SID { get; set; }

       public int? GradeID
       {
           set;
           get;
       }

       public int? Gender
       {
           set;
           get;
       }

       public int? Age
       {
           set;
           get;
       }

       public string School
       {
           set;
           get;

       }
       public string Adddress { get; set; }
       /// <summary>
       /// 测评时间
       /// </summary>
       public DateTime? startTime { get; set; }

       /// <summary>
       /// 测试时间
       /// </summary>
       public string testAnslyTime { get; set; }

       /// <summary>
       /// 总的推荐课时
       /// </summary>
       public string TotalHour { get; set; }

       /// <summary>
       /// 教材名称
       /// </summary>
       public string MaterialName { get; set; }


       /// <summary>
       /// 教材ID
       /// </summary>
       public string MaterialID { get; set; }

       /// <summary>
       /// 教材版本
       /// </summary>
       public string Mversion { get; set; }
       /// <summary>
       /// 试卷ID
       /// </summary>
       public int? ExamID { get; set; }


       /// <summary>
       ///知识点测评报告集合 
       /// </summary>
       public List<KnowledgeShowModel> knowledgeListModel { get; set; }

       /// <summary>
       /// 感知题测评报告集合 
       /// </summary>
       public List<PerQuestionsModel> perquestionListModel { get; set; }

       /// <summary>
       /// 配置课时
       /// </summary>
       public List<TAConfigureModel> taconfigureListModel { get; set; }
    }
    /// <summary>
    /// 大的知识点模型
    /// </summary>
   public class KnowledgeShowModel
   {
       /// <summary>
       /// 知识点ID
       /// </summary>
       public string KID { get; set; }

       /// <summary>
       /// 知识点名称
       /// </summary>
       public string KnowledgeName { get; set; }

       /// <summary>
       /// 等级设置
       /// </summary>
       public string Level { get; set; }

       /// <summary>
       /// 原始课时
       /// </summary>
       public string DefaultHour { get; set; }

       /// <summary>
       /// 推荐课时
       /// </summary>
       public string ClassHour { get; set; }

       /// <summary>
       /// 理解掌握情况
       /// </summary>
       public string KnowUnderstand { get; set; }

       /// <summary>
       /// 测试结果内容
       /// </summary>
       public string KnowResult { get; set; }

       /// <summary>
       /// 测评结构整体内容
       /// </summary>
       public string KnowContent { get; set; }
       /// <summary>
       /// 小知识点集合
       /// </summary>
      public List<SecmainQuesModel> secmainQuesList { get; set; }

   }

    /// <summary>
   /// 感知题模型
    /// </summary>
    public class PerQuestionsModel
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 等级
        /// </summary>
        public string Level { get; set; }

        /// <summary>
        /// 内容
        /// </summary>
        public string Content { get; set; }
    }
    /// <summary>
    /// 参数模型
    /// </summary>
    public class ParamModel
    {
        /// <summary>
        /// 知识测评ID
        /// </summary>
        public string Taid { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public string SubjectId { get; set; }

        /// <summary>
        /// 阶段
        /// </summary>
        public string Statge { get; set; }

        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string MFGID { get; set; }

       
    }

    /// <summary>
    /// 答题新模型
    /// </summary>
    public class TARelAnswerModel
    {
        /// <summary>
        /// 测评ID
        /// </summary>
        public string TAID { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public int ItemID { get; set; }

        /// <summary>
        /// 正确率
        /// </summary>
        public int  Accuracy { get; set; }

        /// <summary>
        /// 来源
        /// </summary>
        public int ItemSource { get; set; }
    }

    /// <summary>
    /// 新的学习目标模型
    /// </summary>
    public class SecmainQuesModel:Mfg.Resource.Entity.Secmain
    {
        /// <summary>
        /// 知识点名称
        /// </summary>
        public string f_name { get; set; }
    }

    /// <summary>
    /// 教材版本模型
    /// </summary>
    public class ReportMaterialModel
    {
        /// <summary>
        /// 教师账号
        /// </summary>
        public int TID { get; set; }

        /// <summary>
        /// 阶段
        /// </summary>
        public int StageID { get; set; }
        
        /// <summary>
        /// 科目
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 教材ID
        /// </summary>
        public string MaterialID { get; set; }

        /// <summary>
        /// 教材名称
        /// </summary>
        public string Mversion { get; set; }
    }

    /// <summary>
    /// 配置课时模型
    /// </summary>
    public class TAConfigureModel
    {
        /// <summary>
        /// 测评ID
        /// </summary>
        public string TAID{ set; get;}

        /// <summary>
        /// 总课时
        /// </summary>
        public int? TotalHour { set; get;}

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID{ set; get;}

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { set;get; }

        /// <summary>
        /// 等级设置1、优秀 2、较好 3、一般 4较差
        /// </summary>
        public string LevelSet{  set; get;}

        /// <summary>
        ///  匹配课时
        /// </summary>
        public int? MathClass{  set; get; }
    }

    /// <summary>
    /// 修改内容模型
    /// </summary>
    public class TARContentModel 
    {
        /// <summary>
        /// 测评ID
        /// </summary>
        public string TAID { set; get; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID { set; get; }
        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { set; get; }

        /// <summary>
        /// 修改内容
        /// </summary>
        public string SetContent { get; set; }

        /// <summary>
        /// 修改状态0、 内容修改 1、测评配置修改
        /// </summary>
        public int State { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime UpdateTime { get; set; }
    }
}
