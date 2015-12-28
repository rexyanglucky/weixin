/*
 * author:谢利民;
 * function:教师基本功能模型
 * adddate:2015-05-04
 * updatedate:2015-05-04
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// TeaExamBookModel：教师基本功能模型主表
    /// </summary>
  public  class TeaExamBookModel
    {
        /// <summary>
        /// 
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// 作业本ID
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// 作业本名称
        /// </summary>
        public string Name { get; set; }

          /// <summary>
        /// 考试时间
          /// </summary>
        public int ExamTime { get; set; }

        /// <summary>
        /// 来源者名称
        /// </summary>
        public string TeacherName { get; set; }

        /// <summary>
        /// 教师ID(来源)
        /// </summary>
        public string TID { get; set; }

        /// <summary>
        /// 大年级 1小学 2初中 3高中
        /// </summary>
        public int StageID { get; set; }

        /// <summary>
        /// 小年级ID
        /// </summary>
        public int GradeID { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 科目名称
        /// </summary>
        public string SubjectName { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// 是否布置 0 否 1是
        /// </summary>
        public int IsAssign { get; set; }

        /// <summary>
        /// 是否编辑 0 否1 是
        /// </summary>
        public int IsEdit { get; set; }

        /// <summary>
        /// 是否删除 0否 1 是
        /// </summary>
        public int IsDel { get; set; }

        /// <summary>
        /// 是否共享 0 否1是
        /// </summary>
        public int IsShare { get; set; }

          /// <summary>
        /// 是否有效：0无效；1为有效
          /// </summary>
        public int IsEnable { get; set; }

        /// <summary>
        /// 作业箱试题列表
        /// </summary>
        public List<TeaExamBookRelIModel> TeaExamBookRelList { get; set; }

        /// <summary>
        /// 题库集合
        /// </summary>
        public List<QuestionAttrModel> QuestionList { get; set; }

    }


  /// <summary>
  /// 教师基本功能试卷箱与试题关联模型
  /// </summary>
  public class  TeaExamBookRelIModel
  {
      /// <summary>
      /// 
      /// </summary>
      public string ID { get; set; }
      /// <summary>
      /// 试卷箱ID
      /// </summary>
      public string BookID { get; set; }
      /// <summary>
      /// 排序ID
      /// </summary>
      public int? SequenceID { get; set; }
      /// <summary>
      /// 试题ID
      /// </summary>
      public int? ItemID { get; set; }


      /// <summary>
      /// 试题类型
      /// </summary>
      public int? ItemType { get; set; }
      /// <summary>
      /// 知识点ID
      /// </summary>
      public int? KnowledgeID { get; set; }

      /// <summary>
      /// 知识点名称
      /// </summary>
      public string KnowledgeName { get; set; }
      /// <summary>
      /// 题目来源 
      /// </summary>
      public int? ItemSourceType { get; set; }
      /// <summary>
      /// 分值
      /// </summary>
      public float? Score { get; set; }
      /// <summary>
      /// 
      /// </summary>
      public int PID { get; set; }

      /// <summary>
      /// 难度
      /// </summary>
      public int DiffNum { get; set; }
  }

}
