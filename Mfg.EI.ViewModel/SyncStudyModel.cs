using Mfg.EI.Entity;
using System.Collections.Generic;

namespace Mfg.EI.ViewModel
{
    public class SyncStudyModel : EI_StudentInfo
    {

        /// <summary>
        /// 文理
        /// </summary>
        public int ArtSciences { get; set; }

        /// <summary>
        /// 大年级
        /// </summary>
        public string GradeIDBig { get; set; }

        /// <summary>
        /// x/c/g
        /// </summary>
        public string GradeIDMapping { get; set; }

        /// <summary>

        /// 小年级x1/x2/../g1/g2
        /// </summary>
        public string GradeIDSmall { get; set; }

        /// <summary>

        /// 一年级、二年级...
        /// </summary>
        public string GradeIDName { get; set; }

        /// <summary>
        /// 学生教材
        /// </summary>
        public Dictionary<string, string> MaterialIDList { get; set; }

        /// <summary>
        /// 教材版本
        /// </summary>
        public string MaterialID { get; set; }


        /// <summary>
        /// 学生公告
        /// </summary>
        public List<AnnouncementModel> Announcement { get; set; }
    }

    /// <summary>
    /// 同步学习
    /// </summary>
    public class SyncStudyJob
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 工作ID
        /// </summary>
        public string JID { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public int KnowledgeID { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int SequenceID { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public int ItemID { get; set; }

        /// <summary>
        /// 答题时间(秒)
        /// </summary>
        public string AnswerTime { get; set; }

        /// <summary>
        /// 0错误、1正常
        /// </summary>
        public double Accuracy { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 科目  接口
        /// </summary>
        public string SubjectIDMapping { get; set; }


        public string Answer { get; set; }

        public string AnswerID { get; set; }

        public string NoteContent { get; set; }
    }



    public class SyncStudyJobModel
    {

        public List<SyncStudyJob> List { get; set; }

        /// <summary>
        /// 合计
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// 答对题目
        /// </summary>
        public int OKCount { get; set; }


        /// <summary>
        /// 答错题
        /// </summary>
        public int ErrorCount { get; set; }

        /// <summary>
        /// 累计用时
        /// </summary>
        public double TotalTime { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public string SubjectIDMapping { get; set; }
    }

}


