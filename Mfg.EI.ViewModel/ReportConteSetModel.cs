using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
  public  class ReportConteSetModel
    {

        public List<string> Diff { get; set; }



        public List<HourClassModel> HourClassList { get; set; }

      public List<DiffClassModel> DiffClassList { get; set; }
    }

    /// <summary>
    /// 课时设置
    /// </summary>
    public class HourClassModel
    {
        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 总的课时
        /// </summary>
        public int TotalHour { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string TAID { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 匹配课时
        /// </summary>
        public int ClassHour { get; set; }
    }

    /// <summary>
    /// 难度学生掌握率
    /// </summary>
    public class DiffClassModel
    {
        /// <summary>
        /// 科目
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 测评ID
        /// </summary>
        public string TAID { get; set; }

        /// <summary>
        /// 难度名称
        /// </summary>
        public string DiffictyName { get; set; }

        /// <summary>
        /// 总的题数
        /// </summary>
        public Decimal TotalCount { get; set; }

        /// <summary>
        /// 对的题数
        /// </summary>
        public Decimal RightCount { get; set; }

        /// <summary>
        /// 预期正确率
        /// </summary>
        public string ExpectRate { get; set; }

        /// <summary>
        /// 修改后的预期正确率
        /// </summary>
        public string UpdateExpectRate { get; set; }

        /// <summary>
        /// 是否修改
        /// </summary>
        public int IsUpdate { get; set; }
    }
}
