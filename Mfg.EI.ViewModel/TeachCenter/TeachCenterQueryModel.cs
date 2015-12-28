
namespace Mfg.EI.ViewModel
{
    public class TeachCenterQueryModel
    {
        /// <summary>
        /// 科目
        /// </summary>
        public string SubjectId { get; set; }

        /// <summary>
        /// 知识点ID列表
        /// </summary>
        public string KnowledageIds { get; set; }

        /// <summary>
        /// 知识点名称列表
        /// </summary>
        public string KnowledageNames { get; set; }

        /// <summary>
        /// 年级
        /// </summary>
        public string Grade { get; set; }

        /// <summary>
        /// 教案ID
        /// </summary>
        public string PlanIndex { get; set; }

        /// <summary>
        /// 题目数量
        /// </summary>
        public int QuestionCount { get; set; }

        /// <summary>
        /// 课程侧重 1 突出重点，2 全面周到，3 二者兼顾
        /// </summary>
        public int CoursesFocus { get; set; }

        /// <summary>
        /// 难度
        /// </summary>
        public int Difficulty { get; set; }
        /// <summary>
        /// 讲练比例
        /// </summary>
        public double ExamplePracticePercent { get; set; }

        public bool IsOverride { get; set; }

        public bool IsHaveKfSubject { get; set; }
    }
}
