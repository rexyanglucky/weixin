
/*
 * author:谢利民;
 * function:同步学习的模型
 * date:2015-05-11
 * update:205-05-11
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// SyncJobModel：同步学习的模型
    /// </summary>
    public class SyncJobModel
    {
        /// <summary>
        /// 作业ID
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public int? KnowledgeID { get; set; }
        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 年级ID
        /// </summary>
        public int? GradeID { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int? SubjectID { get; set; }

        /// <summary>
        /// 轮数
        /// </summary>
        public int? RoundNumber { get; set; }

        /// <summary>
        /// 掌握率
        /// </summary>
        public int? MasterRate { get; set; }

        public string MasterRateStr { get; set; }

        /// <summary>
        /// 来源类别
        /// </summary>
        public int? RuleType { get; set; }

        /// <summary>
        /// 奖杯数 掌握率100% 奖杯数加1
        /// </summary>
        public int? TropNumber { get; set; }
        /// <summary>
        /// 同步学习作业与题目连接表【EI_SyncJRelI】
        /// </summary>
        public List<SyncJRelIModel> SyncJRelIModelList { get; set; }

        /// <summary>
        /// 同步学习作业答题表【EI_SyncJAnswer】
        /// </summary>
        public List<SyncJAnswerModel> SyncJAnswerModelList { get; set; }

        /// <summary>
        /// 试题集合
        /// </summary>
        //  public List<Resource.Entity.Question> QuestionAttrModelList { get; set; }

        public List<QuestionItemViewModel> QuestionAttrModelList { get; set; }
        /// <summary>
        /// 大年级
        /// </summary>
        public int StageID { get; set; }

        public double Accuracy { get; set; }

        public int ASum { get; set; }

        /// <summary>
        /// 历史掌握率
        /// </summary>
        public int HistoryLevel { get; set; }

        public string KnowledgeDetialID { get; set; }
    }

    /// <summary>
    ///  同步学习作业与题目连接表【EI_SyncJRelI】
    /// </summary>
    public class SyncJRelIModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string JID
        {
            set;
            get;
        }

        public int? SequenceID
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public int? ItemID
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public int? ItemType
        {
            set;
            get;
        }

        public int? KnowledgeID
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public string KnowledgeName
        {
            set;
            get;
        }

    }
    /// <summary>
    /// 同步学习作业答题表【EI_SyncJAnswer】
    /// </summary>
    public class SyncJAnswerModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>

        public string SID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public string JID
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public int? ItemID
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public string Answer
        {
            set;
            get;
        }

        public string AnswerTime
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public string NoteContent
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public float Accuracy
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public string Accumulated
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime CreateTime
        {
            set;
            get;
        }

        /// <summary>
        /// 
        /// </summary>
        public int? DelFlag
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        /// <summary>
        /// 科目ID
        /// </summary>
        public string SubjectID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string idlist { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string answerlist { get; set; }

        /// <summary>
        /// 年级
        /// </summary>
        public int GradeID { get; set; }

        /// <summary>
        /// 阶段
        /// </summary>
        public int StageID { get; set; }
        /// <summary>
        /// 排序字段
        /// </summary>
        public int OrderBy { get; set; }

        /// <summary>
        /// 选中的试题ID
        /// </summary>
        public int ChangID { get; set; }
    }
}
