using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 学科测评报告模型
    /// </summary>
    public class KnowledgeSubjectPointModel
    {
        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 测试ID
        /// </summary>
        public string TAID { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 小年级
        /// </summary>
        public string GradeID { get; set; }

        /// <summary>
        /// 大年级
        /// </summary>
        public string StageID { get; set; }

        /// <summary>
        /// 年龄
        /// </summary>
        public string Age { get; set; }

        /// <summary>
        /// 学校
        /// </summary>
        public string School { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string Adddress { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public string Gender { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public string SubjectID { get; set; }

        /// <summary>
        /// 科目推荐课时
        /// </summary>
        public string TotalHour { get; set; }
        /// <summary>
        /// 知识点集合
        /// </summary>
        public List<SubjectPointModel> SujectPointList { get; set; }

        /// <summary>
        /// 困难模型集合
        /// </summary>
        public List<SubjectDifficyModel> SubjectDiffyList { get; set; }

        public DateTime CreateTime { get; set; }
    }
    /// <summary>
    /// 
    /// </summary>
    public class SubjectPointModel
    {
        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string TAID { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// KnowledgeName
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 测评结果等级
        /// </summary>
        public string ResultLevel { get; set; }

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

        public string PTotalCount { get; set; }

        /// <summary>
        /// PRightCount
        /// </summary>
        public string PRightCount { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreateTime { get; set; }

        /// <summary>
        /// 重要程度
        /// </summary>
        public string Degree { get; set; }
        /// <summary>
        /// 预估分值
        /// </summary>
        public string EstimateValue{get;set;}
        /// <summary>
        /// 考点等级
        /// </summary>
        public string PointLevel { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string KaoPin { get; set; }
    }



    /// <summary>
    /// 模型集合
    /// </summary>
    public class SubjectDifficyModel
    {
        public string SID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string TAID { get; set; }

        public string Difficty { get; set; }
        /// <summary>
        /// 难度名称
        /// </summary>
        public string DiffictyName { get; set; }

        /// <summary>
        /// 总题数
        /// </summary>
        public string TotalCount { get; set; }

        /// <summary>
        /// 正确题数
        /// </summary>
        public string RightCount { get; set; }

        /// <summary>
        /// 实际答题时间
        /// </summary>
        public string AnswerTime { get; set; }

        /// <summary>
        ///我的正确率 
        /// </summary>
        public string RightRate { get; set; }

        /// <summary>
        ///预期正确率 
        /// </summary>
        public string ExpectRate { get; set; }

        /// <summary>
        /// 修改后的预期正确率
        /// </summary>
        public string UpdateExpectRate { get; set; }

        /// <summary>
        /// 是否修改预期正确率：0 :否；1：是
        /// </summary>
        public string IsUpdate { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreateTime { get; set; }
    }


}
