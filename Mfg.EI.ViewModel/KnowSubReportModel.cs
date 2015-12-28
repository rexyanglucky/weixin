using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 
    /// </summary>
  public  class KnowSubReportModel
    {

      /// <summary>
        /// 本次测试ID
      /// </summary>
      public string TAID { get; set; }

      /// <summary>
      /// 学生ID
      /// </summary>
      public string SID { get; set; }

      /// <summary>
      /// 知识点ID
      /// </summary>
      public string KID { get; set; }

      /// <summary>
      /// 知识点名称
      /// </summary>
      public string KnowledgeName { get; set; }

      /// <summary>
      /// 测评结果等级
      /// </summary>
      public string ResultLevel { get; set; }

      /// <summary>
      /// 知识点题目总数
      /// </summary>
      public int KTotalCount { get; set; }

      /// <summary>
      /// 考点ID
      /// </summary>
      public string PointID { get; set; }

      /// <summary>
      /// 考点名称
      /// </summary>
      public string PointName { get; set; }

      /// <summary>
      /// 每个考点题目总数
      /// </summary>
      public int PTotalCount { get; set; }

      /// <summary>
      /// 每个考点的正确率等于1，是已掌握
      /// </summary>
      public int PRightCount { get; set; }

      /// <summary>
      /// 难度
      /// </summary>
      public int Difficulty { get; set; }

      /// <summary>
      /// 重要程度
      /// </summary>
      public string Degree { get; set; }
      /// <summary>
      /// 预估分值
      /// </summary>
      public string EstimateValue { get; set; }

      /// <summary>
      /// 考点等级：常考，必考，易考，不常考
      /// </summary>
      public string PointLevel { get; set; }

      public DateTime CreateTime { get; set; }
      
    }


    public class KnowSubReportDiffictModel
    {
        public string SID { get; set; }
        /// <summary>
        /// 本次知识点测评ID
        /// </summary>
        public string TAID { get; set; }
        /// <summary>
        /// 难度
        /// </summary>
        public int Difficty { get; set; }
        /// <summary>
        /// 难度名称
        /// </summary>
        public string DiffictyName { get; set; }

        /// <summary>
        /// 题目总数
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// 正确题数
        /// </summary>
        public int RightCount { get; set; }

        /// <summary>
        /// 实际答题时间
        /// </summary>
        public int AnswerTime { get; set; }

        /// <summary>
        /// 我的正确率
        /// </summary>
        public string RightRate { get; set; }

        /// <summary>
        /// 预期正确率
        /// </summary>
        public string ExpectRate { get; set; }

        /// <summary>
        /// 修改后的预期正确率
        /// </summary>

        public string UpdateExpectRate { get; set; }

        /// <summary>
        /// 是否修改预期正确率：0 :否；1：是
        /// </summary>
        public int IsUpdate { get; set; }


    }

    /// <summary>
    /// 计算知识点结果
    /// </summary>
    public class CalaKnowModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Decimal rightcount { get; set; }

        public string PointID { get; set; }

        public string PointName { get; set; }

        /// <summary>
        /// 小知识点总题数
        /// </summary>
        public Int64 total { get; set; }

        /// <summary>
        /// 题掌握率
        /// </summary>
        public Decimal rightleve { get; set; }
    }

    /// <summary>
    /// 
    /// </summary>
    public class CalaDiffModel
    {
        public string SID { get; set; }

        public string TAID { get; set; }

        public Decimal rightCount { get; set; }

        public Int64 counttotal { get; set; }

        public Decimal sumtime { get; set; }

        public string diffname { get; set; }
    }
}
