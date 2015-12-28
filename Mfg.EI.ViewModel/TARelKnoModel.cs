using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 知识测评知识点关联表
    /// </summary>
  public  class TARelKnoModel
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
        /// 难度
        /// </summary>
        public int? DiffNum { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 默认课时
        /// </summary>
        public int? ClassHour { get; set; }

        public int DefaultHour { get; set; }

        public int GroupID { get; set; }

        public bool IsUse { get; set; }
    }
}
