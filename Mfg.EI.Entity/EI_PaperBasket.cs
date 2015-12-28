using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{


    public class Paper
    {
        public List<EI_PaperBasket> list { get; set; }

        public int AcaStru { get; set; }

        public int ArtSciences { get; set; }
        public int BigGrade { get; set; }
        public int SubjectID { get; set; }
        public float Score { get; set; }
        public string PaperName { get; set; }
        public int GradeID { get; set; }
        public int IsShare { get; set; }
    }

    /// <summary>
    /// 试题蓝实体
    /// </summary>
    public class EI_PaperBasket
    {

        public string PaperName { get; set; }

        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        ///  教师ID
        /// </summary>
        public int TID { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }


        /// <summary>
        /// 排序ID
        /// </summary>
        public int SequenceID { get; set; }

        /// <summary>
        /// 科目Id
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 大年级
        /// </summary>
        public int BigGrade { get; set; }


        /// <summary>
        /// 年级
        /// </summary>
        public int GradeId { get; set; }

        /// <summary>
        /// 题目ID
        /// </summary>
        public int ItemID { get; set; }

        /// <summary>
        /// 题型
        /// </summary>
        public int ItemType { get; set; }


        /// <summary>
        /// 知识点ID
        /// </summary>
        public int KnowledgeID { get; set; }


        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }


        /// <summary>
        /// 题目来源
        /// </summary>
        public int ItemSourceType { get; set; }

        /// <summary>
        /// 题目分值
        /// </summary>
        public float Score { get; set; }


        /// <summary>
        /// 困难指数
        /// </summary>
        public int DiffNum { get; set; }


        /// <summary>
        /// 类别排序
        /// </summary>
        public string PID { get; set; }


        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddTime { get; set; }


        public int GradeID { get; set; }




        public int IsShare { get; set; }
    }
}
